import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCLmQNAgnbCgFYkZPpD5acUHKf_SLI1Es",
  authDomain: "eddiesantilloapp.firebaseapp.com",
  projectId: "eddiesantilloapp",
  storageBucket: "eddiesantilloapp.firebasestorage.app",
  messagingSenderId: "1019037443128",
  appId: "1:1019037443128:web:85957edf2415a14afd72cd"
};

// Inizializza Firebase
const app = initializeApp(firebaseConfig);

// Esporta i servizi che ti servono
export const db = getFirestore(app);
export const auth = getAuth(app);