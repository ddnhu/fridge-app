import { renderCameraScreen } from './src/components/camera-screen.js';
import { renderFridgeScreen } from './src/components/fridge-screen.js';
import { renderRevealScreen } from './src/components/reveal-screen.js';
import { applySeed } from './src/dev-seed.js';   // test-only, see the file

const app = document.getElementById('app');

function showCamera() {
  renderCameraScreen(app, { onContinue: showFridge });
}

function showFridge() {
  renderFridgeScreen(app, { onBack: showCamera, onPress: showReveal });
}

function showReveal() {
  renderRevealScreen(app, { onBack: showFridge });
}

// ?seed fills the fridge and skips the scan, for testing on a phone
if (applySeed()) showFridge();
else showCamera();
