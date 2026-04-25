import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, connectAuthEmulator } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'dummy_api_key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'dummy_auth_domain',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'dummy_project_id',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'dummy_storage_bucket',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'dummy_sender_id',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || 'dummy_app_id'
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

if (import.meta.env.DEV) {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099');
}

export const googleProvider = new GoogleAuthProvider();
