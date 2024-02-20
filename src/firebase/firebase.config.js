// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import the Firestore functions
import { getAuth } from "firebase/auth"; // Import the Authentication module

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1_sx3nOqAeyG3yC1RytomN9X2tBfymPY",
  authDomain: "vshproj.firebaseapp.com",
  projectId: "vshproj",
  storageBucket: "vshproj.appspot.com",
  messagingSenderId: "474468473072",
  appId: "1:474468473072:web:820ca6f2bb121f69934a35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export {app,firestore,auth};