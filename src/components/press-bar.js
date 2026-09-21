// The button. The most important control in the app.
//
// Pressing it is surrender, so the design argues for that: full-bleed red
// bar, no icon, no rounding, the whole bar is the tap target. On release it
// accelerates out of the bottom of the screen — and the same red comes back
// a second later as the stamp on the reveal. Surrender is one red object
// moving from your thumb to the page.

export function pressBarHTML(label = 'Press') {
  return `<button class="press-bar" type="button">${label}</button>`;
}

export function bindPressBar(container, { onPress }) {
  const bar = container.querySelector('.press-bar');
  if (!bar) return;

  bar.addEventListener('click', () => {
    bar.disabled = true;
    bar.classList.add('leaving');
    // 160ms of acceleration out of frame, then the screen changes behind it
    setTimeout(onPress, 160);
  });
}
