import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

// ✅ Setup Auth avec AsyncStorage pour persister la session
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
