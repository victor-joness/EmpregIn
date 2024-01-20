// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD8-76TY7-fzU1q7u8cblDt5r5lFRp7Ecg",
    authDomain: "empregin-c82cb.firebaseapp.com",
    projectId: "empregin-c82cb",
    storageBucket: "empregin-c82cb.appspot.com",
    messagingSenderId: "661966210636",
    appId: "1:661966210636:web:8949eba5f1d9bb5759d6e9"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
export { auth, app, firestore, storage };