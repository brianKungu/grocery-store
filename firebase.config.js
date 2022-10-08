// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAomuW_b_cIXw_NOu3qnw_6DbNBc2DUG-Y",
  authDomain: "deli-grocery-79f97.firebaseapp.com",
  databaseURL: "https://deli-grocery-79f97-default-rtdb.firebaseio.com",
  projectId: "deli-grocery-79f97",
  storageBucket: "deli-grocery-79f97.appspot.com",
  messagingSenderId: "334788522269",
  appId: "1:334788522269:web:04d1414e0d5b00da0631f4",
  measurementId: "G-J7SDW756H4",
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
