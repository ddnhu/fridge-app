// Picks tonight's meal from what's in the fridge.
//
// Runs entirely on the device against a bundled recipe set: no API, no key,
// no network. The site is served from a public URL, so nothing secret can
// live in here anyway — and a local set can't fail on a bad connection.
//
// Ingredient names match the recognizer's vocabulary exactly (see
// src/data/food-embeddings.json), so whatever the camera identifies can be
// looked up directly. Staples — rice, pasta, oil, salt, flour, stock — are
// assumed rather than detected.

import { getItems } from './fridge-store.js';

const RECIPES_URL = new URL('./data/recipes.json', import.meta.url);

let recipes = null;

export async function loadRecipes() {
  if (!recipes) {
    recipes = fetch(RECIPES_URL)
      .then(r => r.json())
      .catch(err => { recipes = null; throw err; });
  }
  return recipes;
}

// A required ingredient is worth more than a nice-to-have, so a recipe that
// needs three things you have beats one that needs one thing and could use
// five others.
const REQUIRED_WEIGHT = 2;
const OPTIONAL_WEIGHT = 1;

function score(recipe, have) {
  const missing = recipe.requires.filter(name => !have.has(name));
  if (missing.length) return null;

  const used = recipe.optional.filter(name => have.has(name));
  return {
    recipe,
    score: recipe.requires.length * REQUIRED_WEIGHT + used.length * OPTIONAL_WEIGHT,
    uses: [...recipe.requires, ...used],
  };
}

// "the last of the milk" when it's the only one left — the fridge is mostly
// halves and ends, and saying so is the whole point of the app.
function phrase(name, quantity) {
  return quantity === 1 ? `The last of the ${name}` : name;
}

function sentenceCase(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// The three lines of the reveal: what this meal makes of YOUR fridge.
// Required ingredients first, since they're what the dish actually is.
//
// Most of a real fridge is down to its last one of everything, so only ONE
// line gets the "last of the" treatment — the last line, where it lands —
// and the others are named plainly. Three of them in a row is a tic.
function accord(match, quantities) {
  const names = match.uses.slice(0, 3);
  const lastSingle = names.map(n => quantities.get(n)).lastIndexOf(1);

  return names.map((name, i) =>
    sentenceCase(i === lastSingle ? phrase(name, 1) : name)
  );
}

/**
 * Ranks every cookable recipe against the fridge, best first.
 *
 * Each entry is { id, name, method, lines, uses } where `lines` is the
 * three-line accord the reveal sets, already phrased.
 */
export async function rank(items = getItems()) {
  const all = await loadRecipes();
  const have = new Set(items.map(i => i.name));
  const quantities = new Map(items.map(i => [i.name, i.quantity]));

  return all
    .map(recipe => score(recipe, have))
    .filter(Boolean)
    .sort((a, b) => b.score - a.score || a.recipe.name.localeCompare(b.recipe.name))
    .map(match => ({
      id: match.recipe.id,
      name: match.recipe.name,
      method: match.recipe.method,
      lines: accord(match, quantities),
      uses: match.uses,
    }));
}

/**
 * One scan's worth of suggestions.
 *
 * Three refusals per scan, then it sets the same meal again and the button
 * goes. Unlimited rerolls would undo the thing the app is for: closure.
 */
export const REFUSALS_PER_SCAN = 3;

export async function startScan(items = getItems()) {
  const ranked = await rank(items);
  let index = 0;

  return {
    get meal() {
      return ranked[Math.min(index, ranked.length - 1)] ?? null;
    },
    get refusalsLeft() {
      return Math.max(0, REFUSALS_PER_SCAN - index);
    },
    get exhausted() {
      return index >= REFUSALS_PER_SCAN || index >= ranked.length - 1;
    },
    get rejected() {
      return ranked.slice(0, index);
    },
    get count() {
      return ranked.length;
    },
    /** Returns the next meal, or the same one once you're out of refusals. */
    reject() {
      if (!this.exhausted) index += 1;
      return this.meal;
    },
  };
}
