import { renderCameraScreen } from './src/components/camera-screen.js';
import { renderFridgeScreen } from './src/components/fridge-screen.js';
import { renderRevealScreen } from './src/components/reveal-screen.js';
import { renderStepsScreen } from './src/components/steps-screen.js';
import { applySeed } from './src/dev-seed.js';   // test-only, see the file

const app = document.getElementById('app');

function showCamera() {
  renderCameraScreen(app, { onContinue: showFridge });
}

function showFridge() {
  renderFridgeScreen(app, { onBack: showCamera, onPress: showReveal });
}

function showReveal(resume = null) {
  renderRevealScreen(app, { onBack: showFridge, onSteps: showSteps, resume });
}

// The scan travels with the meal, so stepping out to cook and back doesn't
// forget what you already refused or make you watch the stamp land twice.
function showSteps(meal, scan) {
  renderStepsScreen(app, { meal, onBack: () => showReveal(scan) });
}

// ?seed fills the fridge and skips the scan, for testing on a phone
if (applySeed()) showFridge();
else showCamera();
