import { loadRecognizer, recognize, getKnownLabels } from '../recognizer.js';
import { learn, unlearnLast } from '../learned-examples.js';
import { getItems, addItem, removeQuantity } from '../fridge-store.js';
import { quantityStepperHTML, bindQuantityStepper } from './quantity-stepper.js';
import { escapeHTML } from '../escape-html.js';

// Set to false to skip the ~90 MB model download: nothing is detected, and
// the shutter pauses the camera so you can type the name instead.
const RECOGNITION_ENABLED = true;

// Live detection: how often to look, and how many looks in a row must agree
// before the label changes (stops it flickering while the phone moves)
const DETECT_INTERVAL_MS = 400;
const STABLE_FRAMES = 2;

// Flow:
//   live   — camera runs; the item in the frame is named automatically.
//            Tap the screen to pause. Shutter adds the named item.
//   paused — frozen photo; edit the name (type or tap a guess) and quantity.
//            Shutter adds it and resumes. Tapping the photo resumes without adding.
export function renderCameraScreen(container, { onContinue }) {
  container.innerHTML = `
    <video class="camera-bg" autoplay playsinline muted></video>
    <section class="camera-screen" aria-label="Camera">
      <div class="preview-area">
        <video class="camera-video" autoplay playsinline muted></video>
        <img class="camera-still" alt="" aria-hidden="true" />
        <div class="preview-message">
          <p class="preview-label">Camera preview</p>
          <p class="preview-sublabel">Tap allow to enable camera</p>
        </div>
        <div class="detection-overlay">
          <div class="detection-frame"></div>
          <div class="detection-info" hidden>
            <label class="detection-name">
              <input class="detection-label" type="text" list="food-options" enterkeyhint="done"
                     autocomplete="off" autocapitalize="none" spellcheck="false" readonly
                     placeholder="Type what it is" aria-label="Food name" />
              <svg class="detection-edit" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10.5 3.5L12.5 5.5M3 13L3.5 10.5L11 3L13 5L5.5 12.5L3 13Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </label>
            <datalist id="food-options"></datalist>
            <div class="detection-guesses" role="group" aria-label="Other guesses"></div>
            ${quantityStepperHTML(1)}
          </div>
          <p class="detection-status" role="status"></p>
        </div>
      </div>
      <div class="controls">
        <button class="btn-undo" type="button" aria-label="Undo last add">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path d="M12 8L6 14L12 20" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 14H19C23 14 26 17 26 21C26 25 23 28 19 28H14" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
          </svg>
        </button>
        <button class="btn-capture" type="button" aria-label="Add to fridge"></button>
        <button class="btn-continue" type="button" aria-label="Continue to your fridge">
          <img src="src/components/icons/arrow-forward.svg" width="50" height="50" alt="" aria-hidden="true" />
        </button>
      </div>
    </section>
    <canvas class="camera-canvas" hidden></canvas>
  `;

  const bgVideo     = container.querySelector('.camera-bg');
  const video       = container.querySelector('.camera-video');
  const still       = container.querySelector('.camera-still');
  const canvas      = container.querySelector('.camera-canvas');
  const previewArea = container.querySelector('.preview-area');
  const message     = container.querySelector('.preview-message');
  const status      = container.querySelector('.detection-status');
  const info        = container.querySelector('.detection-info');
  const nameInput   = container.querySelector('.detection-label');
  const options     = container.querySelector('#food-options');
  const guessList   = container.querySelector('.detection-guesses');
  const frame       = container.querySelector('.detection-frame');
  const captureBtn  = container.querySelector('.btn-capture');
  const undoBtn     = container.querySelector('.btn-undo');
  const continueBtn = container.querySelector('.btn-continue');

  let stream     = null;
  let active     = true;   // false once we leave this screen
  let mode       = 'live'; // 'live' | 'paused'
  let modelReady = false;
  let detection  = null;   // latest stable result: { label, guesses, embedding }, or null if no food
  let lastLabel  = undefined;
  let streak     = 0;
  const history  = [];     // adds made on this screen, newest last, for undo

  function setStatus(text) {
    status.textContent = text;
  }

  // --- camera start ---

  function startCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;

    navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: 'environment' } }
    })
      .then(s => {
        stream = s;
        bgVideo.srcObject = stream;
        video.srcObject = stream;
        return Promise.all([bgVideo.play(), video.play()]);
      })
      .then(() => {
        if (mode === 'live') video.classList.add('active');
        message.hidden = true;
      })
      .catch(() => {
        // Permission denied or no camera — placeholder message stays visible
      });
  }

  startCamera();

  // --- recognition model (downloads in the background) ---

  if (RECOGNITION_ENABLED) {
    setStatus('Getting food recognition ready…');
    loadRecognizer(pct => {
      if (!modelReady && mode === 'live') setStatus(`Downloading food recognition… ${pct}%`);
    })
      .then(async () => {
        modelReady = true;
        if (mode === 'live') setStatus('Point at an item');
        await fillSuggestions();
        detectLoop();
      })
      .catch(() => {
        if (mode === 'live') setStatus('Food recognition unavailable — tap the shutter to type a name');
      });
  } else {
    setStatus('Tap the shutter to add an item');
  }

  // Type-ahead suggestions: every known food plus names already in the fridge
  async function fillSuggestions() {
    const known = modelReady ? await getKnownLabels() : [];
    const names = [...new Set([...known, ...getItems().map(item => item.name)])].sort();
    options.innerHTML = names.map(name => `<option value="${escapeHTML(name)}"></option>`).join('');
  }

  // --- quantity ---

  const stepper = bindQuantityStepper(info);

  // --- live detection ---

  // The part of the camera image inside the corner frame, in video pixels.
  // The preview uses object-fit: cover, so undo that scaling and offset.
  function frameCrop() {
    const vr = video.getBoundingClientRect();
    const fr = frame.getBoundingClientRect();
    const scale = Math.max(vr.width / video.videoWidth, vr.height / video.videoHeight);
    const offsetX = (vr.width  - video.videoWidth  * scale) / 2;
    const offsetY = (vr.height - video.videoHeight * scale) / 2;
    const x = Math.max(0, (fr.left - vr.left - offsetX) / scale);
    const y = Math.max(0, (fr.top  - vr.top  - offsetY) / scale);
    return {
      x, y,
      w: Math.min(video.videoWidth  - x, fr.width  / scale),
      h: Math.min(video.videoHeight - y, fr.height / scale),
    };
  }

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  async function detectLoop() {
    while (active) {
      const canLook = mode === 'live' && stream && video.readyState >= 2 && !document.hidden;
      if (canLook) {
        // Only what's inside the frame is looked at, so shelves and
        // neighbouring items don't confuse it
        const crop = frameCrop();
        canvas.width  = Math.round(crop.w);
        canvas.height = Math.round(crop.h);
        canvas.getContext('2d').drawImage(video, crop.x, crop.y, crop.w, crop.h, 0, 0, canvas.width, canvas.height);
        try {
          const result = await recognize(canvas);
          // Ignore a result that finished after the user paused
          if (active && mode === 'live') handleResult(result);
        } catch {
          // One bad frame — just try the next one
        }
      }
      await sleep(DETECT_INTERVAL_MS);
    }
  }

  function handleResult(result) {
    const label = result.isFood ? result.guesses[0].label : null;
    streak = label === lastLabel ? streak + 1 : 1;
    lastLabel = label;

    // Keep the embedding fresh even while the label holds steady
    if (detection && label === detection.label) detection.embedding = result.embedding;
    if (streak < STABLE_FRAMES) return;

    if (label === null) {
      detection = null;
      showLiveInfo();
      return;
    }
    if (detection?.label !== label) {
      detection = { label, guesses: result.guesses.map(g => g.label), embedding: result.embedding };
      showLiveInfo();
    }
  }

  function showLiveInfo() {
    if (detection) {
      nameInput.value = detection.label;
      info.hidden = false;
      setStatus('Tap the screen to edit');
    } else {
      info.hidden = true;
      setStatus('Point at an item');
    }
  }

  // --- pause / resume ---

  function pause() {
    mode = 'paused';

    // Freeze on the current frame
    if (stream && video.readyState >= 2) {
      const full = document.createElement('canvas');
      full.width  = video.videoWidth;
      full.height = video.videoHeight;
      full.getContext('2d').drawImage(video, 0, 0);
      still.src = full.toDataURL('image/jpeg', 0.85);
      still.classList.add('active');
      video.classList.remove('active');
    }

    nameInput.readOnly = false;
    if (!detection) nameInput.value = '';
    renderGuesses(detection ? detection.guesses : []);
    info.hidden = false;
    setStatus('Tap the photo to go back to the camera');
  }

  function resume() {
    mode = 'live';
    still.classList.remove('active');
    still.removeAttribute('src');
    if (stream) video.classList.add('active');
    nameInput.readOnly = true;
    nameInput.blur();
    guessList.innerHTML = '';
    stepper.set(1);
    if (RECOGNITION_ENABLED && modelReady) {
      showLiveInfo();
    } else {
      info.hidden = true;
      setStatus(RECOGNITION_ENABLED ? '' : 'Tap the shutter to add an item');
    }
  }

  // Live: any tap on the preview pauses. The tap still reaches what it hit,
  // so tapping the name starts typing and tapping +/− changes the quantity.
  // Paused: tapping the photo (not the name, guesses or quantity) resumes.
  previewArea.addEventListener('click', e => {
    const onControls = e.target.closest('.detection-info');
    if (mode === 'live') {
      pause();
      if (e.target === nameInput) nameInput.focus();
    } else if (!onControls) {
      resume();
    }
  });

  // --- guesses (paused only) ---

  function renderGuesses(labels) {
    guessList.innerHTML = labels
      .map(label => `<button class="guess-chip" type="button">${escapeHTML(label)}</button>`)
      .join('');
    highlightGuess();
  }

  function highlightGuess() {
    const name = nameInput.value.trim().toLowerCase();
    guessList.querySelectorAll('.guess-chip').forEach(chip => {
      chip.setAttribute('aria-pressed', String(chip.textContent === name));
    });
  }

  guessList.addEventListener('click', e => {
    const chip = e.target.closest('.guess-chip');
    if (!chip) return;
    nameInput.value = chip.textContent;
    highlightGuess();
  });

  // Select the whole name on tap so typing replaces it (iOS needs the delay)
  nameInput.addEventListener('focus', () => {
    if (!nameInput.readOnly) setTimeout(() => nameInput.setSelectionRange(0, nameInput.value.length), 0);
  });
  nameInput.addEventListener('input', highlightGuess);
  nameInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') nameInput.blur();
  });

  // --- shutter: add to fridge ---

  function flash() {
    const el = document.createElement('div');
    el.className = 'capture-flash';
    previewArea.appendChild(el);
    setTimeout(() => el.remove(), 400);
  }

  function updateUndoButton() {
    undoBtn.classList.toggle('is-waiting', history.length === 0);
  }

  updateUndoButton();

  captureBtn.addEventListener('click', () => {
    const name = (mode === 'paused' ? nameInput.value : detection?.label ?? '').trim().toLowerCase();

    // Nothing named yet: pause so the user can type it
    if (!name) {
      if (mode === 'live') pause();
      nameInput.focus();
      setStatus('Type what it is, then tap the shutter');
      return;
    }

    const quantity = stepper.get();
    addItem(name, quantity);

    // Learn from items the user reviewed (paused), where corrections happen.
    // Quick live adds aren't learned, so a wrong guess can't teach itself.
    const learned = mode === 'paused' && detection?.embedding != null;
    if (learned) learn(name, detection.embedding);

    history.push({ name, quantity, learned });
    updateUndoButton();
    flash();
    resume();
    setStatus(`Added ${quantity} × ${name}`);
    fillSuggestions();
  });

  // --- undo ---

  undoBtn.addEventListener('click', () => {
    const last = history.pop();
    if (!last) {
      setStatus('Nothing to undo');
      return;
    }
    removeQuantity(last.name, last.quantity);
    if (last.learned) unlearnLast(last.name);
    updateUndoButton();
    setStatus(`Removed ${last.quantity} × ${last.name}`);
  });

  // --- continue: leave the camera ---

  continueBtn.addEventListener('click', () => {
    active = false;
    if (stream) {
      stream.getTracks().forEach(t => t.stop());
      stream = null;
    }
    onContinue();
  });
}
