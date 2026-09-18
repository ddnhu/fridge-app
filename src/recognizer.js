// On-device food recognition with CLIP (via Transformers.js). Free and
// private: the model downloads once (~90 MB, then cached by the browser) and
// photos never leave the phone.
//
// Food fingerprints are precomputed by tools/build-embeddings.mjs into
// src/data/food-embeddings.json, so only the image half of CLIP runs here.
// On top of that, every item you save is remembered on this device as an
// extra example, so the app gets better at *your* fridge the more you use it.

import { getLearned } from './learned-examples.js';

// Loaded on demand, so the rest of the app still works if this CDN is
// unreachable (you can always type names instead)
const TRANSFORMERS_URL = 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.3.0';

// Must match MODEL_ID and DTYPE in tools/build-embeddings.mjs
const MODEL_ID = 'Xenova/clip-vit-base-patch32';
const DTYPE = 'q8';

// How name matches and example-photo matches are combined. Checked against a
// handful of test photos, not yet tuned on real fridge photos: a near-identical
// photo (similarity ~0.96) adds ~9, an unrelated food (~0.75) adds ~0.1.
const TEXT_SCALE = 100;       // CLIP's own logit scale for name matches
const PHOTO_WEIGHT = 20;      // boost from the closest example photo of a food
const PHOTO_SHARPNESS = 20;   // higher = only very similar photos count
const PHOTO_ONLY_OFFSET = 4;  // foods with no name match start this far below the best one
const PHOTO_ONLY_MIN_SIMILARITY = 0.8; // ...and only compete when a photo is this similar

let loading = null;

// Starts the download; safe to call repeatedly. onProgress gets 0–100.
export function loadRecognizer(onProgress = () => {}) {
  if (!loading) {
    loading = (async () => {
      const files = {};
      const progress_callback = p => {
        if (p.status !== 'progress' || !p.total) return;
        files[p.file] = p;
        const all = Object.values(files);
        const loaded = all.reduce((s, f) => s + f.loaded, 0);
        const total = all.reduce((s, f) => s + f.total, 0);
        onProgress(Math.round((loaded / total) * 100));
      };

      const { AutoProcessor, CLIPVisionModelWithProjection, RawImage } = await import(TRANSFORMERS_URL);
      const [processor, model, data] = await Promise.all([
        AutoProcessor.from_pretrained(MODEL_ID, { progress_callback }),
        CLIPVisionModelWithProjection.from_pretrained(MODEL_ID, { dtype: DTYPE, progress_callback }),
        fetch(new URL('./data/food-embeddings.json', import.meta.url)).then(r => r.json()),
      ]);
      return { processor, model, data, RawImage };
    })();
    // Let a later call retry if this attempt fails (e.g. offline)
    loading.catch(() => { loading = null; });
  }
  return loading;
}

// Every food name the app knows, for the type-ahead list
export async function getKnownLabels() {
  const { data } = await loadRecognizer();
  return [...new Set([...data.labels, ...getLearned().map(e => e.label)])].sort();
}

function dot(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += a[i] * b[i];
  return sum;
}

// Returns { isFood, guesses: [{ label, score }] most likely first, embedding }
// for a canvas. isFood is false when a non-food scene (empty shelf, hand…)
// beats every food. Pass the embedding to learn() once the user confirms.
export async function recognize(canvas, topK = 3) {
  const { processor, model, data, RawImage } = await loadRecognizer();

  const { image_embeds } = await model(await processor(RawImage.fromCanvas(canvas)));
  const raw = Array.from(image_embeds.data);
  const len = Math.hypot(...raw);
  const embedding = raw.map(x => x / len);

  const scores = new Map(); // label -> logit
  data.text.forEach((textEmb, i) => {
    scores.set(data.labels[i], TEXT_SCALE * dot(embedding, textEmb));
  });

  // Foods known only from your saved photos (no name fingerprint) start just
  // below the best name match, so a close photo match lifts them to the top
  const baseline = Math.max(...scores.values()) - PHOTO_ONLY_OFFSET;

  // Boost each food by its single closest example photo
  const examples = [
    ...data.photos.map(p => ({ label: data.labels[p.label], embedding: p.embedding })),
    ...getLearned(),
  ];
  const closest = new Map();
  for (const ex of examples) {
    const similarity = dot(embedding, ex.embedding);
    if (similarity > (closest.get(ex.label) ?? -1)) closest.set(ex.label, similarity);
  }
  for (const [label, similarity] of closest) {
    if (!scores.has(label) && similarity < PHOTO_ONLY_MIN_SIMILARITY) continue;
    const boost = PHOTO_WEIGHT * Math.exp(-PHOTO_SHARPNESS * (1 - similarity));
    scores.set(label, (scores.get(label) ?? baseline) + boost);
  }

  // Non-food scenes compete too, but never show up as guesses
  const bestBackground = Math.max(...(data.background ?? []).map(b => TEXT_SCALE * dot(embedding, b)));
  const isFood = Math.max(...scores.values()) > bestBackground;

  // Softmax so scores read as rough confidences that sum to 1
  const entries = [...scores.entries()];
  const max = Math.max(...entries.map(([, l]) => l));
  const exps = entries.map(([label, l]) => [label, Math.exp(l - max)]);
  const total = exps.reduce((s, [, x]) => s + x, 0);

  const guesses = exps
    .map(([label, x]) => ({ label, score: x / total }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
  return { isFood, guesses, embedding };
}
