export function renderCameraScreen(container) {
  container.innerHTML = `
    <video class="camera-bg" autoplay playsinline muted></video>
    <section class="camera-screen" aria-label="Camera capture">
      <div class="preview-area">
        <video class="camera-video" autoplay playsinline muted></video>
        <div class="preview-message">
          <p class="preview-label">Camera preview</p>
          <p class="preview-sublabel">Tap allow to enable camera</p>
        </div>
        <div class="detection-overlay">
          <div class="detection-frame"></div>
          <div class="detection-info">
            <span class="detection-label">Carrot</span>
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
        <button class="btn-retake" type="button" disabled aria-label="Retake photo">
          <img src="src/components/icons/arrow-forward.svg" width="50" height="50" alt="" aria-hidden="true" />
        </button>
      </div>
    </section>
  `;

  const bgVideo          = container.querySelector('.camera-bg');
  const video            = container.querySelector('.camera-video');
  const message          = container.querySelector('.preview-message');
  const qtyValue         = container.querySelector('.qty-value');
  const qtyUp            = container.querySelector('.qty-up');
  const qtyDown          = container.querySelector('.qty-down');

  let stream   = null;
  let quantity = 1;

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

  // --- quantity controls ---

  qtyUp.addEventListener('click', () => {
    quantity += 1;
    qtyValue.textContent = quantity;
  });

  qtyDown.addEventListener('click', () => {
    if (quantity > 1) {
      quantity -= 1;
      qtyValue.textContent = quantity;
    }
  });
}
