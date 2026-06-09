import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCLmQnAGNbCgFYKzPPd5aCnUHKf_SlI1Es",
  authDomain: "eddiesantilloapp.firebaseapp.com",
  projectId: "eddiesantilloapp",
  storageBucket: "eddiesantilloapp.firebasestorage.app",
  messagingSenderId: "1019037443128",
  appId: "1:1019037443128:web:85957edf2415a14afd72cd"
};

// Inizializza Firebase solo nel browser
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);