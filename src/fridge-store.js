// Saves fridge items on this device. There's no screen to view them yet —
// the fridge icon is a placeholder for that future view.

const KEY = 'fridge-items';

export function getItems() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function addItem(name, quantity) {
  const items = getItems();
  items.push({ name, quantity, addedAt: new Date().toISOString() });
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    // Storage unavailable (e.g. private browsing) — item is lost on reload
  }
  return items;
}
