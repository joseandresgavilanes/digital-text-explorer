import { pruneDiacritics } from './utils.js';

const DEFAULT_LUNR_FIELDS = [
  'Slug',
  'Title',
  'Town',
  'Language',
  'Transcription',
  'Translation',
  'Archive',
  'Document_Type',
  'Year',
];

/** Converts an API document into the field names expected by Lunr. */
function toSearchDocument(document) {
  return {
    Slug: document.slug,
    Color: document.color,
    Title: pruneDiacritics(document.title),
    Language: pruneDiacritics(document.language),
    Town: pruneDiacritics(document.town_short),
    Document_Type: pruneDiacritics(document.document_type),
    Transcription: pruneDiacritics(document.transcription),
    Translation: pruneDiacritics(document.translation),
    Archive: pruneDiacritics(document.archive),
    Collection: pruneDiacritics(document.collection),
    Date: pruneDiacritics(document.date),
    Year: document.year || '',
  };
}

/** Builds the Lunr index and its corresponding API-document lookup. */
export function buildIndex(data, config) {
  const resultsLookupMap = data.reduce((lookup, document) => {
    lookup[document.slug] = document;
    return lookup;
  }, {});

  const idx = lunr(function () {
    const refField = config.refField || 'Slug';
    this.ref(refField);

    const fields = config.lunrFields || DEFAULT_LUNR_FIELDS;
    fields.forEach((field) => this.field(field));

    this.pipeline.remove(lunr.stemmer);
    this.searchPipeline.remove(lunr.stemmer);
    this.pipeline.remove(lunr.stopWordFilter);
    this.searchPipeline.remove(lunr.stopWordFilter);

    data.forEach((document) => this.add(toSearchDocument(document)));
  });

  return { idx, resultsLookupMap };
}
