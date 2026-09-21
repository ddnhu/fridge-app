// How to cook it, and proof that you did.
//
// The reveal closes the decision; this screen is what happens after. It gets
// its own page because steps are a different act of reading — you come back to
// them, mid-cook, with one hand — and because the reveal has to stay a single
// held moment rather than a page you scroll.
//
// Motion budget: the steps drift in. The only thing that SNAPS is the photo
// landing in the plate, and it rhymes with the stamp on purpose — the stamp
// closes the decision, the photo closes the meal.

import { escapeHTML } from '../escape-html.js';
import { getCookedToday, saveCooked, toStoredPhoto } from '../cooked-store.js';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];

function today() {
  const now = new Date();
  return `${now.getDate()} ${MONTHS[now.getMonth()]}`;
}

// A line drawing, not a filled glyph: everything else on this page is drawn
// with a stroke too, and the plate is empty until you fill it.
const CAMERA = `
  <svg class="plate-icon" viewBox="0 0 64 48" fill="none" aria-hidden="true">
    <path d="M2 12h13l4-6h26l4 6h13v34H2z" stroke="currentColor" stroke-width="2"/>
    <circle cx="32" cy="28" r="11" stroke="currentColor" stroke-width="2"/>
  </svg>`;

export function renderStepsScreen(container, { meal, onBack }) {
  // A recipe with one instruction gets no numeral — 42 of the 54 are genuinely
  // one instruction, and a lone "1" above a single line looks like a list that
  // broke. Numerals appear only where there is an order to keep.
  const many = meal.steps.length > 1;

  container.innerHTML = `
    <section class="steps-screen" aria-label="${escapeHTML(meal.name)}">
      <button class="btn-back-quiet steps-back" type="button">Tonight</button>

      <p class="steps-dish">${escapeHTML(meal.name)}</p>
      <h1 class="steps-head">Steps</h1>

      <ol class="steps-list">
        ${meal.steps.map((step, i) => `
          <li>${many ? `<span class="steps-n">${i + 1}</span>` : ''}<span class="steps-text">${escapeHTML(step)}</span></li>
        `).join('')}
      </ol>

      ${meal.pantry?.length ? `
        <div class="steps-pantry">
          <p class="steps-pantry-label">from the pantry</p>
          <p class="steps-pantry-list">${meal.pantry.map(escapeHTML).join(' · ')}</p>
        </div>` : ''}

      <div class="plate-block">
        <label class="plate">
          <input class="plate-input" type="file" accept="image/*" capture="environment">
          ${CAMERA}
          <img class="plate-photo" alt="" hidden>
        </label>
        <p class="plate-label">when it's done</p>
      </div>
    </section>
  `;

  const screen = container.querySelector('.steps-screen');
  const plate  = container.querySelector('.plate');
  const input  = container.querySelector('.plate-input');
  const photo  = container.querySelector('.plate-photo');
  const label  = container.querySelector('.plate-label');

  container.querySelector('.steps-back').addEventListener('click', onBack);

  function show(dataUrl, { animate }) {
    photo.src = dataUrl;
    photo.hidden = false;
    plate.classList.add('filled');
    label.textContent = `cooked ${today()}`;
    // snap only when it lands for the first time. Coming back to a photo you
    // already took should feel like it was always there.
    if (animate) {
      plate.classList.add('landing');
      plate.addEventListener('animationend', () => plate.classList.remove('landing'), { once: true });
    }
  }

  const already = getCookedToday(meal.id);
  if (already) show(already.photo, { animate: false });

  input.addEventListener('change', async () => {
    const file = input.files?.[0];
    if (!file) return;

    plate.classList.add('working');
    try {
      const dataUrl = await toStoredPhoto(file);
      saveCooked(meal.id, meal.name, dataUrl);
      show(dataUrl, { animate: true });
    } catch {
      // A photo that won't read is not worth losing the screen over.
      label.textContent = "that photo wouldn't load";
    } finally {
      plate.classList.remove('working');
      input.value = '';   // so picking the same file again still fires
    }
  });

  requestAnimationFrame(() => screen.classList.add('play'));
}
