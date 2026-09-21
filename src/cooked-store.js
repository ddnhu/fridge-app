// What you actually cooked, kept on this device.
//
// The stamp says the decision closed. Nothing so far says you cooked it —
// this does. One entry per night: the dish, the date, and the photograph.
//
// The accumulating view of these (docs/parking-lot.md, "Diaries") is NOT
// built. This file exists so that when it is, the data is already there.

const KEY = 'cooked-log';

// A phone photo is 2–4 MB and localStorage gives us about 5 MB in total, so
// what gets stored is a downscaled JPEG — roughly 80 KB. At journal sizes the
// difference is invisible and the difference in whether it saves at all is not.
const MAX_EDGE = 720;
const QUALITY = 0.72;

export function getCooked() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

function save(entries) {
  // Oldest first out, if we ever run out of room. Losing the photo from three
  // weeks ago is survivable; failing to save tonight's is not.
  let queue = [...entries];
  while (queue.length) {
    try {
      localStorage.setItem(KEY, JSON.stringify(queue));
      return;
    } catch {
      if (queue.length === 1) return;   // one entry and still too big: give up
      queue = queue.slice(1);
    }
  }
}

/** The photo for this dish tonight, if it's already been taken. */
export function getCookedToday(recipeId) {
  const today = new Date().toDateString();
  return getCooked().find(e => e.id === recipeId && e.date === today) || null;
}

export function saveCooked(recipeId, name, photo) {
  const today = new Date().toDateString();
  const entry = { id: recipeId, name, date: today, at: new Date().toISOString(), photo };
  save([...getCooked().filter(e => !(e.id === recipeId && e.date === today)), entry]);
  return entry;
}

/**
 * Reads a camera file and returns a downscaled JPEG data URL.
 *
 * Long edge to MAX_EDGE, centre of the frame kept square — the photo lands in
 * a square plate on the page and cropping here rather than in CSS means we
 * aren't storing pixels that never get shown.
 */
export async function toStoredPhoto(file) {
  const bitmap = await createImageBitmap(file);
  const side = Math.min(bitmap.width, bitmap.height);
  const size = Math.min(side, MAX_EDGE);

  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  canvas.getContext('2d').drawImage(
    bitmap,
    (bitmap.width - side) / 2, (bitmap.height - side) / 2, side, side,
    0, 0, size, size
  );
  bitmap.close?.();

  return canvas.toDataURL('image/jpeg', QUALITY);
}
