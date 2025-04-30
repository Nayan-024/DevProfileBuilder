import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAUVvyLvPqfVVw-8-5-x9naSwhHoCzj3t0",
  authDomain: "devprofile-builder.firebaseapp.com",
  projectId: "devprofile-builder",
  storageBucket: "devprofile-builder.firebasestorage.app",
  messagingSenderId: "172989189700",
  appId: "1:172989189700:web:67ee48d6b88801dc47b611",
  measurementId: "G-0YGM4RJP33"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };
