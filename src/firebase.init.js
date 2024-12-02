// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUZXvukzZc7uHg4onIk87JGXFXpKa6bzI",
  authDomain: "email-password-auth-cf237.firebaseapp.com",
  projectId: "email-password-auth-cf237",
  storageBucket: "email-password-auth-cf237.firebasestorage.app",
  messagingSenderId: "821678243841",
  appId: "1:821678243841:web:cea5dc9d6071814b2d0000"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);