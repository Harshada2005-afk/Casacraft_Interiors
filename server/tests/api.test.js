/**
 * End-to-end API tests.
 *
 *   npm test
 *
 * Uses an in-memory MongoDB (mongodb-memory-server downloads a MongoDB binary
 * the first time). To use your own MongoDB instead, set TEST_MONGODB_URI, e.g.
 *   TEST_MONGODB_URI=mongodb://127.0.0.1:27017/casacraft_test npm test
 * The test database is dropped at the end.
 */
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret-that-is-at-least-32-characters-long';
process.env.CLIENT_URL = 'http://localhost:5173';

const { test, before, after, describe } = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../app');
const { User, Project } = require('../models');

let memoryServer;
let adminToken;
let customerToken;
let otherCustomerToken;
let adminId;
let customerId;

const api = () => request(app);
const bearer = (token) => ({ Authorization: `Bearer ${token}` });
const future = (days = 7) => new Date(Date.now() + days * 864e5).toISOString().slice(0, 10);

const consultationBody = (overrides = {}) => ({
  fullName: 'Test Customer',
  email: 'test.customer@example.com',
  phone: '+91 98765 43210',
  propertyType: 'Apartment',
  projectType: 'Kitchen',
  location: 'Andheri West, Mumbai',
  budget: '₹5–10 Lakh',
  designStyle: 'Modern',
  preferredDate: future(),
  message: 'Please call after 6 PM.',
  ...overrides,
});

before(async () => {
  let uri = process.env.TEST_MONGODB_URI;
  if (!uri) {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    memoryServer = await MongoMemoryServer.create();
    uri = memoryServer.getUri('casacraft_test');
  }
  await mongoose.connect(uri);
  await mongoose.connection.dropDatabase();
  await Promise.all(Object.values(mongoose.models).map((m) => m.syncIndexes()));

  const admin = await User.create({ name: 'Admin', email: 'admin@test.dev', password: 'AdminPass1', role: 'admin' });
  adminId = admin.id;
  const login = await api().post('/api/auth/login').send({ email: 'admin@test.dev', password: 'AdminPass1' });
  adminToken = login.body.data.token;
});

after(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
  if (memoryServer) await memoryServer.stop();
});

describe('Health & errors', () => {
  test('GET /api/health works', async () => {
    const res = await api().get('/api/health');
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
  });

  test('unknown route returns JSON 404', async () => {
    const res = await api().get('/api/nope');
    assert.equal(res.status, 404);
    assert.deepEqual(Object.keys(res.body).sort(), ['message', 'success']);
    assert.equal(res.body.success, false);
  });

  test('malformed JSON returns 400', async () => {
    const res = await api().post('/api/auth/login').set('Content-Type', 'application/json').send('{"email":');
    assert.equal(res.status, 400);
    assert.equal(res.body.message, 'Request body must be valid JSON');
  });

  test('CORS allows the frontend origin only', async () => {
    const ok = await api().get('/api/health').set('Origin', 'http://localhost:5173');
    assert.equal(ok.headers['access-control-allow-origin'], 'http://localhost:5173');
    const bad = await api().get('/api/health').set('Origin', 'https://evil.example');
    assert.equal(bad.headers['access-control-allow-origin'], undefined);
  });
});

describe('Auth', () => {
  test('register creates a customer, hashes the password and returns a token', async () => {
    const res = await api()
      .post('/api/auth/register')
      .send({ name: 'Priya', email: 'Priya@Example.com', phone: '+91 99999 11111', password: 'Secret123', role: 'admin' });
    assert.equal(res.status, 201);
    assert.equal(res.body.data.user.role, 'customer', 'role from the client must be ignored');
    assert.equal(res.body.data.user.email, 'priya@example.com');
    assert.equal(res.body.data.user.password, undefined, 'password must never be returned');
    assert.ok(res.body.data.token);
    customerToken = res.body.data.token;
    customerId = res.body.data.user.id;

    const stored = await User.findById(customerId).select('+password');
    assert.notEqual(stored.password, 'Secret123');
    assert.match(stored.password, /^\$2[aby]\$12\$/);
  });

  test('register rejects duplicates and weak passwords', async () => {
    const dup = await api().post('/api/auth/register').send({ name: 'P', email: 'priya@example.com', password: 'Secret123' });
    assert.equal(dup.status, 409);
    const weak = await api().post('/api/auth/register').send({ name: 'P', email: 'weak@example.com', password: 'short' });
    assert.equal(weak.status, 400);
    assert.equal(weak.body.errors[0].field, 'password');
  });

  test('login works and wrong passwords fail with 401', async () => {
    const ok = await api().post('/api/auth/login').send({ email: 'priya@example.com', password: 'Secret123' });
    assert.equal(ok.status, 200);
    const bad = await api().post('/api/auth/login').send({ email: 'priya@example.com', password: 'Wrong1234' });
    assert.equal(bad.status, 401);
    assert.equal(bad.body.message, 'Invalid email or password');
    const unknown = await api().post('/api/auth/login').send({ email: 'nobody@example.com', password: 'Wrong1234' });
    assert.equal(unknown.body.message, bad.body.message);
  });

  test('GET /api/auth/me needs a valid token', async () => {
    assert.equal((await api().get('/api/auth/me')).status, 401);
    assert.equal((await api().get('/api/auth/me').set(bearer('garbage'))).status, 401);
    const me = await api().get('/api/auth/me').set(bearer(customerToken));
    assert.equal(me.status, 200);
    assert.equal(me.body.data.email, 'priya@example.com');
  });

  test('PUT /api/auth/me updates own profile but not role', async () => {
    const res = await api().put('/api/auth/me').set(bearer(customerToken)).send({ name: 'Priya S', role: 'admin' });
    assert.equal(res.status, 200);
    assert.equal(res.body.data.name, 'Priya S');
    assert.equal(res.body.data.role, 'customer');
  });

  test('a second customer for ownership checks', async () => {
    const res = await api().post('/api/auth/register').send({ name: 'Other', email: 'other@example.com', password: 'Secret123' });
    otherCustomerToken = res.body.data.token;
    assert.ok(otherCustomerToken);
  });
});

