// Fills the fridge from the URL, so the meal loop can be tested on a phone
// without scanning eleven things first.
//
//   ?seed        a typical half-empty fridge, and skip straight to the list
//   ?seed=few    only enough for one or two meals
//   ?seed=empty  clear it out, to check the blank states
//
// The parameter is stripped afterwards, so a reload doesn't wipe out edits
// made since. Test-only: delete this file and its two lines in script.js
// when the app has a real way to fill a fridge.

const FRIDGES = {
  // Danni's fridge as described: halves, ends, and something that needs using
  full: [
    ['beef mince', 1], ['carrot', 2], ['milk', 1], ['butter', 1],
    ['cheese', 1], ['onion', 1], ['spring onion', 2], ['celery', 1],
    ['mushroom', 1], ['tomato', 1], ['eggs', 6], ['lemon', 1],
  ],
  few: [
    ['eggs', 2], ['bread', 1], ['cheese', 1],
  ],
  empty: [],
};

export function applySeed() {
  const params = new URLSearchParams(location.search);
  if (!params.has('seed')) return false;

  const which = params.get('seed') || 'full';
  const fridge = FRIDGES[which] ?? FRIDGES.full;
  const now = Date.now();

  localStorage.setItem('fridge-items', JSON.stringify(
    fridge.map(([name, quantity], i) => ({
      name,
      quantity,
      addedAt: new Date(now + i * 1000).toISOString(),
    }))
  ));

  params.delete('seed');
  const query = params.toString();
  history.replaceState(null, '', location.pathname + (query ? `?${query}` : ''));

  return true;
}
