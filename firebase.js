// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "Your Stuff",
    authDomain: "Your Stuff",
    projectId: "Your Stuff",
    storageBucket: "Your Stuff",
    messagingSenderId: "Your Stuff",
    appId: "Your Stuff"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);