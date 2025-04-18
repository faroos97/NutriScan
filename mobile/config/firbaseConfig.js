// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDkdtgZYzOVeTQZjkO1W1CAmVdT7Iisi2E",
  authDomain: "nutriscan-4f733.firebaseapp.com",
  projectId: "nutriscan-4f733",
  storageBucket: "nutriscan-4f733.appspot.com",
  messagingSenderId: "527766458835",
  appId: "1:527766458835:web:fb169405c9c9c16610df26",
  measurementId: "G-3791Q29DSP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);