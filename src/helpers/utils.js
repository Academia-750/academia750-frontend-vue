/**
 * Delete undefined keys of the object
 * @param {object} object
 * @returns object
 */
export const deleteUndefined = (obj) => {
  return Object.keys(obj)
    .filter((key) => obj[key] === undefined)
    .forEach((key) => delete obj[key])
}
