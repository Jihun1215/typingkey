import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_TEST_API_KEY,
  authDomain: import.meta.env.VITE_TEST_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_TEST_PROJECT_ID,
  storageBucket: import.meta.env.VITE_TEST_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_TEST_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_TEST_API_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // 추가된 부분
const firestore = getFirestore(app);

export { auth, firestore };
