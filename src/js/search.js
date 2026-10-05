import { loadConfig } from './search/config.js';
import { buildIndex } from './search/indexer.js';
import { initUI } from './search/ui.js';

window.addEventListener('load', async () => {
  const config = loadConfig();
  const data = await window.promisedData;
  const { idx, resultsLookupMap } = buildIndex(data, config);

  await initUI({ idx, resultsLookupMap, documents: data });
});
