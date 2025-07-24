// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "FIREBASE_API_KEY",
  authDomain: "dream71.firebaseapp.com",
  projectId: "dream71",
  storageBucket: "dream71.appspot.com",
  messagingSenderId: "47285641151",
  appId: "1:47285641151:web:2120e55722421297e64177"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
