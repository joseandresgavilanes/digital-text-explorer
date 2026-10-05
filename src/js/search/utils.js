const SEARCH_PUNCTUATION = /[.,()]/g;
const DIACRITIC_MARKS = /[\u0300-\u036f]/g;

/** Normalizes text so accented and punctuated values remain searchable. */
export function pruneDiacritics(value) {
  if (value === null || value === undefined) {
    return '';
  }

  return String(value)
    .normalize('NFD')
    .replace(DIACRITIC_MARKS, '')
    .replace(SEARCH_PUNCTUATION, '');
}

/** Builds the weighted Lunr query used for an all-fields search. */
export function toQueryString(tokens) {
  return tokens
    .map((token) => `${token}^100 +${token}*^10 ${token}~2`)
    .join(' ');
}
