export const formatDate = (iso, opts = { day: 'numeric', month: 'short', year: 'numeric' }) =>
  new Date(iso).toLocaleDateString('en-IN', opts);

export const formatNumber = (n) => new Intl.NumberFormat('en-IN').format(n);
