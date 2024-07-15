// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUe05HuIDEvC_PLCh9WOA2hiCC5igYtVI",
  authDomain: "student-teacher-appointment001.firebaseapp.com",
  projectId: "student-teacher-appointment001",
  storageBucket: "student-teacher-appointment001.appspot.com",
  messagingSenderId: "134186646602",
  appId: "1:134186646602:web:3c5d5f9f45286a390a7ab3",
  measurementId: "G-QETZ1H1R3Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);