import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZE6BZ-fwmrpRpDB2PzcXyZVHzO2Bzkxs",
  authDomain: "bust-a-move.firebaseapp.com",
  projectId: "bust-a-move",
  storageBucket: "bust-a-move.firebasestorage.app",
  messagingSenderId: "959038606401",
  appId: "1:959038606401:web:23de2ae7af17bc0e704ac0",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
