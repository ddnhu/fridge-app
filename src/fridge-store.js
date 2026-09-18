// Fridge contents, saved on this device. One entry per food name — adding a
// food that's already there increases its quantity instead.

const KEY = 'fridge-items';

// Combines entries with the same name (older saves could have duplicates)
function merge(items) {
  const byName = new Map();
  for (const item of items) {
    const existing = byName.get(item.name);
    if (existing) {
      existing.quantity += item.quantity;
      if (item.addedAt < existing.addedAt) existing.addedAt = item.addedAt;
    } else {
      byName.set(item.name, { ...item });
    }
  }
  return [...byName.values()];
}

export function getItems() {
  try {
    return merge(JSON.parse(localStorage.getItem(KEY)) || []);
  } catch {
    return [];
  }
}

function save(items) {
  try {
    localStorage.setItem(KEY, JSON.stringify(merge(items)));
  } catch {
    // Storage unavailable (e.g. private browsing) — changes are lost on reload
  }
}

export function addItem(name, quantity) {
  save([...getItems(), { name, quantity, addedAt: new Date().toISOString() }]);
}

export function setQuantity(name, quantity) {
  save(getItems().map(item => (item.name === name ? { ...item, quantity } : item)));
}

// Renaming to a name already in the fridge merges the two
export function renameItem(name, newName) {
  save(getItems().map(item => (item.name === name ? { ...item, name: newName } : item)));
}

export function removeItem(name) {
  save(getItems().filter(item => item.name !== name));
}
