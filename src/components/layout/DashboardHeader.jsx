/** Page heading used inside dashboard pages. */
export default function DashboardHeader({ title, subtitle, actions }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-4xl sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-2 text-stone">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
    </div>
  );
}
