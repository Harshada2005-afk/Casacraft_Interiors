import { useState } from 'react';
import { validate } from '../utils/validation';

/**
 * Minimal form state helper.
 *   const { values, errors, handleChange, validateForm, reset } = useForm(initialValues, rules);
 * Errors are re-checked as the user types once a field has shown an error.
 */
export default function useForm(initialValues, rules = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const next = { ...values, [name]: type === 'checkbox' ? checked : value };
    setValues(next);
    if (errors[name]) {
      const fieldErrors = validate(next, { [name]: rules[name] || [] });
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
    }
  };

  /** Returns true when the whole form is valid. Focuses the first invalid field. */
  const validateForm = () => {
    const found = validate(values, rules);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) document.querySelector(`[name="${first}"]`)?.focus();
    return !first;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return { values, errors, setValues, handleChange, validateForm, reset };
}
