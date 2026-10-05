import { pruneDiacritics, toQueryString } from './utils.js';
import { loadConfig } from './config.js';

function getFacetProperty(config, facetKey) {
  return (
    config.facetKeyToProperty?.[facetKey] ||
    facetKey.toLowerCase().replaceAll(' ', '_')
  );
}

function hasValue(value) {
  if (
    value === null ||
    value === undefined ||
    value === false ||
    value === 0 ||
    value === '0' ||
    value === 'false'
  ) {
    return false;
  }

  return Array.isArray(value)
    ? value.length > 0
    : String(value).trim().length > 0;
}

function matchesYearFacet(selectedValue, year) {
  if (!selectedValue.includes('*')) {
    return selectedValue === year;
  }

  return new RegExp(`^${selectedValue.replaceAll('*', '\\d')}$`).test(year);
}

/** Runs the full-text query and applies the active facets and ranges. */
export function submitSearchQuery(idx, resultsLookupMap, state) {
  const config = loadConfig();
  let query = '* *';

  if (state.searchInput && state.searchInput.value) {
    const input = pruneDiacritics(state.searchInput.value);
    const tokens = input.split(' ').filter(Boolean);

    if (
      state.selectedSearchField &&
      state.selectedSearchField !== (config.defaultSearchField || 'All Fields')
    ) {
      const fieldName =
        config.lunrFieldMap?.[state.selectedSearchField] ||
        state.selectedSearchField;
      query = tokens
        .map(
          (token) =>
            `${fieldName}:${token}^100 +${fieldName}:${token}*^10 ${fieldName}:${token}~2`,
        )
        .join(' ');
    } else {
      query = toQueryString(tokens);
    }
  }

  const facetDefinitions = config.facets || [];
  const activeFacets = Object.entries(state.selectedFacets).filter(
    ([, values]) => values.length > 0,
  );
  const activeRanges = Object.entries(state.selectedRanges).filter(
    ([, range]) => range.min !== '' || range.max !== '',
  );

  return idx.search(query).filter((result) => {
    const item = resultsLookupMap[result.ref];
    if (!item) {
      return false;
    }

    const facetMatch = activeFacets.every(([facetKey, selectedValues]) => {
      const facetDefinition = facetDefinitions.find(
        (facet) => facet.key === facetKey,
      );
      if (facetDefinition?.type === 'booleanlist') {
        return selectedValues.every((selectedValue) =>
          hasValue(item[selectedValue]),
        );
      }

      const propertyName = getFacetProperty(config, facetKey);
      const itemValue = pruneDiacritics(item[propertyName]);
      if (!itemValue) {
        return false;
      }

      if (propertyName === 'year') {
        return selectedValues.some((selectedValue) =>
          matchesYearFacet(selectedValue, itemValue),
        );
      }

      return selectedValues.includes(itemValue);
    });

    const rangeMatch = activeRanges.every(([facetKey, range]) => {
      const propertyName = getFacetProperty(config, facetKey);
      if (propertyName !== 'year') {
        return true;
      }

      const itemYear = Number(item[propertyName]);
      if (Number.isNaN(itemYear)) {
        return false;
      }

      const minimum = range.min !== '' ? Number(range.min) : -Infinity;
      const maximum = range.max !== '' ? Number(range.max) : Infinity;
      return itemYear >= minimum && itemYear <= maximum;
    });

    return facetMatch && rangeMatch;
  });
}

