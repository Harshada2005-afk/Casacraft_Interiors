/**
 * Development seed script.
 *
 *   npm run seed           -> clears the collections and inserts sample data
 *   npm run seed:destroy   -> only clears the collections
 *
 * Creates a development admin and a demo customer. Their emails and passwords
 * come from .env (SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD, SEED_CUSTOMER_EMAIL /
 * SEED_CUSTOMER_PASSWORD). If a password is not set, a random one is generated
 * and printed once in the terminal. Nothing is hard-coded.
 *
 * The script refuses to run when NODE_ENV=production unless you add --force.
 */
const crypto = require('crypto');
const { env, assertEnv } = require('../config/env');
const { connectDB, disconnectDB } = require('../config/db');
const { User, Project, Service, Consultation, Testimonial, BlogPost, ContactMessage } = require('../models');

const projects = require('./data/projects');
const services = require('./data/services');
const testimonials = require('./data/testimonials');
const blogPosts = require('./data/blogPosts');
const consultations = require('./data/consultations');
const contactMessages = require('./data/contactMessages');

const args = process.argv.slice(2);
const destroyOnly = args.includes('--destroy');
const force = args.includes('--force');

/** Random password that always meets the API's rules (upper case + number). */
const randomPassword = () => `Cc${crypto.randomBytes(9).toString('base64url')}7`;

const daysFromNow = (n) => {
  const d = new Date();
  d.setHours(11, 0, 0, 0);
  d.setDate(d.getDate() + n);
  return d;
};

async function clearAll() {
  await Promise.all([User, Project, Service, Consultation, Testimonial, BlogPost, ContactMessage].map((M) => M.deleteMany({})));
  console.log('✓ Cleared all collections');
}

async function seed() {
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || randomPassword();
  const customerPassword = process.env.SEED_CUSTOMER_PASSWORD || randomPassword();

  // Users are created one by one so the password-hashing hook runs for each
  const admin = await User.create({
    name: 'Studio Admin',
    email: process.env.SEED_ADMIN_EMAIL || 'admin@casacraft.local',
    phone: '+91 98765 43210',
    password: adminPassword,
    role: 'admin',
  });
  const customer = await User.create({
    name: 'Aarav Sharma',
    email: process.env.SEED_CUSTOMER_EMAIL || 'customer@casacraft.local',
    phone: '+91 98200 12345',
    password: customerPassword,
    role: 'customer',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
  });
  // A few extra customers so the admin user list is not empty (random passwords, not printed)
  for (const [name, email] of [
    ['Kavya Reddy', 'kavya.reddy@example.com'],
    ['Aditya Bose', 'aditya.bose@example.com'],
    ['Neha Verma', 'neha.verma@example.com'],
  ]) {
    await User.create({ name, email, password: randomPassword(), role: 'customer' });
  }
  console.log('✓ Users: 1 admin, 4 customers');

  await Project.insertMany(projects);
  console.log(`✓ Projects: ${projects.length}`);

  await Service.insertMany(services);
  console.log(`✓ Services: ${services.length}`);

  await Testimonial.insertMany(testimonials);
  console.log(`✓ Testimonials: ${testimonials.length}`);

  await BlogPost.insertMany(blogPosts);
  console.log(`✓ Blog posts: ${blogPosts.length}`);

  const toDoc = ({ daysFromNow: n, ...c }, extra = {}) => ({ ...c, preferredDate: daysFromNow(n), ...extra });
  const consultationDocs = [
    ...consultations.guest.map((c) => toDoc(c)),
    ...consultations.customer.map((c) =>
      toDoc(c, { user: customer._id, fullName: customer.name, email: customer.email, phone: customer.phone }),
    ),
  ];
  // create() (not insertMany) so each one gets its reference number from the model hook
  for (const doc of consultationDocs) await Consultation.create(doc);
  console.log(`✓ Consultations: ${consultationDocs.length}`);

  await ContactMessage.insertMany(contactMessages);
  console.log(`✓ Contact messages: ${contactMessages.length}`);

  console.log('\n──────── Development accounts ────────');
  console.log(`Admin     ${admin.email}  /  ${adminPassword}`);
  console.log(`Customer  ${customer.email}  /  ${customerPassword}`);
  if (!process.env.SEED_ADMIN_PASSWORD || !process.env.SEED_CUSTOMER_PASSWORD) {
    console.log('(Random passwords were generated. Copy them now, or set SEED_*_PASSWORD in .env.)');
  }
  console.log('──────────────────────────────────────\n');
}

(async () => {
  try {
    assertEnv();
    if (env.isProduction && !force) {
      throw new Error('Refusing to seed while NODE_ENV=production (it deletes data). Add --force if you are sure.');
    }
    await connectDB(env.MONGODB_URI);
    await clearAll();
    if (!destroyOnly) await seed();
    console.log(destroyOnly ? 'Done: database emptied.' : 'Done: database seeded.');
  } catch (err) {
    console.error(`Seeding failed: ${err.message}`);
    process.exitCode = 1;
  } finally {
    await disconnectDB().catch(() => {});
  }
})();
