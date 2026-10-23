# CasaCraft Interiors – Backend API (Phase 2)

A REST API for the CasaCraft Interiors website, built with **Node.js, Express, MongoDB (Mongoose), JWT and bcrypt**.
It lives in the `server/` folder next to the Phase 1 React frontend and runs as a separate server.

```
casacraft-interiors/
├── src/ …            ← Phase 1 React frontend (unchanged)
└── server/           ← this API
    ├── config/        env.js (reads .env), db.js (MongoDB connection), constants.js (allowed values)
    ├── controllers/   request handlers, one file per resource (+ crudFactory.js shared CRUD logic)
    ├── middleware/    authMiddleware, adminMiddleware, validators, validate, errorMiddleware, rateLimiters
    ├── models/        User, Project, Service, Consultation, Testimonial, BlogPost, ContactMessage
    ├── routes/        Express routers, all mounted under /api
    ├── services/      tokenService (JWT), queryService (search/filter/sort/pagination), findByIdOrSlug
    ├── utils/         ApiError, apiResponse, asyncHandler, slugify, pick
    ├── seed/          seed.js + data/ (content copied from the frontend mock data)
    ├── tests/         api.test.js (end-to-end tests)
    ├── app.js         Express app (security, CORS, routes, errors)
    ├── server.js      starts the app after connecting to MongoDB
    └── .env.example
```

Every response uses the same shape:

```json
{ "success": true, "message": "Projects fetched successfully", "data": [ … ], "pagination": { "page": 1, "limit": 12, "total": 13, "pages": 2 } }
{ "success": false, "message": "Project not found" }
{ "success": false, "message": "Validation failed", "errors": [ { "field": "email", "message": "Please enter a valid email" } ] }
```

`pagination` appears on list endpoints only, and `errors` on validation failures only.

---

## 1. Installation

You need **Node.js 18.17 or newer** (`node -v`) and a MongoDB database (step 3).

```bash
cd casacraft-interiors/server
npm install
```

## 2. Environment setup

```bash
cp .env.example .env
```

Open `.env` and fill it in:

| Key | Required | Example | What it is |
| --- | --- | --- | --- |
| `PORT` | no | `5000` | Port the API listens on |
| `MONGODB_URI` | **yes** | `mongodb://127.0.0.1:27017/casacraft` | MongoDB connection string |
| `JWT_SECRET` | **yes** | 96 random hex characters | Signs login tokens. At least 32 characters |
| `CLIENT_URL` | yes | `http://localhost:5173` | Frontend address allowed by CORS (comma-separate several) |
| `JWT_EXPIRES_IN` | no | `7d` | Token lifetime |
| `NODE_ENV` | no | `development` | Use `production` when deployed |
| `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` | no | | Development admin created by the seed script |
| `SEED_CUSTOMER_EMAIL` / `SEED_CUSTOMER_PASSWORD` | no | | Demo customer created by the seed script |

Generate a strong JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

The server refuses to start if `MONGODB_URI` or `JWT_SECRET` is missing or the secret is too short.
**Never commit `.env`** (it is already in `.gitignore`). Secrets are read only from environment variables and never appear in responses or logs.

## 3. MongoDB setup

Pick one:

**Local MongoDB**
1. Install MongoDB Community Server from <https://www.mongodb.com/try/download/community> (or `brew install mongodb-community` on macOS).
2. Start it (it listens on `127.0.0.1:27017` by default).
3. Use `MONGODB_URI=mongodb://127.0.0.1:27017/casacraft`.

**Docker**

```bash
docker run -d --name casacraft-mongo -p 27017:27017 mongo:7
```

