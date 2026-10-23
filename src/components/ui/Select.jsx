import { ChevronDown } from 'lucide-react';

/** Labelled native <select> (accessible and mobile friendly by default). */
export default function Select({ label, name, options = [], placeholder, error, required, className = '', ...props }) {
  const id = props.id || name;
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="label">
          {label} {required && <span className="text-gold-dark">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          name={name}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`field appearance-none pr-10 ${error ? 'field-error' : ''}`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => {
            const value = typeof opt === 'string' ? opt : opt.value;
            const text = typeof opt === 'string' ? opt : opt.label;
            return (
              <option key={value} value={value}>
                {text}
              </option>
            );
          })}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone" aria-hidden="true" />
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
