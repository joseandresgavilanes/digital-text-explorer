import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const DATA_DIRECTORY = 'src/_data/api';
const OUTPUT_DIRECTORY = 'static/thumbnails';
const THUMBNAIL_BASE_URL =
  'https://awy5mcn5cgxb3cxtpcyf7cp6pu0lgvmp.lambda-url.us-east-1.on.aws/iiif/3/ticha';
const CONCURRENCY = 10;

async function downloadThumbnail(url, outputPath) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
  }

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.startsWith('image/')) {
    const text = await response.text();
    throw new Error(
      `Unexpected content type ${contentType}: ${text.slice(0, 100)}`,
    );
  }

  await writeFile(outputPath, Buffer.from(await response.arrayBuffer()));
}

async function cacheThumbnail(document) {
  const outputPath = path.join(OUTPUT_DIRECTORY, `${document.slug}.jpg`);

  try {
    await access(outputPath);
    return;
  } catch {
    const thumbnailUrl = `${THUMBNAIL_BASE_URL}/${document.slug}/000/square/250,/0/default.jpg`;

    try {
      await downloadThumbnail(thumbnailUrl, outputPath);
      console.log(`Downloaded thumbnail for ${document.slug}`);
    } catch (error) {
      console.error(
        `Unable to cache thumbnail for ${document.slug}: ${error.message}`,
      );
    }
  }
}

async function main() {
  const documentData = await readFile(
    path.join(DATA_DIRECTORY, 'documents.json'),
    'utf8',
  );
  const documents = JSON.parse(documentData);
  await mkdir(OUTPUT_DIRECTORY, { recursive: true });

  for (let start = 0; start < documents.length; start += CONCURRENCY) {
    const batch = documents
      .slice(start, start + CONCURRENCY)
      .map(cacheThumbnail);
    await Promise.all(batch);
  }
}

await main();
