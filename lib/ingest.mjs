import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const DATA_BASE_URL =
  'https://ticha-zapotec.github.io/digital-text-explorer-data';
const TARGET_DIRECTORY = 'src/_data/api';
const DATA_FILES = [
  'documents.json',
  'archives.json',
  'towns.json',
  'document_types.json',
];

async function downloadDataFile(filename) {
  const response = await fetch(`${DATA_BASE_URL}/${filename}`);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  await writeFile(path.join(TARGET_DIRECTORY, filename), await response.text());
  console.log(`Downloaded ${filename}`);
}

async function main() {
  await mkdir(TARGET_DIRECTORY, { recursive: true });
  const downloads = await Promise.allSettled(DATA_FILES.map(downloadDataFile));
  const failures = downloads.filter(({ status }) => status === 'rejected');

  downloads.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.error(
        `Unable to download ${DATA_FILES[index]}: ${result.reason.message}`,
      );
    }
  });

  if (failures.length > 0) {
    process.exitCode = 1;
  }
}

await main();
