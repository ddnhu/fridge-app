import { getItems, setQuantity, renameItem, removeItem } from '../fridge-store.js';
import { relabel } from '../learned-examples.js';
import { quantityStepperHTML, bindQuantityStepper } from './quantity-stepper.js';
import { pressBarHTML, bindPressBar } from './press-bar.js';
import { escapeHTML } from '../escape-html.js';

export function renderFridgeScreen(container, { onBack, onPress }) {
  container.innerHTML = `
    <section class="fridge-screen" aria-label="My fridge">
      <header class="fridge-header">
        <button class="btn-back" type="button" aria-label="Back to camera">
          <svg width="11" height="18" viewBox="0 0 11 18" fill="none" aria-hidden="true">
            <path d="M9 2L2 9L9 16" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Camera</span>
        </button>
        <h1 class="fridge-title">My fridge</h1>
      </header>
      <ul class="fridge-list"></ul>
      <p class="fridge-empty" hidden>Nothing set yet. Photograph something to add it.</p>
      ${pressBarHTML('Press')}
    </section>
  `;

  const list  = container.querySelector('.fridge-list');
  const empty = container.querySelector('.fridge-empty');

  container.querySelector('.btn-back').addEventListener('click', onBack);
  bindPressBar(container, { onPress });

  function render() {
    // Newest first
    const items = getItems().sort((a, b) => b.addedAt.localeCompare(a.addedAt));
    empty.hidden = items.length > 0;
    container.querySelector('.press-bar').hidden = items.length === 0;

    list.innerHTML = items.map(item => `
      <li class="fridge-item">
        <label class="fridge-item-name">
          <input type="text" value="${escapeHTML(item.name)}" enterkeyhint="done"
                 autocomplete="off" autocapitalize="none" spellcheck="false"
                 aria-label="Name of ${escapeHTML(item.name)}" />
        </label>
        ${quantityStepperHTML(item.quantity, `${escapeHTML(item.name)} quantity`)}
        <button class="btn-remove" type="button" aria-label="Remove ${escapeHTML(item.name)}">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </li>
    `).join('');

    list.querySelectorAll('.fridge-item').forEach((row, i) => {
      const { name } = items[i];
      const input = row.querySelector('input');

      bindQuantityStepper(row, {
        value: items[i].quantity,
        onChange: quantity => setQuantity(name, quantity),
      });

      // Rename on leaving the field; renaming into an existing name merges them
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter') input.blur();
      });
      input.addEventListener('change', () => {
        const newName = input.value.trim().toLowerCase();
        if (!newName || newName === name) {
          input.value = name;
          return;
        }
        renameItem(name, newName);
        relabel(name, newName);
        render();
      });

      row.querySelector('.btn-remove').addEventListener('click', () => {
        removeItem(name);
        render();
      });
    });
  }

  render();
}
