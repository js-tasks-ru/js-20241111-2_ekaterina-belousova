/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */

export function createGetter(path) {
  const objPath = path.split('.');
  return function (obj) {
    return objPath.reduce((current, key) => {
      if (current && current.hasOwnProperty(key)) {
        return current[key];
      }
      return undefined;
    }, obj);
  };
}

