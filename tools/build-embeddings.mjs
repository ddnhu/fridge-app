// Builds src/data/food-embeddings.json: CLIP fingerprints for every food label
// (from its name) and for every example photo in training-photos/<food>/.
// The app loads this file so the phone only has to run the image half of CLIP.
//
// Usage (from tools/):  npm install  then  npm run embeddings

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  AutoTokenizer,
  CLIPTextModelWithProjection,
  AutoProcessor,
  CLIPVisionModelWithProjection,
  RawImage,
} from '@huggingface/transformers';

// Must match MODEL_ID and DTYPE in src/recognizer.js
const MODEL_ID = 'Xenova/clip-vit-base-patch32';
const DTYPE = 'q8';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LABELS_FILE = path.join(ROOT, 'tools', 'food-labels.txt');
const PHOTOS_DIR = path.join(ROOT, 'training-photos');
const OUT_FILE = path.join(ROOT, 'src', 'data', 'food-embeddings.json');

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

// Several phrasings per food, averaged — more robust than a single prompt
const PROMPTS = [
  label => `a photo of ${label}.`,
  label => `a photo of ${label}, a type of food.`,
  label => `a close-up photo of ${label} in a fridge.`,
];

// Folder names like "spring-onion" or "spring_onion" become "spring onion"
const folderToLabel = name => name.replace(/[-_]+/g, ' ').trim().toLowerCase();

function normalize(vec) {
  const len = Math.hypot(...vec);
  return vec.map(x => x / len);
}

// 4 decimal places keeps the file small with no visible effect on matching
const round = vec => vec.map(x => Math.round(x * 1e4) / 1e4);

async function readLabels() {
  const text = await fs.readFile(LABELS_FILE, 'utf8');
  return text
    .split('\n')
    .map(line => line.trim().toLowerCase())
    .filter(line => line && !line.startsWith('#'));
}

async function readPhotoFolders() {
  let entries;
  try {
    entries = await fs.readdir(PHOTOS_DIR, { withFileTypes: true });
  } catch {
    return [];
  }
  const folders = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const dir = path.join(PHOTOS_DIR, entry.name);
    const files = (await fs.readdir(dir))
      .filter(f => IMAGE_EXTS.has(path.extname(f).toLowerCase()))
      .map(f => path.join(dir, f));
    if (files.length) folders.push({ label: folderToLabel(entry.name), files });
  }
  return folders;
}

async function main() {
  const photoFolders = await readPhotoFolders();
  const labels = [...new Set([...(await readLabels()), ...photoFolders.map(f => f.label)])];

  console.log(`Loading ${MODEL_ID} (first run downloads ~150 MB)…`);

  // --- text fingerprints ---
  const tokenizer = await AutoTokenizer.from_pretrained(MODEL_ID);
  const textModel = await CLIPTextModelWithProjection.from_pretrained(MODEL_ID, { dtype: DTYPE });

  const text = [];
  for (const label of labels) {
    const inputs = tokenizer(PROMPTS.map(p => p(label)), { padding: true, truncation: true });
    const { text_embeds } = await textModel(inputs);
    const perPrompt = text_embeds.tolist().map(normalize);
    const mean = perPrompt[0].map((_, i) => perPrompt.reduce((sum, v) => sum + v[i], 0));
    text.push(round(normalize(mean)));
  }
  console.log(`Text: ${labels.length} foods`);

  // --- photo fingerprints ---
  const photos = [];
  if (photoFolders.length) {
    const processor = await AutoProcessor.from_pretrained(MODEL_ID);
    const visionModel = await CLIPVisionModelWithProjection.from_pretrained(MODEL_ID, { dtype: DTYPE });

    for (const { label, files } of photoFolders) {
      let ok = 0;
      for (const file of files) {
        try {
          const image = await RawImage.read(file);
          const { image_embeds } = await visionModel(await processor(image));
          photos.push({ label: labels.indexOf(label), embedding: round(normalize(Array.from(image_embeds.data))) });
          ok += 1;
        } catch (err) {
          console.warn(`  Skipped ${path.relative(ROOT, file)}: ${err.message}`);
        }
      }
      console.log(`Photos: ${label} — ${ok}`);
    }
  } else {
    console.log('Photos: none (add some to training-photos/<food>/ to improve accuracy)');
  }

  await fs.mkdir(path.dirname(OUT_FILE), { recursive: true });
  await fs.writeFile(OUT_FILE, JSON.stringify({ model: MODEL_ID, dtype: DTYPE, labels, text, photos }));
  const kb = Math.round((await fs.stat(OUT_FILE)).size / 1024);
  console.log(`Wrote ${path.relative(ROOT, OUT_FILE)} (${kb} KB)`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
