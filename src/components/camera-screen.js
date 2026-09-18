import { loadRecognizer, recognize, getKnownLabels } from '../recognizer.js';
import { learn } from '../learned-examples.js';
import { getItems, addItem } from '../fridge-store.js';
import { quantityStepperHTML, bindQuantityStepper } from './quantity-stepper.js';
import { escapeHTML } from '../escape-html.js';

// Fridge icon fills up as items are saved. Thresholds are easy to tweak here.
const FRIDGE_STATES = [
  { max: 0,        file: 'fridge-empty.svg'  },
  { max: 8,        file: 'fridge-low.svg'    },
  { max: 16,       file: 'fridge-medium.svg' },
  { max: Infinity, file: 'fridge-full.svg'   },
];

export function renderCameraScreen(container, { onOpenFridge }) {
  container.innerHTML = `
    <video class="camera-bg" autoplay playsinline muted></video>
    <section class="camera-screen" aria-label="Camera capture">
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
                     autocomplete="off" autocapitalize="none" spellcheck="false"
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
        <button class="btn-library" type="button" aria-label="Open fridge">
          <img class="fridge-icon" src="src/components/icons/fridge-empty.svg" width="70" height="70" alt="" aria-hidden="true" />
        </button>
        <button class="btn-capture" type="button" aria-label="Capture photo"></button>
        <button class="btn-retake" type="button" disabled aria-label="Add to fridge">
          <img src="src/components/icons/arrow-forward.svg" width="50" height="50" alt="" aria-hidden="true" />
        </button>
      </div>
    </section>
    <canvas class="camera-canvas" hidden></canvas>
  `;

  const bgVideo    = container.querySelector('.camera-bg');
  const video      = container.querySelector('.camera-video');
  const still      = container.querySelector('.camera-still');
  const canvas     = container.querySelector('.camera-canvas');
  const message    = container.querySelector('.preview-message');
  const status     = container.querySelector('.detection-status');
  const info       = container.querySelector('.detection-info');
  const nameInput  = container.querySelector('.detection-label');
  const options    = container.querySelector('#food-options');
  const guessList  = container.querySelector('.detection-guesses');
  const frame      = container.querySelector('.detection-frame');
  const captureBtn = container.querySelector('.btn-capture');
  const addBtn     = container.querySelector('.btn-retake');
  const fridgeIcon = container.querySelector('.fridge-icon');
  const fridgeBtn  = container.querySelector('.btn-library');

  let stream    = null;
  let captured  = false;
  let captureId = 0; // ignores recognition results from a photo that was retaken
  let modelReady = false;
  let embedding  = null; // fingerprint of the current photo, learned on save

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
        video.classList.add('active');
        message.hidden = true;
      })
      .catch(() => {
        // Permission denied or no camera — placeholder message stays visible
      });
  }

  startCamera();

  // --- recognition model (downloads in the background) ---

  function setStatus(text) {
    status.textContent = text;
  }

  setStatus('Getting food recognition ready…');
  loadRecognizer(pct => {
    if (!modelReady && !captured) setStatus(`Downloading food recognition… ${pct}%`);
  })
    .then(() => {
      modelReady = true;
      if (!captured) setStatus('');
    })
    .catch(() => {
      if (!captured) setStatus('Food recognition unavailable — you can still type names');
    });

  // --- fridge icon ---

  function updateFridgeIcon({ animate = false } = {}) {
    const count = getItems().length;
    const file = FRIDGE_STATES.find(s => count <= s.max).file;
    const src = `src/components/icons/${file}`;
    if (fridgeIcon.getAttribute('src') === src) return;
    fridgeIcon.src = src;
    if (animate) {
      // Re-trigger the bounce: remove, force reflow, re-add
      fridgeIcon.classList.remove('bouncing');
      void fridgeIcon.offsetWidth;
      fridgeIcon.classList.add('bouncing');
    }
  }

  updateFridgeIcon();

  // --- quantity ---

  const stepper = bindQuantityStepper(info);

  // --- capture / retake ---

  function updateAddButton() {
    addBtn.disabled = !captured || nameInput.value.trim() === '';
  }

  // Guess chips: tapping one sets the name; the current name is highlighted
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
    updateAddButton();
  });

  function showLive() {
    captured = false;
    captureId += 1;
    embedding = null;
    still.classList.remove('active');
    still.removeAttribute('src');
    if (stream) video.classList.add('active');
    info.hidden = true;
    nameInput.value = '';
    guessList.innerHTML = '';
    stepper.set(1);
    captureBtn.setAttribute('aria-label', 'Capture photo');
    updateAddButton();
  }

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

  async function capture() {
    if (!stream || video.readyState < 2) return;

    // Only what's inside the frame goes to the recognizer, so shelves and
    // neighbouring items don't confuse it
    const crop = frameCrop();
    canvas.width  = Math.round(crop.w);
    canvas.height = Math.round(crop.h);
    canvas.getContext('2d').drawImage(video, crop.x, crop.y, crop.w, crop.h, 0, 0, canvas.width, canvas.height);

    // Freeze the preview on the full captured frame
    const full = document.createElement('canvas');
    full.width  = video.videoWidth;
    full.height = video.videoHeight;
    full.getContext('2d').drawImage(video, 0, 0);
    still.src = full.toDataURL('image/jpeg', 0.85);
    still.classList.add('active');
    video.classList.remove('active');
    captured = true;
    const id = ++captureId;
    captureBtn.setAttribute('aria-label', 'Retake photo');

    info.hidden = false;
    updateAddButton();
    setStatus(modelReady ? 'Identifying…' : 'Waiting for food recognition to download…');

    try {
      const result = await recognize(canvas);
      if (id !== captureId) return; // photo was retaken meanwhile
      embedding = result.embedding;

      const labels = result.guesses.map(g => g.label);
      // Pre-fill the best guess unless the user already started typing
      if (nameInput.value.trim() === '') nameInput.value = labels[0];
      renderGuesses(labels);
      setStatus('Wrong? Tap another guess or type the name');

      const known = await getKnownLabels();
      options.innerHTML = known.map(label => `<option value="${escapeHTML(label)}"></option>`).join('');
    } catch {
      if (id !== captureId) return;
      setStatus('Couldn’t identify it — type the name');
    }
    updateAddButton();
  }

  captureBtn.addEventListener('click', () => {
    if (captured) {
      showLive();
      setStatus('');
    } else {
      capture();
    }
  });

  // --- editing the name ---

  // Select the whole name on tap so typing replaces it (iOS needs the delay)
  nameInput.addEventListener('focus', () => {
    setTimeout(() => nameInput.setSelectionRange(0, nameInput.value.length), 0);
  });
  nameInput.addEventListener('input', () => {
    highlightGuess();
    updateAddButton();
  });
  nameInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') nameInput.blur();
  });

  // --- add to fridge ---

  addBtn.addEventListener('click', () => {
    const name = nameInput.value.trim().toLowerCase();
    if (!captured || !name) return;
    const quantity = stepper.get();
    addItem(name, quantity);
    // Remember this photo as an example of this food for next time
    if (embedding) learn(name, embedding);
    const saved = `Added ${quantity} × ${name}`;
    showLive();
    setStatus(saved);
    updateFridgeIcon({ animate: true });
  });

  // --- open fridge ---

  fridgeBtn.addEventListener('click', () => {
    if (stream) {
      stream.getTracks().forEach(t => t.stop());
      stream = null;
    }
    onOpenFridge();
  });
}
