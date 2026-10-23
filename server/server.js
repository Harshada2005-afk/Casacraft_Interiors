/**
 * Entry point: checks settings, connects to MongoDB, then starts the API.
 */
const { env, assertEnv } = require('./config/env');
const { connectDB, disconnectDB } = require('./config/db');
const app = require('./app');

async function start() {
  try {
    assertEnv();
    await connectDB(env.MONGODB_URI);
    const server = app.listen(env.PORT, () => {
      console.log(`CasaCraft API running on http://localhost:${env.PORT} (${env.NODE_ENV})`);
    });

    // Close cleanly on Ctrl+C or when the host stops the app
    const shutdown = (signal) => {
      console.log(`${signal} received. Shutting down…`);
      server.close(async () => {
        await disconnectDB();
        process.exit(0);
      });
    };
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (err) {
    console.error(`Failed to start the server: ${err.message}`);
    process.exit(1);
  }
}

process.on('unhandledRejection', (err) => {
  console.error('Unhandled promise rejection:', err);
  process.exit(1);
});

start();
