// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyC0j4ej0WcdWADuXQt-v_3mkDdUknFGZAA",
  authDomain: "new-firebase-702e8.firebaseapp.com",
  projectId: "new-firebase-702e8",
  storageBucket: "new-firebase-702e8.appspot.com",
  messagingSenderId: "1089511178815",
  appId: "1:1089511178815:web:6ab70753aeb8d8fc046e8a",
  measurementId: "G-C1BBVTPBXR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
// import { getAnalytics } from "firebase/analytics";
// const analytics = getAnalytics(app);
