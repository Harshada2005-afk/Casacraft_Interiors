/**
 * ------------------------------------------------------------------
 *  Mock API layer (Phase 1)
 * ------------------------------------------------------------------
 * Every page gets its data through these functions instead of importing
 * mock files directly. Each function returns a Promise, exactly like a
 * real HTTP call would, so in Phase 2 you only need to replace the body
 * of each function with a `fetch()`/axios call – the pages stay the same.
 *
 * Example (Phase 2):
 *   export const getProjects = () => request('/projects');
 */
import { projects, getProjectById, getRelatedProjects } from '../data/projects';
import { services } from '../data/services';
import { testimonials } from '../data/testimonials';
import { blogPosts, getPostById } from '../data/blog';
import { designStyles } from '../data/designStyles';
import { myConsultations, allConsultations } from '../data/consultations';
import { mockCustomer, myProjects } from '../data/dashboard';

// Simulates network latency so loading states can be seen and tested.
const delay = (data, ms = 350) => new Promise((resolve) => setTimeout(() => resolve(structuredClone(data)), ms));

// Phase 2 helper – not used yet.
// const BASE_URL = import.meta.env.VITE_API_URL;
// async function request(path, options = {}) {
//   const res = await fetch(`${BASE_URL}${path}`, {
//     headers: { 'Content-Type': 'application/json' },
//     ...options,
//   });
//   if (!res.ok) throw new Error(`Request failed: ${res.status}`);
//   return res.json();
// }

/* ---------- Public content ---------- */
export const getProjects = () => delay(projects);
export const getProject = (id) => {
  const project = getProjectById(id);
  return delay(project ? { project, related: getRelatedProjects(project) } : null);
};
export const getServices = () => delay(services);
export const getTestimonials = () => delay(testimonials);
export const getBlogPosts = () => delay(blogPosts);
export const getBlogPost = (id) => delay(getPostById(id) || null);
export const getDesignStyles = () => delay(designStyles);

/* ---------- Forms (no data leaves the browser) ---------- */
export const submitContactForm = (payload) => delay({ success: true, payload }, 900);
export const submitConsultation = (payload) => delay({ success: true, id: `CN-${Math.floor(1000 + Math.random() * 9000)}`, payload }, 1000);
export const subscribeNewsletter = (email) => delay({ success: true, email }, 600);

/* ---------- Auth (mock – accepts any valid-looking credentials) ---------- */
export const login = ({ email }) => delay({ user: { ...mockCustomer, email }, token: 'mock-token' }, 800);
export const register = ({ fullName, email, phone }) =>
  delay({ user: { ...mockCustomer, name: fullName, email, phone }, token: 'mock-token' }, 900);
export const adminLogin = ({ email }) =>
  delay({ user: { id: 'admin_1', name: 'Studio Admin', email, role: 'admin' }, token: 'mock-admin-token' }, 800);

/* ---------- Customer dashboard ---------- */
export const getMyProjects = () => delay(myProjects);
export const getMyConsultations = () => delay(myConsultations);
export const updateProfile = (profile) => delay(profile, 700);

/* ---------- Admin ---------- */
const adminStatusFor = (i) => ['In Progress', 'Completed', 'Planning', 'Completed', 'On Hold'][i % 5];
export const getAdminProjects = () =>
  delay(
    projects.map((p, i) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      location: p.location,
      style: p.style,
      image: p.image,
      status: adminStatusFor(i),
    })),
  );
export const getAdminConsultations = () => delay(allConsultations);
