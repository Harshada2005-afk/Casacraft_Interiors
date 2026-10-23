import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Bell, Menu, Search } from 'lucide-react';
import DashboardSidebar from '../components/layout/DashboardSidebar';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

/**
 * Shared shell for the customer dashboard and the admin panel.
 * `variant` switches the sidebar menu and the logout destination.
 */
export default function DashboardLayout({ items, variant = 'customer', fallbackUser }) {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const isAdmin = variant === 'admin';

  // Phase 1: if nobody is "logged in" we still show the UI with mock data.
  // Phase 2: redirect to the login page instead (see README).
  const currentUser = (isAdmin ? user?.role === 'admin' && user : user?.role !== 'admin' && user) || fallbackUser;

  const handleLogout = () => {
    signOut();
    showToast('You have been logged out.', 'info');
    navigate(isAdmin ? '/admin/login' : '/login');
  };

  return (
    <div className="min-h-screen bg-cream/60">
      <DashboardSidebar
        items={items}
        open={open}
        onClose={() => setOpen(false)}
        onLogout={handleLogout}
        variant={variant}
        user={currentUser}
      />

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-beige/80 bg-ivory/85 backdrop-blur-lg">
          <div className="flex items-center gap-4 px-5 py-4 sm:px-8">
            <button
              onClick={() => setOpen(true)}
              className="rounded-full p-2 text-charcoal hover:bg-beige/60 lg:hidden"
              aria-label="Open sidebar"
              aria-expanded={open}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="relative hidden max-w-sm flex-1 md:block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone" aria-hidden="true" />
              <input
                type="search"
                placeholder={isAdmin ? 'Search projects, clients…' : 'Search your projects…'}
                className="field rounded-full py-2.5 pl-11"
                aria-label="Search"
              />
            </div>
            <div className="ml-auto flex items-center gap-3">
              <Link to="/" className="hidden text-sm text-stone transition hover:text-charcoal sm:block">
                View website
              </Link>
              <button
                className="relative rounded-full p-2.5 text-charcoal transition hover:bg-beige/60"
                aria-label="Notifications (3 unread)"
                onClick={() => showToast('You have 3 new notifications.', 'info')}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
              </button>
              {currentUser?.avatar ? (
                <img src={currentUser.avatar} alt="" className="h-10 w-10 rounded-full object-cover ring-2 ring-white" />
              ) : (
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal font-medium text-gold-light">
                  {currentUser?.name?.[0]}
                </span>
              )}
            </div>
          </div>
        </header>

        <main id="main" className="px-5 py-8 sm:px-8 lg:py-10">
          <Outlet context={{ user: currentUser }} />
        </main>
      </div>
    </div>
  );
}