**MongoDB Atlas (free cloud database)**
1. Create a free cluster at <https://www.mongodb.com/atlas>.
2. Under *Database Access* create a database user with a strong password.
3. Under *Network Access* allow your IP address (and later your server's IP).
4. Click *Connect → Drivers* and copy the string into `.env`, adding the database name:
   `MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/casacraft?retryWrites=true&w=majority`

Collections and indexes are created automatically on first use.

## 4. Running the server

```bash
npm run dev     # development, restarts on file changes (nodemon)
npm start       # normal start
```

You should see `MongoDB connected` and `CasaCraft API running on http://localhost:5000`.
Check it with <http://localhost:5000/api/health>.

**Tests:** `npm test` runs 24 end-to-end tests covering every endpoint, permissions and validation. By default they use an
in-memory MongoDB (downloaded automatically the first time). To use your own database instead:

```bash
TEST_MONGODB_URI=mongodb://127.0.0.1:27017/casacraft_test npm test
```

The test database is dropped afterwards, so never point it at real data.

## 5. Database seeding

```bash
npm run seed           # clears the collections, then loads sample data
npm run seed:destroy   # only clears the collections
```

It loads the same content the frontend shows: 13 projects, 7 services, 7 testimonials, 6 blog posts, 14 consultations
and 3 contact messages, plus:

- a **development admin** (`SEED_ADMIN_EMAIL`)
- a **demo customer**, Aarav Sharma (`SEED_CUSTOMER_EMAIL`), who owns 5 of the consultations
- 3 extra customers

No passwords are written in the code. If `SEED_ADMIN_PASSWORD` / `SEED_CUSTOMER_PASSWORD` are empty, a random password is
generated and **printed once** in the terminal, so copy it then (or set your own in `.env` and re-seed).
The seed script refuses to run when `NODE_ENV=production` unless you add `--force`, because it deletes data.

---

## 6. API endpoints

Base URL: `http://localhost:5000/api`. 🌐 public · 🔑 logged-in user · 🛡️ admin only.
Items marked *id* accept either the MongoDB `_id` or the `slug` (for example `/projects/contemporary-villa`).

### Auth

| Method | Path | Access | Body / notes |
| --- | --- | --- | --- |
| POST | `/auth/register` | 🌐 | `name, email, password, phone?, confirmPassword?` → `{ user, token }`. Always creates a `customer` |
| POST | `/auth/login` | 🌐 | `email, password` → `{ user, token }` |
| GET | `/auth/me` | 🔑 | Current user |
| PUT | `/auth/me` | 🔑 | `name?, phone?, profileImage?` |
| PUT | `/auth/password` | 🔑 | `currentPassword, newPassword` → new `token` |

Passwords need 8–72 characters with at least one uppercase letter and one number. Auth routes allow 20 attempts per 15 minutes per IP.

### Projects

| Method | Path | Access |
| --- | --- | --- |
| GET | `/projects` | 🌐 |
| GET | `/projects/:id` | 🌐 |
| POST | `/projects` | 🛡️ |
| PUT | `/projects/:id` | 🛡️ |
| DELETE | `/projects/:id` | 🛡️ |

Query options for `GET /projects`:

| Param | Example | Notes |
| --- | --- | --- |
| `search` | `?search=villa` | Title, location or description |
| `category` | `?category=Kitchen` | Residential, Commercial, Kitchen, Bedroom, Living Room, Office, Villa, Apartment (`All` = no filter) |
| `style` | `?style=Modern` | Modern, Minimalist, Luxury, Scandinavian, Industrial, Traditional |
| `status` | `?status=Completed` | Completed, In Progress, Planning |
| `featured` | `?featured=true` | |
| `sort` | `?sort=-year` | `year, title, createdAt, category, style, featured`. Prefix `-` for descending. Default `-featured -year` |
| `page`, `limit` | `?page=2&limit=6` | Default limit 12, maximum 50 |

### Services · Testimonials · Blog

| Method | Path | Access | Notes |
| --- | --- | --- | --- |
| GET | `/services` | 🌐 | Active services, sorted by `order`. `?search=` |
| GET | `/services/:id` | 🌐 | |
| POST / PUT / DELETE | `/services`, `/services/:id` | 🛡️ | |
| GET | `/testimonials` | 🌐 | Published only. `?projectType=` `?sort=-rating` |
| POST / PUT / DELETE | `/testimonials`, `/testimonials/:id` | 🛡️ | `rating` 1–5 |
| GET | `/blog` | 🌐 | Published only. `?search=` `?category=` `?sort=-publishedAt` |
| GET | `/blog/:id` | 🌐 | |
| POST / PUT / DELETE | `/blog`, `/blog/:id` | 🛡️ | `content` is an array of `{ type: "p" \| "h2" \| "quote", text }` |

Admins (when sending their token) also see inactive services, hidden testimonials and draft posts.

### Consultations

| Method | Path | Access | Notes |
| --- | --- | --- | --- |
| POST | `/consultations` | 🌐 | Anyone can book. With a token it is linked to that customer |
| GET | `/consultations/my` | 🔑 | The logged-in customer's requests |
| GET | `/consultations/:id` | 🔑 | Owner or admin only (others get 403) |
| GET | `/consultations` | 🛡️ | `?status=` `?projectType=` `?search=` `?sort=` `?page=` |
| PUT | `/consultations/:id/status` | 🛡️ | `{ "status": "Scheduled", "adminNotes": "…" }` |
| DELETE | `/consultations/:id` | 🛡️ | |

Booking body: `fullName, email, phone, propertyType, projectType, location, budget, designStyle, preferredDate (YYYY-MM-DD, not in the past), message?`.
Allowed values match the frontend dropdowns (`config/constants.js`). Status is one of
**Pending, Contacted, Scheduled, Completed, Cancelled** and always starts as Pending. Each booking gets a reference such as `CN-M1X2Y3`.

### Contact messages

| Method | Path | Access | Notes |
| --- | --- | --- | --- |
| POST | `/contact` | 🌐 | `name, email, phone?, subject, message` (10–3000 characters) |
| GET | `/contact` | 🛡️ | `?status=New` |
| PUT | `/contact/:id` | 🛡️ | `{ "status": "Read" \| "Replied" \| "Archived" \| "New" }` |
| DELETE | `/contact/:id` | 🛡️ | |

### Users (admin)

| Method | Path | Access | Notes |
| --- | --- | --- | --- |
| GET | `/users` | 🛡️ | `?role=customer` `?search=` |
| GET | `/users/:id` | 🛡️ | |
| PUT | `/users/:id` | 🛡️ | `name, email, phone, role, profileImage`. Passwords cannot be changed here |
| DELETE | `/users/:id` | 🛡️ | Admins cannot delete themselves or remove their own admin role |

### Status codes

`200` OK · `201` created · `400` validation error or bad id · `401` not logged in / bad token / wrong password ·
`403` not allowed · `404` not found · `409` duplicate (email or slug) · `429` too many requests · `500` server error.

---

## 7. Authentication

1. Call `POST /api/auth/login` (or `/register`). The response contains a **JWT**:

   ```json
   { "success": true, "message": "Logged in successfully", "data": { "user": { "id": "…", "name": "Aarav Sharma", "role": "customer" }, "token": "eyJhbGciOi…" } }
   ```

2. Send it on protected requests in the `Authorization` header:

   ```
   Authorization: Bearer eyJhbGciOi…
   ```

3. `authMiddleware` verifies the token, loads the user and puts it on `req.user`. A missing, invalid or expired token
   (or a deleted user) returns `401`.

How it is kept safe:

- Passwords are hashed with **bcrypt** (12 rounds) before saving. Plain-text passwords are never stored, and the hash is
  never returned (`select: false` plus removal in `toJSON`).
- Login errors are the same for an unknown email and a wrong password, so accounts cannot be discovered.
- Tokens are signed with `JWT_SECRET` (HS256) and expire after `JWT_EXPIRES_IN`.
- `register` always creates a `customer`; a `role` sent by the client is ignored.

Quick try with curl:

```bash
TOKEN=$(curl -s -X POST localhost:5000/api/auth/login -H "Content-Type: application/json" \
  -d '{"email":"customer@casacraft.local","password":"<password printed by the seed>"}' | node -pe 'JSON.parse(require("fs").readFileSync(0)).data.token')
curl localhost:5000/api/consultations/my -H "Authorization: Bearer $TOKEN"
```

## 8. Admin authorization

`adminMiddleware` runs after `authMiddleware` and returns `403` ("You do not have permission to perform this action.") unless `req.user.role === "admin"`.

```js
router.post('/', authMiddleware, adminMiddleware, validators.project, validate, controller.create);
router.use(authMiddleware, adminMiddleware); // protects every route in userRoutes.js
```

Admin-only actions: creating, editing and deleting projects, services, testimonials and blog posts; listing and managing
all consultations, contact messages and users.

**Creating admins.** Nobody can register as an admin. The first admin comes from the seed script (development) or can be
promoted in MongoDB:

```js
db.users.updateOne({ email: "you@yourstudio.com" }, { $set: { role: "admin" } })
```

After that, an admin can promote others with `PUT /api/users/:id { "role": "admin" }`.

---

## 9. Frontend integration

The Phase 1 frontend loads every piece of data through **`src/services/api.js`**, so connecting it means changing that one
file (plus storing the token). The frontend code was not changed in Phase 2.

**1. Point the frontend at the API.** In the project root (not `server/`) create `.env`:

```
VITE_API_URL=http://localhost:5000/api
```

Run both: `npm run dev` in the root (port 5173) and `npm run dev` in `server/` (port 5000).

**2. Add a request helper** at the top of `src/services/api.js`:

```js
const API_URL = import.meta.env.VITE_API_URL;

async function request(path, { method = 'GET', body, auth = true } = {}) {
  const token = localStorage.getItem('casacraft-token');
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (!json.success) {
    const error = new Error(json.message);
    error.status = res.status;
    error.errors = json.errors; // [{ field, message }] on validation errors
    throw error;
  }
  return json.data;
}
```

**3. Swap the mock functions.** Keep the names so the pages do not change:

```js
export const getProjects = (params = {}) => request(`/projects?${new URLSearchParams({ limit: 50, ...params })}`);
export const getProject = (slug) => request(`/projects/${slug}`);
export const getServices = () => request('/services');
export const getTestimonials = () => request('/testimonials');
export const getBlogPosts = () => request('/blog');
export const getBlogPost = (slug) => request(`/blog/${slug}`);
export const submitContactForm = (payload) => request('/contact', { method: 'POST', body: payload });
export const submitConsultation = (payload) => request('/consultations', { method: 'POST', body: payload });

export const login = (body) => request('/auth/login', { method: 'POST', body, auth: false });
export const register = ({ fullName, ...rest }) =>
  request('/auth/register', { method: 'POST', body: { name: fullName, ...rest }, auth: false });
export const adminLogin = login; // same endpoint; check data.user.role === 'admin'
export const getMyConsultations = () => request('/consultations/my');
export const updateProfile = (profile) => request('/auth/me', { method: 'PUT', body: profile });

// admin
export const getAdminProjects = () => request('/projects?limit=50');
export const createProject = (p) => request('/projects', { method: 'POST', body: p });
export const updateProject = (id, p) => request(`/projects/${id}`, { method: 'PUT', body: p });
export const deleteProject = (id) => request(`/projects/${id}`, { method: 'DELETE' });
export const getAdminConsultations = () => request('/consultations?limit=50');
export const updateConsultationStatus = (id, status) =>
  request(`/consultations/${id}/status`, { method: 'PUT', body: { status } });
```

These names match the existing exports in `api.js`. `createProject`, `deleteProject` and similar are new: call them from the
save, delete and status handlers in `AdminProjects`, `AdminServices` and `AdminConsultations`, which only update local state
today. `getDesignStyles`, `subscribeNewsletter` and `getMyProjects` have no API yet and can stay mocked.


**4. Log in for real.** After `login` or `register` resolves, save the returned `token` with `localStorage.setItem('casacraft-token', token)` and pass the returned `user` to `signIn()` in
`AuthContext.jsx`. On logout remove the token. On app start, call `GET /auth/me` to restore the user (clear the token on 401).
Use `user.role === 'admin'` to guard the `/admin` pages.

**Data shapes.** Seeded records use the same fields as `src/data/*`, with two differences:

- Each record has an `id` (MongoDB id) **and** a `slug`. The frontend's `/portfolio/:id` and `/blog/:id` routes use the slug,
  which the API accepts directly. Use `id` for admin updates and deletes.
- Image fields contain full URLs. Local photos in `src/assets/images` stay in the frontend; replace the URLs in
  `seed/data/*.js` if you host your own images.

**Optional: Vite proxy** (avoids CORS in development). In `vite.config.js`:

```js
server: { proxy: { '/api': 'http://localhost:5000' } }
```

Then set `VITE_API_URL=/api`.

---

## 10. Deployment

**Database:** use MongoDB Atlas (step 3) and allow your host's IP addresses under *Network Access*.

**API** (Render, Railway, Fly.io, a VPS…):

1. Set the root directory to `server`, the build command to `npm install` and the start command to `npm start`.
2. Add environment variables in the host's dashboard (never upload `.env`):
   `NODE_ENV=production`, `MONGODB_URI`, a **new** long `JWT_SECRET`, `CLIENT_URL=https://your-frontend-domain.com`.
   `PORT` is usually provided by the host.
3. Do not run the seed in production. Create your admin as described in step 8.
4. Check `https://your-api-domain.com/api/health`.

**Frontend** (Netlify, Vercel): set `VITE_API_URL=https://your-api-domain.com/api` before `npm run build`.

**Production behaviour already built in:**

- `helmet` security headers, CORS limited to `CLIENT_URL`, JSON bodies limited to 100 KB.
- Rate limits: 500 API requests per 15 minutes, 20 auth attempts per 15 minutes, 30 form submissions per hour (per IP).
- Server error details and stack traces are hidden when `NODE_ENV=production`.
- Graceful shutdown on `SIGTERM` (closes the HTTP server and the database connection).
- `trust proxy` is enabled so rate limits see the real client IP behind the host's load balancer.
- Search input is escaped and filters only accept known fields, which blocks regex and NoSQL injection.

Use HTTPS for both sites, keep `JWT_SECRET` private, and rotate it if it ever leaks (this logs everyone out).
