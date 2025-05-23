
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Log environment variables to help debug
// These logs will appear in your BROWSER's developer console, not the server terminal.
console.log('Attempting to load Firebase config...');
console.log('NEXT_PUBLIC_FIREBASE_API_KEY loaded:', process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'Yes' : 'NO - THIS IS THE PROBLEM!');
console.log('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN loaded:', process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? 'Yes' : 'No');
console.log('NEXT_PUBLIC_FIREBASE_PROJECT_ID loaded:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? 'Yes' : 'No');

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);

export { app, auth };
