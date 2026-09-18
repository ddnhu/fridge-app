import { loadRecognizer, recognize } from '../recognizer.js';
import { getItems, addItem } from '../fridge-store.js';

// Fridge icon fills up as items are saved. Thresholds are easy to tweak here.
const FRIDGE_STATES = [
  { max: 0,        file: 'fridge-empty.svg'  },
  { max: 8,        file: 'fridge-low.svg'    },
  { max: 16,       file: 'fridge-medium.svg' },
  { max: Infinity, file: 'fridge-full.svg'   },
];

export function renderCameraScreen(container) {
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
            <input class="detection-label" type="text" list="food-options" enterkeyhint="done"
                   autocomplete="off" autocapitalize="none" spellcheck="false"
                   placeholder="What is it?" aria-label="Food name" />
            <datalist id="food-options"></datalist>
            <div class="detection-quantity">
              <button class="qty-btn qty-down" type="button" aria-label="Decrease quantity">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 6L8 11L13 6" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <span class="qty-value">1</span>
              <button class="qty-btn qty-up" type="button" aria-label="Increase quantity">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 10L8 5L13 10" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          <p class="detection-status" role="status"></p>
        </div>
      </div>
      <div class="controls">
        <!-- Fridge icon is a placeholder for the future fridge/inventory view.
             It is not tappable in the MVP. The old gallery screen lives in git
             history (src/components/gallery-screen.js, removed after 0e91e8e). -->
        <button class="btn-library" type="button" disabled aria-label="Fridge (coming soon)">
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
  const qtyValue   = container.querySelector('.qty-value');
  const qtyUp      = container.querySelector('.qty-up');
  const qtyDown    = container.querySelector('.qty-down');
  const captureBtn = container.querySelector('.btn-capture');
  const addBtn     = container.querySelector('.btn-retake');
  const fridgeIcon = container.querySelector('.fridge-icon');

  let stream    = null;
  let quantity  = 1;
  let captured  = false;
  let captureId = 0; // ignores recognition results from a photo that was retaken
  let modelReady = false;

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

  // --- quantity controls ---

  function setQuantity(n) {
    quantity = n;
    qtyValue.textContent = quantity;
  }

  qtyUp.addEventListener('click', () => setQuantity(quantity + 1));
  qtyDown.addEventListener('click', () => {
    if (quantity > 1) setQuantity(quantity - 1);
  });

  // --- capture / retake ---

  function updateAddButton() {
    addBtn.disabled = !captured || nameInput.value.trim() === '';
  }

  function showLive() {
    captured = false;
    captureId += 1;
    still.classList.remove('active');
    still.removeAttribute('src');
    if (stream) video.classList.add('active');
    info.hidden = true;
    nameInput.value = '';
    options.innerHTML = '';
    setQuantity(1);
    captureBtn.setAttribute('aria-label', 'Capture photo');
    updateAddButton();
  }

  async function capture() {
    if (!stream || video.readyState < 2) return;

    canvas.width  = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);

    // Freeze the preview on the captured frame
    still.src = canvas.toDataURL('image/jpeg', 0.85);
    still.classList.add('active');
    video.classList.remove('active');
    captured = true;
    const id = ++captureId;
    captureBtn.setAttribute('aria-label', 'Retake photo');

    info.hidden = false;
    updateAddButton();
    setStatus(modelReady ? 'Identifying…' : 'Waiting for food recognition to download…');

    try {
      const guesses = await recognize(canvas);
      if (id !== captureId) return; // photo was retaken meanwhile

      // Pre-fill the best guess unless the user already started typing
      if (nameInput.value.trim() === '') nameInput.value = guesses[0].label;
      options.innerHTML = guesses
        .map(g => `<option value="${g.label}"></option>`)
        .join('');
      setStatus(guesses.slice(1).length
        ? `Or maybe: ${guesses.slice(1).map(g => g.label).join(', ')}`
        : '');
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

  // --- add to fridge ---

  nameInput.addEventListener('input', updateAddButton);
  nameInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') nameInput.blur();
  });

  addBtn.addEventListener('click', () => {
    const name = nameInput.value.trim().toLowerCase();
    if (!captured || !name) return;
    addItem(name, quantity);
    const saved = `Added ${quantity} × ${name}`;
    showLive();
    setStatus(saved);
    updateFridgeIcon({ animate: true });
  });
}
