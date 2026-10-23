/** Labelled text input with error message and optional leading icon. */
export default function FormInput({ label, name, error, icon: Icon, required, className = '', hint, ...props }) {
  const id = props.id || name;
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="label">
          {label} {required && <span className="text-gold-dark">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone" aria-hidden="true" />}
        <input
          id={id}
          name={name}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`field ${Icon ? 'pl-11' : ''} ${error ? 'field-error' : ''}`}
          {...props}
        />
      </div>
      {hint && !error && <p className="mt-1.5 text-xs text-stone">{hint}</p>}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
