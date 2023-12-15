// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASEAPI_KEY,
  authDomain: "sign-in-up-form-2b152.firebaseapp.com",
  projectId: "sign-in-up-form-2b152",
  storageBucket: "sign-in-up-form-2b152.appspot.com",
  messagingSenderId: "749546493872",
  appId: "1:749546493872:web:872ad2c28d618103cee875"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
