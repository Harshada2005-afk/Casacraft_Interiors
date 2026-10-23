/** Labelled textarea with error message. */
export default function Textarea({ label, name, error, required, rows = 5, className = '', ...props }) {
  const id = props.id || name;
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="label">
          {label} {required && <span className="text-gold-dark">*</span>}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`field resize-y ${error ? 'field-error' : ''}`}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
