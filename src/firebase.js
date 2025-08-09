// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkC0A32wzDq1gVD3gOoIDj2LzO5Ufobyg",
  authDomain: "lets-see-first-fb-project.firebaseapp.com",
  projectId: "lets-see-first-fb-project",
  storageBucket: "lets-see-first-fb-project.firebasestorage.app",
  messagingSenderId: "903508044442",
  appId: "1:903508044442:web:58ddcf2d20619a85b9cd23",
  measurementId: "G-4X7ETC52DP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
