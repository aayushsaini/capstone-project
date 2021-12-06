// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDhnIg1jtd3vKEhX02yLG4ZpcKmL6h4jLE",
  authDomain: "mygarden-ai.firebaseapp.com",
  projectId: "mygarden-ai",
  storageBucket: "mygarden-ai.appspot.com",
  messagingSenderId: "572116285717",
  appId: "1:572116285717:web:0b8937e4c5bb3093b2911c",
  measurementId: "G-04VVK4ZRVT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const authentication = getAuth(app);