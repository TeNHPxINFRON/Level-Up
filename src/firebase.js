import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyBQTTq6CzO8CBzC3V0GCNBdUqRf0yCOFzw", 

  authDomain: "levelup-2eda8.firebaseapp.com",

  projectId: "levelup-2eda8",

  storageBucket: "levelup-2eda8.firebasestorage.app",

  messagingSenderId: "168746730",

  appId: "1:168746730:web:5c8934a25ac58767b78193",
};

const app =
  initializeApp(firebaseConfig);

export const auth =
  getAuth(app);

export const db =
  getFirestore(app);