describe('Projects', () => {
  let projectId;

  test('customers cannot create projects; admins can', async () => {
    const body = { title: 'Test Villa', location: 'Goa', category: 'Villa', style: 'Luxury', year: 2025, featured: true };
    assert.equal((await api().post('/api/projects').send(body)).status, 401);
    assert.equal((await api().post('/api/projects').set(bearer(customerToken)).send(body)).status, 403);
    const res = await api().post('/api/projects').set(bearer(adminToken)).send(body);
    assert.equal(res.status, 201);
    assert.equal(res.body.message, 'Project created successfully');
    assert.equal(res.body.data.slug, 'test-villa');
    projectId = res.body.data.id;
  });

  test('validation errors are returned as 400 with field info', async () => {
    const res = await api().post('/api/projects').set(bearer(adminToken)).send({ title: '', category: 'Garage' });
    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
    assert.ok(res.body.errors.some((e) => e.field === 'category'));
  });

  test('duplicate titles get a unique slug', async () => {
    const res = await api().post('/api/projects').set(bearer(adminToken)).send({ title: 'Test Villa', location: 'Alibaug', category: 'Villa', style: 'Modern' });
    assert.equal(res.body.data.slug, 'test-villa-2');
  });

  test('list supports search, filters, sorting and pagination', async () => {
    await Project.create([
      { title: 'Calm Kitchen', location: 'Pune', category: 'Kitchen', style: 'Minimalist', year: 2021 },
      { title: 'Bold Kitchen', location: 'Delhi', category: 'Kitchen', style: 'Industrial', year: 2024 },
      { title: 'Studio Office', location: 'Mumbai', category: 'Office', style: 'Modern', year: 2023 },
    ]);
    const kitchens = await api().get('/api/projects?category=Kitchen&sort=-year');
    assert.equal(kitchens.status, 200);
    assert.deepEqual(kitchens.body.data.map((p) => p.title), ['Bold Kitchen', 'Calm Kitchen']);

    const search = await api().get('/api/projects?search=studio');
    assert.equal(search.body.data.length, 1);

    const style = await api().get('/api/projects?style=Industrial');
    assert.equal(style.body.data[0].title, 'Bold Kitchen');

    const page = await api().get('/api/projects?limit=2&page=2&sort=title');
    assert.equal(page.body.data.length, 2);
    assert.deepEqual(page.body.pagination, { page: 2, limit: 2, total: 5, pages: 3 });

    const regexAttack = await api().get('/api/projects?search=.*(');
    assert.equal(regexAttack.status, 200);
    const injection = await api().get('/api/projects?category[$ne]=x');
    assert.equal(injection.status, 200);
    assert.equal(injection.body.pagination.total, 5, 'object filters must be ignored');
  });

  test('get by id and by slug; 404 when missing', async () => {
    assert.equal((await api().get(`/api/projects/${projectId}`)).body.data.title, 'Test Villa');
    assert.equal((await api().get('/api/projects/test-villa')).body.data.id, projectId);
    const missing = await api().get('/api/projects/does-not-exist');
    assert.equal(missing.status, 404);
    assert.deepEqual(missing.body, { success: false, message: 'Project not found' });
  });

  test('admin can update and delete', async () => {
    const upd = await api().put(`/api/projects/${projectId}`).set(bearer(adminToken)).send({ status: 'In Progress' });
    assert.equal(upd.status, 200);
    assert.equal(upd.body.data.status, 'In Progress');
    assert.equal((await api().put(`/api/projects/${projectId}`).set(bearer(customerToken)).send({ status: 'Planning' })).status, 403);
    const del = await api().delete(`/api/projects/${projectId}`).set(bearer(adminToken));
    assert.equal(del.status, 200);
    assert.equal((await api().get(`/api/projects/${projectId}`)).status, 404);
  });
});

