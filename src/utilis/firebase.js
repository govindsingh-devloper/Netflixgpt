import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA97qGDKE5A_AhwyEavb6W1Xk8bx_nFkPY",
  authDomain: "flixgpt-1f63b.firebaseapp.com",
  projectId: "flixgpt-1f63b",
  storageBucket: "flixgpt-1f63b.firebasestorage.app",
  messagingSenderId: "426388294942",
  appId: "1:426388294942:web:ddff1fa775e628e5fe4d0f",
  measurementId: "G-1XR8RLE2FT"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();