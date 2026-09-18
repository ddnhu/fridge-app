// Photos of items you've saved, remembered on this device as extra examples
// so recognition gets better at *your* fridge. Stored as CLIP fingerprints
// (512 numbers each), not as images.

const KEY = 'learned-examples';
const MAX = 200; // ~3 KB each; keeps well under the localStorage limit

export function getLearned() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

function save(learned) {
  try {
    localStorage.setItem(KEY, JSON.stringify(learned.slice(-MAX)));
  } catch {
    // Storage full or unavailable — just don't learn this one
  }
}

export function learn(label, embedding) {
  save([...getLearned(), { label, embedding: embedding.map(x => Math.round(x * 1e4) / 1e4) }]);
}

// When a saved item is renamed in the fridge, its photos were of the new name
export function relabel(oldLabel, newLabel) {
  save(getLearned().map(e => (e.label === oldLabel ? { ...e, label: newLabel } : e)));
}
