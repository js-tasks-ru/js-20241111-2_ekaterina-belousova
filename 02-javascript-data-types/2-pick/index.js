/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */

const fruits = {
  apple: 2,
  orange: 4,
  banana: 3
};

export const pick = (obj, ...fields) => {
  const object = Object.entries(obj);
  let newArray = [];
  let newObj;
  object.forEach((obj, index) => {
    if (fields.includes(obj[0])) {
      newArray.push(obj);
    }
  });
  newObj = Object.fromEntries(newArray);
  return newObj;
};

pick(fruits, 'apple', 'banana');
