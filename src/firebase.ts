// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY || '',
  authDomain: import.meta.env.VITE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_APP_ID || '',
};

// 환경 변수 로드 확인
const missingEnvVars = Object.entries(firebaseConfig)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingEnvVars.length > 0) {
  console.error('Missing Firebase configuration:', missingEnvVars);
  console.log('Firebase Config state:', {
    apiKey: firebaseConfig.apiKey ? '✓ loaded' : '✗ MISSING',
    authDomain: firebaseConfig.authDomain ? '✓ loaded' : '✗ MISSING',
    projectId: firebaseConfig.projectId ? '✓ loaded' : '✗ MISSING',
    storageBucket: firebaseConfig.storageBucket ? '✓ loaded' : '✗ MISSING',
    messagingSenderId: firebaseConfig.messagingSenderId ? '✓ loaded' : '✗ MISSING',
    appId: firebaseConfig.appId ? '✓ loaded' : '✗ MISSING',
  });
} else {
  console.log('Firebase Config loaded successfully ✓');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
