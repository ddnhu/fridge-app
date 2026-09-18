import { renderCameraScreen } from './src/components/camera-screen.js';
import { renderFridgeScreen } from './src/components/fridge-screen.js';

const app = document.getElementById('app');

function showCamera() {
  renderCameraScreen(app, { onContinue: showFridge });
}

function showFridge() {
  renderFridgeScreen(app, { onBack: showCamera });
}

showCamera();
