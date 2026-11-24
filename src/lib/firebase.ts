import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzBh45MSdAdCLADcGDjkhgL372KS4iEdY",
  authDomain: "codequest-19163.firebaseapp.com",
  projectId: "codequest-19163",
  storageBucket: "codequest-19163.firebasestorage.app",
  messagingSenderId: "558634723793",
  appId: "1:558634723793:web:e3354dc149b6f88fd4d8f0",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);