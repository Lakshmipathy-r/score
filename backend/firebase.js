import admin from 'firebase-admin';

// B-12: Warn at startup if Firebase credentials env var is missing.
// Set GOOGLE_APPLICATION_CREDENTIALS to the path of your serviceAccountKey.json file.
if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.warn(
    '[WARN] GOOGLE_APPLICATION_CREDENTIALS is not set. ' +
    'Firebase Admin SDK will fail to initialize properly in production. ' +
    'Set this env var to your serviceAccountKey.json path.'
  );
}

if (!admin.apps.length) {
  admin.initializeApp();
}

export default admin;