/** Wires the search UI, including facets, query state, and URL synchronization. */
export async function initUI({ idx, resultsLookupMap, documents }) {
  const config = loadConfig();
  const resultsContainer = document.getElementById('results');
  const resultsInfo = document.getElementById('results-info');
  const activeFacetsContainer = document.getElementById('active-facets');
  const searchInput = document.getElementById('search-input');
  const searchLimitSelect = document.getElementById('search-limit-select');
  const searchSubmit = document.getElementById('search-submit');
  const facetPanels = document.getElementById('facet-panels');
  const apiBase = `${window.prefixUrl}api/`;

  if (
    !resultsContainer ||
    !resultsInfo ||
    !activeFacetsContainer ||
    !searchInput
  ) {
    throw new Error(
      'The search page is missing one or more required UI elements.',
    );
  }

  const state = {
    selectedFacets: {},
    selectedRanges: {},
    selectedSearchField: config.defaultSearchField || 'All Fields',
    searchInput,
  };

  const isNonEmpty = (value) =>
    value !== undefined && value !== null && String(value).trim() !== '';
  const uniqueOrdered = (values) => [...new Set(values.filter(isNonEmpty))];

  const facetValues = {
    Language: ['Zapotec', 'Spanish', 'Spanish with some Zapotec'],
    'Document Type': [],
    Archive: [],
  };

  const yearNumbers = documents
    .map((doc) => Number(doc.year))
    .filter((value) => !Number.isNaN(value));
  const yearRange = yearNumbers.length
    ? { min: Math.min(...yearNumbers), max: Math.max(...yearNumbers) }
    : { min: '', max: '' };

  async function loadApiFacetValues() {
    const loadFacetValues = (filename) =>
      fetch(`${apiBase}${filename}`)
        .then((response) => (response.ok ? response.json() : []))
        .catch(() => []);

    const [archives, documentTypes] = await Promise.all([
      loadFacetValues('archives.json'),
      loadFacetValues('document_types.json'),
    ]);

    facetValues.Archive = uniqueOrdered(archives);
    facetValues['Document Type'] = uniqueOrdered(documentTypes);
  }

  function createCheckboxOption(facetKey, value) {
    const listItem = document.createElement('li');
    const label = document.createElement('label');
    label.className =
      'flex items-center cursor-pointer rounded px-2 py-1 transition-colors';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.dataset.facet = facetKey;
    input.dataset.value = value;
    input.className =
      'w-4 h-4 rounded accent-accent-alt-dark border-text-light text-accent-light focus:ring-text-light focus:ring cursor-pointer';

    const text = document.createElement('span');
    text.className = 'ml-2 text-text-dark hover:text-accent-light';
    text.textContent = value;

    label.appendChild(input);
    label.appendChild(text);
    listItem.appendChild(label);
    return listItem;
  }

  function createRangeInputs(facetKey, min, max) {
    const wrapper = document.createElement('div');
    wrapper.className =
      'pl-2 flex flex-row w-full gap-2 items-center justify-start';

    const minInput = document.createElement('input');
    minInput.type = 'number';
    minInput.dataset.facet = facetKey;
    minInput.dataset.range = 'min';
    minInput.placeholder = min;
    minInput.min = min;
    minInput.max = max;
    minInput.className =
      'border rounded-md px-2 focus-visible:ring focus-visible:ring-text-light max-w-24';

    const maxInput = document.createElement('input');
    maxInput.type = 'number';
    maxInput.dataset.facet = facetKey;
    maxInput.dataset.range = 'max';
    maxInput.placeholder = max;
    maxInput.min = min;
    maxInput.max = max;
    maxInput.className =
      'border rounded-md px-2 focus:ring focus:ring-text-light max-w-24';

    const separator = document.createElement('span');
    separator.className = 'text-center';
    separator.textContent = '—';

    wrapper.append(minInput, separator, maxInput);
    return wrapper;
  }

  function renderFacetPanels() {
    if (!facetPanels) {
      return;
    }

    facetPanels.replaceChildren();

    (config.facets || []).forEach((facet) => {
      const listItem = document.createElement('li');
      listItem.className =
        'p-4 bg-[#f8f4ea] shadow rounded-md tracking-tight mb-6';

      const heading = document.createElement('div');
      heading.className = `text-xl font-bold my-3 px-2 ${facet.wip ? 'text-accent-light' : ''}`;
      heading.textContent = facet.key;
      listItem.appendChild(heading);

      if (facet.type === 'multiselect') {
        const values = facetValues[facet.key] || [];
        const valuesList = document.createElement('ul');
        values.forEach((value) =>
          valuesList.appendChild(createCheckboxOption(facet.key, value)),
        );
        listItem.appendChild(valuesList);
      }

      if (facet.type === 'booleanlist') {
        const valuesList = document.createElement('ul');
        facet.list.forEach((value) => {
          const checkboxOption = createCheckboxOption(facet.key, value.key);
          checkboxOption.querySelector('span').textContent = value.label;
          valuesList.appendChild(checkboxOption);
        });
        listItem.appendChild(valuesList);
      }

      if (facet.type === 'numrange') {
        listItem.appendChild(
          createRangeInputs(facet.key, yearRange.min, yearRange.max),
        );
      }

      facetPanels.appendChild(listItem);
    });
  }

  function createEmptyState() {
    const message = document.createElement('p');
    message.className = 'col-span-full max-w-[60ch] text-text-light';
    message.append(
      'No documents match this search. Try a shorter word, remove one of the filters above, or ',
    );

    const resetLink = document.createElement('a');
    resetLink.className = 'text-accent-light hover:text-accent-dark underline';
    resetLink.href = `${window.prefixUrl}explore/documents`;
    resetLink.textContent = 'start again with the whole collection';
    message.append(resetLink, '.');

    return message;
  }

  function createResultTitle(item) {
    const title = document.createElement('h2');
    title.className =
      'text-text-dark title-font text-lg font-bold leading-tight';

    if (item.title.startsWith('Translation')) {
      const [firstWord, ...rest] = item.title.split(' ');
      const prefix = document.createElement('span');
      prefix.className = 'underline group-hover:text-accent-light';
      prefix.textContent = firstWord;
      title.append(prefix, ` ${rest.join(' ')}`);
    } else if (item.digital_edition) {
      const prefix = document.createElement('span');
      prefix.className = 'underline group-hover:text-accent-light';
      prefix.textContent = 'Digital Edition';
      title.append(prefix, ` ${item.title}`);
    } else {
      title.textContent = item.title;
    }

    return title;
  }

  function createSearchResult(item) {
    const result = document.createElement('div');
    result.className =
      'w-full group transition duration-350 ease-in-out hover:scale-110';

    const link = document.createElement('a');
    link.href = `${window.prefixUrl}document/${item.slug}.html`;

    const thumbnail = document.createElement('div');
    thumbnail.className =
      'relative h-36 w-full rounded-tl-[3rem] rounded-br-[3rem] overflow-hidden bg-cover bg-center';
    thumbnail.style.backgroundImage = `url('${window.prefixUrl}static/thumbnails/${item.slug}.jpg')`;

    const languageBadge = document.createElement('div');
    languageBadge.className = item.language?.startsWith('Zapotec')
      ? 'absolute top-0 right-0 bg-red-950 text-[#f7efdc] text-lg font-bold px-2 py-1 rounded-bl-lg z-10'
      : 'absolute top-0 right-0 bg-accent-dark text-[#f7efdc] text-lg font-bold px-2 py-1 rounded-bl-lg z-10';
    languageBadge.textContent = item.language?.startsWith('Zapotec')
      ? 'Zapotec'
      : 'Spanish';
    thumbnail.appendChild(languageBadge);

    if (item.digital_edition) {
      const editionBadge = document.createElement('div');
      editionBadge.className =
        'absolute bottom-0 left-0 bg-[url(../static/flower.png)] bg-cover bg-center h-10 w-10 px-2 py-1 rounded-tr-lg z-10';
      thumbnail.appendChild(editionBadge);
    }

    const overlay = document.createElement('div');
    overlay.className =
      'absolute top-0 left-0 w-full h-full block transition-opacity saturate-50 opacity-80 duration-350 ease-in-out group-hover:opacity-0';
    overlay.style.backgroundColor = `#${item.color}`;
    thumbnail.appendChild(overlay);

    const details = document.createElement('div');
    details.className = 'mt-4';
    details.appendChild(createResultTitle(item));
    link.append(thumbnail, details);
    result.appendChild(link);

    return result;
  }

  function appendSearchResults(results) {
    resultsContainer.replaceChildren();

    if (results.length === 0) {
      resultsContainer.appendChild(createEmptyState());
      return;
    }

    results.forEach((result) => {
      resultsContainer.appendChild(
        createSearchResult(resultsLookupMap[result.ref]),
      );
    });
  }

  function appendSearchInfo(resultsLength, fullIndexLength) {
    resultsInfo.replaceChildren();
    const noun = fullIndexLength === 1 ? 'document' : 'documents';
    const infoDiv = document.createElement('div');
    infoDiv.textContent =
      resultsLength === fullIndexLength
        ? `Showing all ${fullIndexLength} ${noun}`
        : `Showing ${resultsLength} of ${fullIndexLength} ${noun}`;
    resultsInfo.appendChild(infoDiv);
  }

  function createRemovableTag(label, onRemove) {
    const tag = document.createElement('div');
    tag.className =
      'inline-flex items-center gap-2 rounded-full bg-accent-alt-light px-3 py-1 text-xs text-accent-alt-dark hover:shadow';

    const button = document.createElement('button');
    button.className = 'cursor-pointer hover:text-accent-light';
    button.type = 'button';

    const text = document.createElement('span');
    text.className = 'font-mono';
    text.textContent = label;

    const close = document.createElement('span');
    close.className = 'ml-1 font-bold';
    close.textContent = ' × ';

    button.append(text, close);
    button.addEventListener('click', onRemove);
    tag.appendChild(button);
    return tag;
  }

  function renderActiveFacets() {
    activeFacetsContainer.replaceChildren();

    if (searchInput.value) {
      const queryTag = createRemovableTag(
        `Search (${state.selectedSearchField}): ${searchInput.value}`,
        (event) => {
          event.preventDefault();
          searchInput.value = '';
          handleSearchBehavior();
        },
      );
      activeFacetsContainer.appendChild(queryTag);
    }

    const getFacetLabel = (facetKey, valueKey) => {
      const facetDef = (config.facets || []).find(
        (facet) => facet.key === facetKey,
      );
      if (!facetDef || facetDef.type !== 'booleanlist') return valueKey;
      const listItem = facetDef.list.find((item) => item.key === valueKey);
      return listItem?.label || valueKey;
    };

    Object.entries(state.selectedFacets).forEach(([facetKey, values]) => {
      values.forEach((value) => {
        const displayValue = getFacetLabel(facetKey, value);
        const tag = createRemovableTag(
          `${facetKey}: ${displayValue}`,
          (event) => {
            event.preventDefault();
            state.selectedFacets[facetKey] = state.selectedFacets[
              facetKey
            ].filter((selectedValue) => selectedValue !== value);

            const checkboxes = document.querySelectorAll(
              'input[type="checkbox"][data-facet][data-value]',
            );
            checkboxes.forEach((checkbox) => {
              if (
                checkbox.dataset.facet === facetKey &&
                pruneDiacritics(checkbox.dataset.value) === value
              ) {
                checkbox.checked = false;
              }
            });

            handleSearchBehavior();
          },
        );

        activeFacetsContainer.appendChild(tag);
      });
    });

    Object.entries(state.selectedRanges).forEach(([facetKey, range]) => {
      if (!range.min && !range.max) {
        return;
      }

      const rangeValue =
        range.min && range.max
          ? `${range.min}–${range.max}`
          : range.min
            ? `≥${range.min}`
            : `≤${range.max}`;
      const tag = createRemovableTag(`${facetKey}: ${rangeValue}`, (event) => {
        event.preventDefault();
        state.selectedRanges[facetKey] = { min: '', max: '' };

        document
          .querySelectorAll('input[data-facet][data-range]')
          .forEach((input) => {
            if (input.dataset.facet === facetKey) {
              input.value = '';
            }
          });

        handleSearchBehavior();
      });

      activeFacetsContainer.appendChild(tag);
    });
  }

  function updateUrlParams() {
    const newUrlParams = new URLSearchParams();
    if (searchInput.value) newUrlParams.set('query', searchInput.value);

    const booleanlistFacetKeys = new Set(
      (config.facets || [])
        .filter((facet) => facet.type === 'booleanlist')
        .map((facet) => facet.key),
    );

    Object.entries(state.selectedFacets).forEach(([facetKey, values]) => {
      if (!values.length) return;

      if (booleanlistFacetKeys.has(facetKey)) {
        values.forEach((value) => newUrlParams.set(value, 'true'));
        return;
      }

      newUrlParams.set(facetKey, values.join('|'));
    });

    Object.entries(state.selectedRanges).forEach(([facetKey, range]) => {
      if (range.min)
        newUrlParams.set(`${facetKey.toLowerCase()}-min`, range.min);
      if (range.max)
        newUrlParams.set(`${facetKey.toLowerCase()}-max`, range.max);
    });

    const queryString = newUrlParams.toString();
    const newUrl = queryString
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  }

  function inferUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('query')) {
      searchInput.value = urlParams.get('query');
    }

    const booleanlistValueMap = (config.facets || [])
      .filter((facet) => facet.type === 'booleanlist')
      .reduce((map, facet) => {
        facet.list.forEach((item) => {
          map[item.key] = facet.key;
        });
        return map;
      }, {});

    urlParams.forEach((value, key) => {
      if (key === 'query') return;

      const normalizedKey = key.toLowerCase();
      if (normalizedKey.endsWith('-min') || normalizedKey.endsWith('-max')) {
        const facetKey = key.slice(0, key.lastIndexOf('-'));
        const normalizedFacetKey =
          facetKey.charAt(0).toUpperCase() + facetKey.slice(1);
        const bound = normalizedKey.endsWith('-min') ? 'min' : 'max';

        if (!state.selectedRanges[normalizedFacetKey]) {
          state.selectedRanges[normalizedFacetKey] = { min: '', max: '' };
        }
        state.selectedRanges[normalizedFacetKey][bound] = value;
        return;
      }

      if (booleanlistValueMap[key]) {
        const facetKey = booleanlistValueMap[key];
        const featureValue = key;
        if (value === 'true' || value === '') {
          if (!state.selectedFacets[facetKey]) {
            state.selectedFacets[facetKey] = [];
          }
          state.selectedFacets[facetKey].push(featureValue);
        }
        return;
      }

      state.selectedFacets[key] = pruneDiacritics(value).split('|');
    });
  }

  function handleSearchBehavior() {
    const results = submitSearchQuery(idx, resultsLookupMap, state);
    appendSearchInfo(results.length, Object.keys(resultsLookupMap).length);
    renderActiveFacets();
    appendSearchResults(results);
    updateUrlParams();
  }

  function setupFacetCheckboxes() {
    const checkboxes = document.querySelectorAll(
      'input[type="checkbox"][data-facet][data-value]',
    );
    checkboxes.forEach((checkbox) => {
      const facetKey = checkbox.getAttribute('data-facet');
      const facetValue = checkbox.getAttribute('data-value');
      const prunedFacetValue = pruneDiacritics(facetValue);

      if (state.selectedFacets[facetKey]?.includes(prunedFacetValue)) {
        checkbox.checked = true;
      }

      checkbox.addEventListener('change', () => {
        if (!state.selectedFacets[facetKey]) {
          state.selectedFacets[facetKey] = [];
        }

        if (checkbox.checked) {
          if (!state.selectedFacets[facetKey].includes(prunedFacetValue)) {
            state.selectedFacets[facetKey].push(prunedFacetValue);
          }
        } else {
          state.selectedFacets[facetKey] = state.selectedFacets[
            facetKey
          ].filter((value) => value !== prunedFacetValue);
        }
        handleSearchBehavior();
      });
    });
  }

  function setupFacetRangeInputs() {
    const rangeInputs = document.querySelectorAll(
      'input[type="number"][data-facet][data-range]',
    );
    rangeInputs.forEach((input) => {
      const facetKey = input.getAttribute('data-facet');
      const rangeType = input.getAttribute('data-range');

      if (!state.selectedRanges[facetKey]) {
        state.selectedRanges[facetKey] = { min: '', max: '' };
      }

      const currentValue =
        state.selectedRanges[facetKey][rangeType] || input.value;
      input.value = currentValue;
      state.selectedRanges[facetKey][rangeType] = currentValue;

      input.addEventListener('change', () => {
        state.selectedRanges[facetKey][rangeType] = input.value;
        handleSearchBehavior();
      });
    });
  }

  await loadApiFacetValues();
  renderFacetPanels();
  inferUrlParams();
  setupFacetCheckboxes();
  setupFacetRangeInputs();
  handleSearchBehavior();

  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearchBehavior();
    }
  });

  searchSubmit?.addEventListener('click', handleSearchBehavior);
  searchInput.addEventListener('input', handleSearchBehavior);
  searchLimitSelect?.addEventListener('change', () => {
    state.selectedSearchField = searchLimitSelect.value;
    handleSearchBehavior();
  });

  return {
    getState: () => state,
    refresh: handleSearchBehavior,
  };
}
