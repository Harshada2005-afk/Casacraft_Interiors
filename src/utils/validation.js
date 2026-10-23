/** Simple, reusable form validation helpers. */
export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value).trim());

// Accepts Indian and international formats: +91 98765 43210, 9876543210, etc.
export const isPhone = (value) => /^\+?[0-9\s-]{10,15}$/.test(String(value).trim());

/**
 * Validates `values` against `rules`.
 * rules = { fieldName: [ [testFn, 'Error message'], ... ] }
 * Returns an object of { fieldName: 'first failing message' }.
 */
export function validate(values, rules) {
  const errors = {};
  Object.entries(rules).forEach(([field, checks]) => {
    for (const [test, message] of checks) {
      if (!test(values[field] ?? '', values)) {
        errors[field] = message;
        break;
      }
    }
  });
  return errors;
}

export const required = (v) => String(v).trim().length > 0;
export const minLength = (n) => (v) => String(v).trim().length >= n;
