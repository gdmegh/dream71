
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBToN849udrajLB1LN8fWt75OCcVp4jcIs",
  authDomain: "megh-gallery.firebaseapp.com",
  projectId: "megh-gallery",
  storageBucket: "megh-gallery.appspot.com",
  messagingSenderId: "645292722370",
  appId: "1:645292722370:web:7641980429ab0e4e8b535b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
