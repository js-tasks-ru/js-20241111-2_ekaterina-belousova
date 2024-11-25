/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */

export const omit = (obj, ...fields) => {
  const object = Object.entries(obj);
  let newArray = [];
  let newObj;

  object.forEach((obj, index) => {
    if (!fields.includes(obj[0])) {
      newArray.push(obj);
    }
  });
  newObj = Object.fromEntries(newArray);
  return newObj;
};

