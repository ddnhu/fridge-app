// Down / count / up control, used on the camera screen and in the fridge list.

export function quantityStepperHTML(value = 1, label = 'quantity') {
  return `
    <div class="qty-stepper">
      <button class="qty-btn qty-down" type="button" aria-label="Decrease ${label}">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 6L8 11L13 6" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <span class="qty-value">${value}</span>
      <button class="qty-btn qty-up" type="button" aria-label="Increase ${label}">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 10L8 5L13 10" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  `;
}

// Wires up a stepper rendered by quantityStepperHTML. Returns a setter so the
// owner can reset the value. Never goes below 1.
export function bindQuantityStepper(root, { value = 1, onChange = () => {} } = {}) {
  const valueEl = root.querySelector('.qty-value');
  let current = value;

  function set(n, notify = false) {
    current = Math.max(1, n);
    valueEl.textContent = current;
    if (notify) onChange(current);
  }

  root.querySelector('.qty-up').addEventListener('click', () => set(current + 1, true));
  root.querySelector('.qty-down').addEventListener('click', () => {
    if (current > 1) set(current - 1, true);
  });

  return { set: n => set(n), get: () => current };
}
