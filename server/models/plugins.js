/** Shared JSON output: expose `id`, hide `__v`. */
function cleanJSON(schema) {
  schema.set('toJSON', {
    virtuals: true,
    transform: (_doc, ret) => {
      delete ret.__v;
      return ret;
    },
  });
}

module.exports = { cleanJSON };
