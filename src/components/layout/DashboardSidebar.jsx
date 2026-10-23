import { NavLink } from 'react-router-dom';
import { LogOut, X } from 'lucide-react';
import Logo from '../ui/Logo';

/**
 * Sidebar shared by the customer and admin dashboards.
 * items = [{ label, to, icon, end?, soon? }]
 * Items marked `soon` are shown but disabled (planned for a later phase).
 */
export default function DashboardSidebar({ items, open, onClose, onLogout, variant = 'customer', user }) {
  const isAdmin = variant === 'admin';
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-charcoal/50 backdrop-blur-sm transition-opacity lg:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-charcoal text-white/70 transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label={isAdmin ? 'Admin navigation' : 'Dashboard navigation'}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <Logo light to={isAdmin ? '/admin' : '/'} subtitle={isAdmin ? 'Admin Studio' : 'Interiors'} />
          <button onClick={onClose} className="rounded-full p-2 hover:bg-white/10 lg:hidden" aria-label="Close sidebar">
            <X className="h-5 w-5" />
          </button>
        </div>

        {user && (
          <div className="mx-4 mb-4 flex items-center gap-3 rounded-2xl bg-white/5 p-3">
            {user.avatar ? (
              <img src={user.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
            ) : (
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold font-medium text-white">
                {user.name?.[0]}
              </span>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">{user.name}</p>
              <p className="truncate text-xs text-white/50">{isAdmin ? 'Administrator' : 'Client account'}</p>
            </div>
          </div>
        )}

        <nav className="scrollbar-thin flex-1 overflow-y-auto px-4">
          <ul className="space-y-1">
            {items.map(({ label, to, icon: Icon, end, soon }) => (
              <li key={label}>
                {soon ? (
                  <span
                    className="flex cursor-not-allowed items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/35"
                    title="Coming in a future phase"
                  >
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    {label}
                    <span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider">Soon</span>
                  </span>
                ) : (
                  <NavLink
                    to={to}
                    end={end}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all duration-200 ${
                        isActive ? 'bg-gold text-white shadow-lift' : 'hover:bg-white/5 hover:text-white'
                      }`
                    }
                  >
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    {label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-white/10 p-4">
          <button
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-[18px] w-[18px]" aria-hidden="true" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
