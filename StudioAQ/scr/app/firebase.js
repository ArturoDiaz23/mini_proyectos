// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
//import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEGSyIDYidVTxC0yqEFt8QnwOhiGORx_U",
  authDomain: "studioaq-efa0d.firebaseapp.com",
  projectId: "studioaq-efa0d",
  storageBucket: "studioaq-efa0d.firebasestorage.app",
  messagingSenderId: "1031068969246",
  appId: "1:1031068969246:web:0b84f77d68ae11b1fb810f",
  measurementId: "G-ZL2GPM6YZL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
//const analytics = getAnalytics(app);