// Tonight's meal, decided.
//
// The hero of the app, built to docs/creative/decision-record.md. Two motion
// characters share the screen and the contrast is the whole design:
//
//   drift  — the title eases in FROM REST over 760ms. Consideration.
//   snap   — the stamp starts at full speed and stops dead. Closure.
//
// One element per screen may snap. Everything else drifts.

import { startScan, REFUSALS_PER_SCAN } from '../recipe-engine.js';
import { escapeHTML } from '../escape-html.js';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];

function today() {
  const now = new Date();
  return `${now.getDate()} ${MONTHS[now.getMonth()]}`;
}

// "Returned. Two left." — a book is returned; the register does the work so
// the writing doesn't have to.
const WORDS = ['none', 'One', 'Two', 'Three'];

export async function renderRevealScreen(container, { onBack }) {
  container.innerHTML = `
    <section class="reveal-screen" aria-label="Tonight">
      <div class="reveal-rule"></div>

      <h1 class="reveal-title"></h1>
      <p class="reveal-method"></p>

      <p class="reveal-nothing" hidden>The page is blank.</p>

      <div class="reveal-foot">
        <p class="reveal-label">from the fridge</p>
        <p class="reveal-stamp"><span>${escapeHTML(today())}</span></p>
        <ul class="reveal-considered" hidden></ul>
      </div>

      <button class="btn-refuse" type="button">Not that</button>
      <button class="btn-back-quiet" type="button">Fridge</button>
    </section>
  `;

  const screen     = container.querySelector('.reveal-screen');
  const title      = container.querySelector('.reveal-title');
  const method     = container.querySelector('.reveal-method');
  const nothing    = container.querySelector('.reveal-nothing');
  const considered = container.querySelector('.reveal-considered');
  const refuse     = container.querySelector('.btn-refuse');

  container.querySelector('.btn-back-quiet').addEventListener('click', onBack);

  const scan = await startScan();

  function setMeal(meal) {
    title.innerHTML = meal.lines
      .map(line => `<span class="line">${escapeHTML(line)}</span>`)
      .join('');
    method.textContent = meal.method;
  }

  // Removing .play and adding it back in one frame does NOT restart a
  // transition that has a delay — it's still sitting in that delay, so
  // nothing returns to its start state. Suppress transitions for a frame.
  function play() {
    screen.classList.add('no-anim');
    screen.classList.remove('play');
    void screen.offsetWidth;
    screen.classList.remove('no-anim');
    void screen.offsetWidth;
    screen.classList.add('play');
  }

  function showConsidered() {
    const rejected = scan.rejected;
    considered.hidden = rejected.length === 0;
    considered.innerHTML = rejected.length
      ? `<li class="considered-head">also considered</li>` +
        rejected.map(m => `<li>${escapeHTML(m.name)}</li>`).join('')
      : '';
  }

  if (!scan.meal) {
    // Nothing in the fridge, or nothing cookable in it
    nothing.hidden = false;
    title.hidden = true;
    method.hidden = true;
    refuse.hidden = true;
    screen.classList.add('play');
    return;
  }

  setMeal(scan.meal);
  refuse.textContent = `Not that · ${WORDS[scan.refusalsLeft]} left`;
  play();

  refuse.addEventListener('click', () => {
    const next = scan.reject();
    showConsidered();

    // Out: the title drops back and fades with NO stagger. It does not
    // perform on the way out. The next reveal begins at 200ms.
    screen.classList.add('refusing');
    setTimeout(() => {
      screen.classList.remove('refusing');
      setMeal(next);
      play();

      if (scan.exhausted) {
        refuse.hidden = true;           // out of refusals: it's decided
      } else {
        refuse.textContent = `Not that · ${WORDS[scan.refusalsLeft]} left`;
      }
    }, 200);
  });
}
