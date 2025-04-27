// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCw6N6YhWVZc8hFint449UVnx1onEurbxs",
  authDomain: "bus-track-971dc.firebaseapp.com",
  projectId: "bus-track-971dc",
  storageBucket: "bus-track-971dc.firebasestorage.app",
  messagingSenderId: "268454715408",
  appId: "1:268454715408:web:f4d8408e849e81648c6a95",
  measurementId: "G-38TWWEZ5XP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);