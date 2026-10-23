/** Row of colour swatches. Accepts hex strings or { name, hex } objects. */
export default function ColorPalette({ colors, showNames = true }) {
  return (
    <ul className="flex flex-wrap gap-4">
      {colors.map((c) => {
        const hex = typeof c === 'string' ? c : c.hex;
        const name = typeof c === 'string' ? null : c.name;
        return (
          <li key={hex} className="flex flex-col items-center gap-2">
            <span className="h-14 w-14 rounded-2xl shadow-soft ring-1 ring-black/5" style={{ backgroundColor: hex }} aria-hidden="true" />
            {showNames && (
              <span className="text-center text-xs leading-tight text-stone">
                {name && <span className="block font-medium text-charcoal-light">{name}</span>}
                {hex}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
