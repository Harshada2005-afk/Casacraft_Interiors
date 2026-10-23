/**
 * Loads and checks environment variables once, at start-up.
 * The app refuses to start with missing or unsafe settings instead of
 * failing later in a confusing way.
 */
require('dotenv').config({ quiet: true });

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT) || 5000,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
};

env.isProduction = env.NODE_ENV === 'production';
env.isTest = env.NODE_ENV === 'test';

/** Throws a readable error when a required setting is missing. */
function assertEnv() {
  const missing = ['MONGODB_URI', 'JWT_SECRET'].filter((key) => !env[key]);
  if (missing.length) {
    throw new Error(`Missing environment variable(s): ${missing.join(', ')}. Copy .env.example to .env and fill them in.`);
  }
  if (env.JWT_SECRET.length < 32) {
    throw new Error('JWT_SECRET must be at least 32 characters long. Use a long random string.');
  }
}

module.exports = { env, assertEnv };
