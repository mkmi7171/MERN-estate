// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-827af.firebaseapp.com",
  projectId: "mern-estate-827af",
  storageBucket: "mern-estate-827af.appspot.com",
  messagingSenderId: "280792192497",
  appId: "1:280792192497:web:8b74e73eb87d5de1522050"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
