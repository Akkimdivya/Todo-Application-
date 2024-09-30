// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9dTtF-TdaCJI4P6OmVi0mTsOlaqd5egc",
  authDomain: "task-86654.firebaseapp.com",
  projectId: "task-86654",
  storageBucket: "task-86654.appspot.com",
  messagingSenderId: "615922758377",
  appId: "1:615922758377:web:979d9a2405aca1c2fa7678",
  measurementId: "G-55X72LYVTS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;