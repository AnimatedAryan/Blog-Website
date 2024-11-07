// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-a7d77.firebaseapp.com",
  projectId: "mern-blog-a7d77",
  storageBucket: "mern-blog-a7d77.firebasestorage.app",
  messagingSenderId: "1035832838858",
  appId: "1:1035832838858:web:abc2e5dbe76229c9a08233"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);