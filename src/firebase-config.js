import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvlkuOaM3rCf6JMhd9fVstnwM0LPzeh1s",
  authDomain: "fir-tutorial-c5d7d.firebaseapp.com",
  projectId: "fir-tutorial-c5d7d",
  storageBucket: "fir-tutorial-c5d7d.firebasestorage.app",
  messagingSenderId: "983717108107",
  appId: "1:983717108107:web:c68200921970de4b70f78e",
  measurementId: "G-2D7FK2VL34"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);  