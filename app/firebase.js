import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCY7BFXSeF7VyVcWC1fIuBtoj2OJP4iMGE",
  authDomain: "deneme-d850a.firebaseapp.com",
  projectId: "deneme-d850a",
  storageBucket: "deneme-d850a.appspot.com",
  messagingSenderId: "791588001351",
  appId: "1:791588001351:web:9e0dcd72213808521ec362"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
