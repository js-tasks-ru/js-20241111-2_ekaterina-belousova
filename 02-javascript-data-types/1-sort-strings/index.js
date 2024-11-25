/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  if (!['asc', 'desc'].includes(param)) {
    throw new Error("Invalid parameter: param should be 'asc' or 'desc'");
  }

  return [...arr].sort((a, b) => {
    if (a.toLowerCase() === b.toLowerCase()) {
      if (a[0] === a[0].toUpperCase() && b[0] === b[0].toLowerCase()) {
        return -1;
      }
      if (b[0] === b[0].toLowerCase() && b[0] === b[0].toUpperCase()) {
        return 1;
      }
    }

    // Если оба имеют одинаковый регистр, сортируем по локали
    const comparison = a.localeCompare(b, ['ru', 'en'], { sensitivity: 'variant' });
    return param === 'asc' ? comparison : -comparison;
  });
}
