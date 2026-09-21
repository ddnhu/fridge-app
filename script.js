import { renderCameraScreen } from './src/components/camera-screen.js';
import { renderFridgeScreen } from './src/components/fridge-screen.js';
import { renderRevealScreen } from './src/components/reveal-screen.js';

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

showCamera();
