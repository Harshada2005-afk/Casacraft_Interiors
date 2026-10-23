import EmptyState from './EmptyState';

/**
 * Responsive data table.
 * columns = [{ key, header, render?(row), className? }]
 * On small screens each row turns into a stacked card for readability.
 */
export default function Table({ columns, data, rowKey = 'id', emptyTitle = 'No records found', emptyText, caption }) {
  if (!data?.length) return <EmptyState title={emptyTitle} text={emptyText} />;

  const cell = (col, row) => (col.render ? col.render(row) : row[col.key]);

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-soft">
      {/* Desktop / tablet table */}
      <div className="scrollbar-thin hidden overflow-x-auto md:block">
        <table className="w-full min-w-[640px] text-left text-sm">
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead className="border-b border-beige bg-cream/60">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={`px-6 py-4 text-xs font-medium uppercase tracking-wider text-stone ${col.className || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-beige/70">
            {data.map((row) => (
              <tr key={row[rowKey]} className="transition-colors hover:bg-ivory">
                {columns.map((col) => (
                  <td key={col.key} className={`px-6 py-4 align-middle text-charcoal-light ${col.className || ''}`}>
                    {cell(col, row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <ul className="divide-y divide-beige md:hidden">
        {data.map((row) => (
          <li key={row[rowKey]} className="space-y-3 p-5">
            {columns.map((col) => (
              <div key={col.key} className="flex items-start justify-between gap-4 text-sm">
                <span className="shrink-0 text-xs font-medium uppercase tracking-wider text-stone">{col.header}</span>
                <span className="text-right text-charcoal-light">{cell(col, row)}</span>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
