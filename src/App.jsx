import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  CalendarCheck,
  Heart,
  User,
  Settings,
  Users,
  Wrench,
  Quote,
  FileText,
  MessageSquare,
} from 'lucide-react';

import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import ScrollToTop from './components/layout/ScrollToTop';
import Loading from './components/ui/Loading';
import { mockCustomer } from './data/dashboard';

// Pages are lazy-loaded so each one is downloaded only when visited (faster first load).
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const DesignStyles = lazy(() => import('./pages/DesignStyles'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetails = lazy(() => import('./pages/BlogDetails'));
const Contact = lazy(() => import('./pages/Contact'));
const BookConsultation = lazy(() => import('./pages/BookConsultation'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const NotFound = lazy(() => import('./pages/NotFound'));

const CustomerDashboard = lazy(() => import('./pages/dashboard/CustomerDashboard'));
const MyConsultations = lazy(() => import('./pages/dashboard/MyConsultations'));
const MyProjects = lazy(() => import('./pages/dashboard/MyProjects'));
const SavedProjects = lazy(() => import('./pages/dashboard/SavedProjects'));
const Profile = lazy(() => import('./pages/dashboard/Profile'));
const AccountSettings = lazy(() => import('./pages/dashboard/AccountSettings'));

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminProjects = lazy(() => import('./pages/admin/AdminProjects'));
const AdminServices = lazy(() => import('./pages/admin/AdminServices'));
const AdminConsultations = lazy(() => import('./pages/admin/AdminConsultations'));

const customerMenu = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard, end: true },
  { label: 'My Projects', to: '/dashboard/projects', icon: FolderKanban },
  { label: 'My Consultations', to: '/dashboard/consultations', icon: CalendarCheck },
  { label: 'Saved Projects', to: '/dashboard/saved', icon: Heart },
  { label: 'Profile', to: '/dashboard/profile', icon: User },
  { label: 'Settings', to: '/dashboard/settings', icon: Settings },
];

// Items marked `soon` are visible in the menu but planned for a later phase.
const adminMenu = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Users', icon: Users, soon: true },
  { label: 'Projects', to: '/admin/projects', icon: FolderKanban },
  { label: 'Services', to: '/admin/services', icon: Wrench },
  { label: 'Testimonials', icon: Quote, soon: true },
  { label: 'Consultations', to: '/admin/consultations', icon: CalendarCheck },
  { label: 'Blog', icon: FileText, soon: true },
  { label: 'Messages', icon: MessageSquare, soon: true },
  { label: 'Settings', icon: Settings, soon: true },
];

const mockAdmin = { name: 'Studio Admin', email: 'admin@casacraftinteriors.com', role: 'admin' };

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense
        fallback={
          <div className="min-h-screen bg-ivory pt-32">
            <Loading />
          </div>
        }
      >
        <Routes>
          {/* Public website */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:id" element={<ProjectDetails />} />
            <Route path="/design-styles" element={<DesignStyles />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/consultation" element={<BookConsultation />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Auth screens (full-screen, no navbar) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Customer dashboard */}
          <Route path="/dashboard" element={<DashboardLayout items={customerMenu} variant="customer" fallbackUser={mockCustomer} />}>
            <Route index element={<CustomerDashboard />} />
            <Route path="projects" element={<MyProjects />} />
            <Route path="consultations" element={<MyConsultations />} />
            <Route path="saved" element={<SavedProjects />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<AccountSettings />} />
          </Route>

          {/* Admin panel */}
          <Route path="/admin" element={<DashboardLayout items={adminMenu} variant="admin" fallbackUser={mockAdmin} />}>
            <Route index element={<AdminDashboard />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="consultations" element={<AdminConsultations />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