describe('Services, testimonials and blog', () => {
  test('services: public sees active only, admin manages', async () => {
    const created = await api()
      .post('/api/services')
      .set(bearer(adminToken))
      .send({ title: 'Kitchen Design', short: 'Beautiful kitchens', icon: 'ChefHat', features: ['Islands'] });
    assert.equal(created.status, 201);
    const hidden = await api().post('/api/services').set(bearer(adminToken)).send({ title: 'Secret', short: 'Hidden', isActive: false });
    assert.equal((await api().get('/api/services')).body.data.length, 1);
    assert.equal((await api().get('/api/services').set(bearer(adminToken))).body.data.length, 2);
    assert.equal((await api().get(`/api/services/${hidden.body.data.id}`)).status, 404);
    assert.equal((await api().get('/api/services/kitchen-design')).status, 200);
    assert.equal((await api().put(`/api/services/${created.body.data.id}`).set(bearer(adminToken)).send({ startingPrice: '₹3 Lakh' })).body.data.startingPrice, '₹3 Lakh');
    assert.equal((await api().delete(`/api/services/${created.body.data.id}`).set(bearer(customerToken))).status, 403);
    assert.equal((await api().delete(`/api/services/${created.body.data.id}`).set(bearer(adminToken))).status, 200);
  });

  test('testimonials: rating validated, admin only writes', async () => {
    assert.equal((await api().post('/api/testimonials').set(bearer(adminToken)).send({ name: 'A', review: 'Great', rating: 9 })).status, 400);
    const t = await api().post('/api/testimonials').set(bearer(adminToken)).send({ name: 'Meera', review: 'Lovely work', rating: 5, location: 'Chennai' });
    assert.equal(t.status, 201);
    assert.equal((await api().post('/api/testimonials').set(bearer(customerToken)).send({ name: 'x', review: 'y', rating: 5 })).status, 403);
    assert.equal((await api().get('/api/testimonials')).body.data.length, 1);
    assert.equal((await api().put(`/api/testimonials/${t.body.data.id}`).set(bearer(adminToken)).send({ rating: 4 })).body.data.rating, 4);
    assert.equal((await api().delete(`/api/testimonials/${t.body.data.id}`).set(bearer(adminToken))).status, 200);
  });

  test('blog: drafts hidden from the public, slug lookup, category filter', async () => {
    const post = await api()
      .post('/api/blog')
      .set(bearer(adminToken))
      .send({ title: 'Kitchen Trends', category: 'Kitchen', excerpt: 'What is new', content: [{ type: 'h2', text: 'Islands' }] });
    assert.equal(post.status, 201);
    await api().post('/api/blog').set(bearer(adminToken)).send({ title: 'Draft', category: 'Office', excerpt: 'Soon', isPublished: false });
    assert.equal((await api().get('/api/blog')).body.data.length, 1);
    assert.equal((await api().get('/api/blog?category=Kitchen')).body.data.length, 1);
    assert.equal((await api().get('/api/blog/kitchen-trends')).body.data.content[0].text, 'Islands');
    assert.equal((await api().get('/api/blog/draft')).status, 404);
    assert.equal((await api().put(`/api/blog/${post.body.data.id}`).set(bearer(customerToken)).send({ title: 'Hacked' })).status, 403);
    assert.equal((await api().delete(`/api/blog/${post.body.data.id}`).set(bearer(adminToken))).status, 200);
  });
});

