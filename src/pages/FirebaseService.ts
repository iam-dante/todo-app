import { initializeApp } from "firebase/app";
// import firebase from "firebase/app"
// import { getDatabase } from "firebase/database";

import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDkD_5v5QXKopsm9u2XSba2fwuqWYwb2sI",
  authDomain: "todo-app-e9b73.firebaseapp.com",
  projectId: "todo-app-e9b73",
  storageBucket: "todo-app-e9b73.appspot.com",
  messagingSenderId: "691195604472",
  appId: "1:691195604472:web:8ad7dbcdcf41cdf3a63a0d",
  measurementId: "G-VT2TQPE781",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const Firebaseauth = getAuth(app);


export const provider = new GoogleAuthProvider();
