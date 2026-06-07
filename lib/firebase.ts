import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLm... (copia la tua stringa intera)",
  authDomain: "eddiesantilloapp.firebaseapp.com",
  projectId: "eddiesantilloapp",
  storageBucket: "eddiesantilloapp.appspot.com",
  messagingSenderId: "1019037443128",
  appId: "1:1019037443128:web:85957edf2415a14afd72cd"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);