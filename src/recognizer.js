// On-device food recognition with CLIP (via Transformers.js). Free and
// private: the model downloads once (~90 MB, then cached by the browser) and
// photos never leave the phone.
//
// Food fingerprints are precomputed by tools/build-embeddings.mjs into
// src/data/food-embeddings.json, so only the image half of CLIP runs here.

import {
  AutoProcessor,
  CLIPVisionModelWithProjection,
  RawImage,
} from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.3.0';

// Must match MODEL_ID and DTYPE in tools/build-embeddings.mjs
const MODEL_ID = 'Xenova/clip-vit-base-patch32';
const DTYPE = 'q8';

// How text-name matches and example-photo matches are combined (Tip-Adapter
// style). These are sensible starting values, not tuned — raise PHOTO_WEIGHT
// if your example photos should count for more.
const TEXT_SCALE = 100;   // CLIP's own logit scale for name matches
const PHOTO_WEIGHT = 2;   // how much each close example photo adds
const PHOTO_SHARPNESS = 5.5; // higher = only very similar photos count

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

      const [processor, model, data] = await Promise.all([
        AutoProcessor.from_pretrained(MODEL_ID, { progress_callback }),
        CLIPVisionModelWithProjection.from_pretrained(MODEL_ID, { dtype: DTYPE, progress_callback }),
        fetch(new URL('./data/food-embeddings.json', import.meta.url)).then(r => r.json()),
      ]);
      return { processor, model, data };
    })();
    // Let a later call retry if this attempt fails (e.g. offline)
    loading.catch(() => { loading = null; });
  }
  return loading;
}

function dot(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += a[i] * b[i];
  return sum;
}

// Returns the best guesses for a canvas, most likely first: [{ label, score }]
export async function recognize(canvas, topK = 3) {
  const { processor, model, data } = await loadRecognizer();

  const { image_embeds } = await model(await processor(RawImage.fromCanvas(canvas)));
  const raw = Array.from(image_embeds.data);
  const len = Math.hypot(...raw);
  const embedding = raw.map(x => x / len);

  const logits = data.text.map(textEmb => TEXT_SCALE * dot(embedding, textEmb));
  for (const photo of data.photos) {
    const similarity = dot(embedding, photo.embedding);
    logits[photo.label] += PHOTO_WEIGHT * Math.exp(-PHOTO_SHARPNESS * (1 - similarity));
  }

  // Softmax so scores read as rough confidences that sum to 1
  const max = Math.max(...logits);
  const exps = logits.map(l => Math.exp(l - max));
  const total = exps.reduce((s, x) => s + x, 0);

  return exps
    .map((x, i) => ({ label: data.labels[i], score: x / total }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}
