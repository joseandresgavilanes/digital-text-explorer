export function loadConfig() {
  let config = window.searchConfig;
  const configElement = document.getElementById('search-config');

  if ((!config || Object.keys(config).length === 0) && configElement) {
    try {
      config = JSON.parse(configElement.textContent || '{}');
      window.searchConfig = config;
    } catch {
      config = {};
    }
  }

  return config || {};
}
