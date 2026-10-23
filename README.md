# CasaCraft Interiors – Website Frontend (Phase 1)

> **Beautiful Spaces. Thoughtfully Designed.**
> A premium, fully responsive interior design studio website built with React, Vite and Tailwind CSS.

This folder holds both parts of the project:

- **Frontend (Phase 1)** – this README. React site in `src/`. Out of the box it runs on mock data, so it works without a server.
- **Backend (Phase 2)** – the Express + MongoDB API in [`server/`](server/README.md). See `server/README.md` for setup, every endpoint,
  and step-by-step instructions for connecting this frontend to it.

```bash
npm install && npm run dev                 # frontend → http://localhost:5173
cd server && npm install && npm run dev    # backend  → http://localhost:5000/api (needs server/.env, see server/README.md)
```

---

## Tech stack

| Tool | Purpose |
| --- | --- |
| [React 18](https://react.dev) | UI library |
| [Vite 5](https://vitejs.dev) | Dev server and production build |
| [Tailwind CSS 3](https://tailwindcss.com) | Styling (custom ivory / beige / charcoal / gold theme) |
| [React Router 6](https://reactrouter.com) | Page routing |
| [Lucide React](https://lucide.dev) | Icons |

No other runtime libraries are used. Charts, the before/after slider, the lightbox gallery and the scroll
animations are all small hand-written components, which keeps the site fast.

---

## 1. Install dependencies

You need **Node.js 18 or newer** (check with `node -v`).

```bash
cd casacraft-interiors
npm install
```

## 2. Run the project

```bash
npm run dev
```

Open the address Vite prints (usually **http://localhost:5173**). The page reloads automatically when you edit a file.

## 3. Build the project

```bash
npm run build     # creates an optimised build in the dist/ folder
npm run preview   # serves the dist/ folder locally to check the build
```

Upload the `dist/` folder to any static host (Netlify, Vercel, GitHub Pages, S3…).
Because this is a single-page app, configure the host to send every route to `index.html`
(on Netlify add a `_redirects` file containing `/*  /index.html  200`; Vercel does this automatically for Vite).

---

## 4. Folder structure

```
casacraft-interiors/
├── index.html                  # HTML shell, fonts and meta tags
├── tailwind.config.js          # Brand colours, fonts, shadows and animations
├── vite.config.js
├── .env.example                # Settings for Phase 2 (API URL)
└── src/
    ├── main.jsx                # App entry: router + global providers
    ├── App.jsx                 # All routes and the dashboard sidebar menus
    ├── index.css               # Tailwind layers + reveal / image-reveal animations
    │
    ├── components/
    │   ├── layout/             # Navbar, Footer, DashboardSidebar, DashboardHeader, AuthShell, ScrollToTop
    │   ├── ui/                 # Reusable building blocks (see list below)
    │   ├── cards/              # ProjectCard, ServiceCard, TestimonialCard, BlogCard
    │   └── charts/             # BarChart, LineChart, DonutChart (pure SVG)
    │
    ├── layouts/
    │   ├── MainLayout.jsx      # Navbar + page + footer for the public site
    │   └── DashboardLayout.jsx # Sidebar shell shared by customer and admin dashboards
    │
    ├── pages/                  # One file per public page
    │   ├── dashboard/          # Customer dashboard pages
    │   └── admin/              # Admin panel pages
    │
    ├── data/                   # ★ All mock content lives here
    │   ├── projects.js         # 13 portfolio projects + filter categories
    │   ├── services.js         # 7 services
    │   ├── testimonials.js
    │   ├── blog.js             # Articles + blog categories
    │   ├── consultations.js    # Form options, statuses, customer + admin consultations
    │   ├── designStyles.js     # 6 design styles
    │   ├── dashboard.js        # Mock customer, stats, chart data, messages
    │   └── site.js             # Navigation, contact details, hero, process, stats, about copy
    │
    ├── services/
    │   └── api.js              # ★ Mock API: every page gets data through here
    │
    ├── context/
    │   ├── AuthContext.jsx     # Mock login state (stored in localStorage)
    │   └── ToastContext.jsx    # showToast() notifications
    │
    ├── hooks/
    │   ├── useFetch.js         # Loads data from services/api.js with loading state
    │   ├── useForm.js          # Form values + validation
    │   ├── useInView.js        # Triggers scroll animations
    │   └── usePageTitle.js     # Sets the browser tab title
    │
    └── utils/
        ├── validation.js       # isEmail, isPhone, required, minLength, validate()
        ├── image.js            # Unsplash image helper and photo library
        ├── icons.js            # Maps icon names in data files to Lucide icons
        └── format.js           # Date and number formatting
```

### Reusable components

| Component | Where | What it does |
| --- | --- | --- |
| `Navbar` | layout | Sticky, transparent over the hero, frosted on scroll, full-screen hamburger menu on mobile |
| `Footer` | layout | Description, quick links, services, contact, social icons, newsletter signup, copyright |
| `DashboardSidebar` | layout | Responsive sidebar for customer and admin areas (slides in on mobile) |
| `Button` | ui | One button for links (`to`), anchors (`href`) and buttons, with variants, sizes and loading state |
| `Hero` | ui | Full-bleed image hero with breadcrumbs and entrance animation |
| `SectionTitle` | ui | Eyebrow + heading + subtitle |
| `Gallery` | ui | Editorial image grid with a keyboard-friendly lightbox |
| `Modal` | ui | Accessible dialog (Escape / overlay to close) |
| `FormInput`, `Select`, `Textarea` | ui | Labelled form fields with error messages |
| `Loading` | ui | Spinner or skeleton cards |
| `EmptyState` | ui | Friendly "nothing here" message with an action |
| `Toast` | ui | Notification used through `useToast()` |
| `StatCard` | ui | Dashboard metric card |
| `Table` | ui | Data table that becomes stacked cards on mobile |
| `Reveal`, `ImageReveal` | ui | Scroll and image-reveal animations |
| `BeforeAfter`, `ColorPalette`, `Rating`, `StatusBadge`, `CountUp`, `CTASection` | ui | Smaller building blocks |

---

## Pages and routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/about` | About |
| `/services` | Services |
| `/portfolio` | Portfolio (filterable masonry grid) |
| `/portfolio/:id` | Project details (e.g. `/portfolio/contemporary-villa`) |
| `/design-styles` | Design styles |
| `/testimonials` | Testimonials |
| `/blog` | Blog |
| `/blog/:id` | Blog details (e.g. `/blog/kitchen-trends-2026`) |
| `/contact` | Contact |
| `/consultation` | Book a consultation |
| `/login`, `/register` | Customer login and registration |
| `/dashboard` | Customer dashboard |
| `/dashboard/projects` | My projects |
| `/dashboard/consultations` | My consultations |
| `/dashboard/profile` | Profile |
| `/dashboard/saved`, `/dashboard/settings` | Saved projects and settings (extra sidebar pages) |
| `/admin/login` | Admin login |
| `/admin` | Admin dashboard with charts |
| `/admin/projects` | Admin projects (add / edit / delete / view) |
| `/admin/services` | Admin services (add / edit / delete) |
| `/admin/consultations` | Admin consultations (change status) |
| anything else | Friendly 404 page |

### Trying the demo

- **Customer login:** any valid email and any password signs you in as the mock customer.
- **Admin login:** the email is pre-filled; type any password.
- The dashboards also open directly without logging in, so the UI is easy to review.
- Admin edits (adding a project, changing a status…) live in memory and reset on refresh.
- `/consultation?style=Luxury` and `/consultation?service=Kitchen%20Design` pre-fill the form (the "I love this style"
  and "Get Started" buttons use this).

---

## Customising content

- **Text, projects, services, blog posts:** edit the files in `src/data/`. Components never hard-code repeated content.
- **Contact details, navigation, statistics:** `src/data/site.js`.
- **Brand colours and fonts:** `tailwind.config.js` (`ivory`, `cream`, `beige`, `charcoal`, `stone`, `gold`) and the Google Fonts link in `index.html`.
- **Images:** the studio's own photos live in `src/assets/images/` and are mapped to image keys in `src/utils/image.js` (the home hero uses `hero-luxury-living.jpg`). Remaining images are free Unsplash photos referenced by id in the same file. To add a photo, drop it in `src/assets/images/`, import it in `image.js` and map it in `LOCAL`. Swap an id there to change it
  everywhere. If an image ever fails to load, `SmartImage` shows a soft placeholder instead of a broken icon.

---

## Connecting a backend (Phase 2)

The API is in `server/`; its README section 9 has the full integration guide. In short:

1. **One place to change.** Every page loads and submits data through `src/services/api.js`. Each function already returns
   a Promise, so replace the mock body with a real request and the pages keep working. Example:

   ```js
   // before (Phase 1)
   export const getProjects = () => delay(projects);

   // after (Phase 2)
   export const getProjects = () => request('/projects');
   ```

   A commented `request()` helper using `VITE_API_URL` is included at the top of the file. Copy `.env.example` to `.env` and set the URL.

2. **Authentication.** `src/context/AuthContext.jsx` exposes `signIn`, `signOut` and `user`. Store the real token there,
   and in `DashboardLayout.jsx` replace the `fallbackUser` behaviour with a redirect to `/login` (or `/admin/login`) when no user is signed in.

3. **Admin CRUD.** `AdminProjects`, `AdminServices` and `AdminConsultations` update local state today. Call the matching API
   functions inside their save / delete / status handlers.

4. **Icons in data.** Services and stats store icon *names* (strings) such as `"Sofa"`, so the same shape can come straight from JSON.

---

### Preview without internet images

Two optional build flags exist for sandboxed previews:

- `VITE_OFFLINE_IMAGES=true` replaces the remaining Unsplash photos with the closest local photo.
- `VITE_HASH_ROUTER=true` uses `#/about`-style URLs for hosts that cannot send every path to `index.html`.

Leave both unset for the real site.

---

## Accessibility & performance notes

- Semantic landmarks, a "Skip to content" link, labelled form fields, `aria-invalid` + error messages, keyboard-friendly modals and lightbox.
- All animations respect the user's **reduced motion** setting.
- Pages are **lazy-loaded** (each route is its own small JS file), and images are lazy-loaded and resized by the Unsplash CDN.
- Fully responsive from 320px phones to large desktops; tables turn into cards on mobile.
