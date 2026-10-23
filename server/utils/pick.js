/**
 * Returns only the allowed keys of an object.
 * Used so a request can never set fields it should not (e.g. "role").
 */
module.exports = (obj, keys) =>
  keys.reduce((out, key) => {
    if (obj && Object.prototype.hasOwnProperty.call(obj, key) && obj[key] !== undefined) out[key] = obj[key];
    return out;
  }, {});
