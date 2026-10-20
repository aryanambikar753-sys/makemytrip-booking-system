import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGfnNYFjrwNiOQVnZqyv1c9Y0jioxM2OQ",
  authDomain: "makemytrip-43bc7.firebaseapp.com",
  projectId: "makemytrip-43bc7",
  storageBucket: "makemytrip-43bc7.firebasestorage.app",
  messagingSenderId: "13593939738",
  appId: "1:13593939738:web:dbe276c27028a64ee7e6a3",
  measurementId: "G-Y0CRLJ739L"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;