describe('Consultations', () => {
  let mineId;
  let guestId;

  test('guests and customers can book; validation enforced', async () => {
    const guest = await api().post('/api/consultations').send(consultationBody());
    assert.equal(guest.status, 201);
    assert.equal(guest.body.message, 'Thank you! Your consultation request has been received.');
    assert.equal(guest.body.data.status, 'Pending');
    assert.match(guest.body.data.reference, /^CN-/);
    guestId = guest.body.data.id;

    const mine = await api().post('/api/consultations').set(bearer(customerToken)).send(consultationBody({ status: 'Completed' }));
    assert.equal(mine.status, 201);
    assert.equal(mine.body.data.status, 'Pending', 'clients cannot set the status');
    assert.equal(mine.body.data.user, customerId);
    mineId = mine.body.data.id;

    const bad = await api().post('/api/consultations').send(consultationBody({ budget: '₹1 Crore', preferredDate: '2001-01-01' }));
    assert.equal(bad.status, 400);
    const fields = bad.body.errors.map((e) => e.field);
    assert.ok(fields.includes('budget') && fields.includes('preferredDate'));
  });

  test('customers see only their own', async () => {
    const mine = await api().get('/api/consultations/my').set(bearer(customerToken));
    assert.equal(mine.status, 200);
    assert.equal(mine.body.data.length, 1);
    assert.equal((await api().get('/api/consultations/my').set(bearer(otherCustomerToken))).body.data.length, 0);
    assert.equal((await api().get(`/api/consultations/${mineId}`).set(bearer(customerToken))).status, 200);
    assert.equal((await api().get(`/api/consultations/${mineId}`).set(bearer(otherCustomerToken))).status, 403);
    assert.equal((await api().get(`/api/consultations/${guestId}`).set(bearer(customerToken))).status, 403);
    assert.equal((await api().get('/api/consultations').set(bearer(customerToken))).status, 403);
    assert.equal((await api().get('/api/consultations/not-an-id').set(bearer(customerToken))).status, 400);
  });

  test('admin lists, filters, updates status and deletes', async () => {
    const all = await api().get('/api/consultations').set(bearer(adminToken));
    assert.equal(all.body.data.length, 2);
    const upd = await api().put(`/api/consultations/${mineId}/status`).set(bearer(adminToken)).send({ status: 'Scheduled' });
    assert.equal(upd.status, 200);
    assert.equal(upd.body.data.status, 'Scheduled');
    assert.equal((await api().put(`/api/consultations/${mineId}/status`).set(bearer(adminToken)).send({ status: 'Lost' })).status, 400);
    assert.equal((await api().put(`/api/consultations/${mineId}/status`).set(bearer(customerToken)).send({ status: 'Completed' })).status, 403);
    assert.equal((await api().get('/api/consultations?status=Scheduled').set(bearer(adminToken))).body.data.length, 1);
    assert.equal((await api().delete(`/api/consultations/${guestId}`).set(bearer(customerToken))).status, 403);
    assert.equal((await api().delete(`/api/consultations/${guestId}`).set(bearer(adminToken))).status, 200);
    assert.equal((await api().delete(`/api/consultations/${guestId}`).set(bearer(adminToken))).status, 404);
  });
});

describe('Contact messages', () => {
  test('anyone can send; only admins manage', async () => {
    const sent = await api().post('/api/contact').send({ name: 'Rhea', email: 'rhea@example.com', subject: 'Hello', message: 'I love your work, let us talk.' });
    assert.equal(sent.status, 201);
    const id = sent.body.data.id;
    assert.equal((await api().post('/api/contact').send({ name: 'R', email: 'bad', subject: 'x', message: 'short' })).status, 400);
    assert.equal((await api().get('/api/contact').set(bearer(customerToken))).status, 403);
    const list = await api().get('/api/contact').set(bearer(adminToken));
    assert.equal(list.body.data.length, 1);
    assert.equal((await api().put(`/api/contact/${id}`).set(bearer(adminToken)).send({ status: 'Replied' })).body.data.status, 'Replied');
    assert.equal((await api().delete(`/api/contact/${id}`).set(bearer(adminToken))).status, 200);
  });
});

describe('Users (admin)', () => {
  test('only admins can manage users; passwords never exposed', async () => {
    assert.equal((await api().get('/api/users').set(bearer(customerToken))).status, 403);
    const list = await api().get('/api/users?role=customer').set(bearer(adminToken));
    assert.equal(list.status, 200);
    assert.equal(list.body.data.length, 2);
    assert.ok(list.body.data.every((u) => u.password === undefined));

    const one = await api().get(`/api/users/${customerId}`).set(bearer(adminToken));
    assert.equal(one.body.data.email, 'priya@example.com');

    const promoted = await api().put(`/api/users/${customerId}`).set(bearer(adminToken)).send({ role: 'admin', password: 'Hacked123' });
    assert.equal(promoted.body.data.role, 'admin');
    const stillOld = await api().post('/api/auth/login').send({ email: 'priya@example.com', password: 'Secret123' });
    assert.equal(stillOld.status, 200, 'PUT /users must not change passwords');

    assert.equal((await api().put(`/api/users/${adminId}`).set(bearer(adminToken)).send({ role: 'customer' })).status, 400);
    assert.equal((await api().delete(`/api/users/${adminId}`).set(bearer(adminToken))).status, 400);
    assert.equal((await api().delete(`/api/users/${customerId}`).set(bearer(adminToken))).status, 200);
    assert.equal((await api().get('/api/auth/me').set(bearer(customerToken))).status, 401, 'deleted users lose access');
  });
});
