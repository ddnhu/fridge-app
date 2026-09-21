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
import { getItems } from '../fridge-store.js';
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

/**
 * `resume` is a scan handed back from the steps screen. Coming back from the
 * steps must not start a new scan — that would forget what you'd already
 * refused and hand you dish number one again — and it must not replay the
 * arrival. You've seen the decision land. It only lands once.
 */
export async function renderRevealScreen(container, { onBack, onSteps, resume = null }) {
  container.innerHTML = `
    <section class="reveal-screen" aria-label="Tonight">
      <div class="reveal-rule"></div>

      <h1 class="reveal-dish"></h1>
      <p class="reveal-accord"></p>

      <p class="reveal-nothing" hidden></p>

      <div class="reveal-foot">
        <p class="reveal-label">from the fridge</p>
        <p class="reveal-stamp"><span>${escapeHTML(today())}</span></p>
        <ul class="reveal-considered" hidden></ul>
      </div>

      <button class="btn-steps" type="button">Steps</button>
      <button class="btn-refuse" type="button">Not that</button>
      <button class="btn-back-quiet" type="button">Fridge</button>
    </section>
  `;

  const screen     = container.querySelector('.reveal-screen');
  const dish       = container.querySelector('.reveal-dish');
  const accord     = container.querySelector('.reveal-accord');
  const nothing    = container.querySelector('.reveal-nothing');
  const considered = container.querySelector('.reveal-considered');
  const refuse     = container.querySelector('.btn-refuse');
  const steps      = container.querySelector('.btn-steps');

  container.querySelector('.btn-back-quiet').addEventListener('click', onBack);

  const scan = resume ?? await startScan();

  // The reveal holds one meal at a time; this is the one the Steps button and
  // the stamp both refer to.
  let current = null;

  function setMeal(meal) {
    current = meal;
    dish.textContent = meal.name;
    accord.innerHTML = meal.lines
      .map(line => `<span class="line">${escapeHTML(line)}</span>`)
      .join('');
  }

  // The scan goes with it, so coming back resumes rather than restarts.
  steps.addEventListener('click', () => { if (current) onSteps(current, scan); });

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
    // Two different problems, and telling them apart matters: an empty
    // fridge is your fault, a fridge full of things that don't go together
    // is the app's. Both stay in the printing register — type that won't set.
    nothing.textContent = getItems().length
      ? 'Nothing sets tonight.'
      : 'The page is blank.';
    nothing.hidden = false;
    dish.hidden = true;
    accord.hidden = true;
    refuse.hidden = true;
    steps.hidden = true;
    screen.classList.add('play');
    return;
  }

  setMeal(scan.meal);
  showConsidered();
  refuse.hidden = scan.exhausted;
  refuse.textContent = `Not that · ${WORDS[scan.refusalsLeft]} left`;

  if (resume) {
    // Land it in its finished state with no transition, then hand transitions
    // back so refusing still animates.
    screen.classList.add('no-anim', 'play');
    void screen.offsetWidth;
    requestAnimationFrame(() => screen.classList.remove('no-anim'));
  } else {
    play();
  }

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
