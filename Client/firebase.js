import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

/*________________________________________________________________________________*/

const firebaseConfig = {
  apiKey: "AIzaSyD8-76TY7-fzU1q7u8cblDt5r5lFRp7Ecg",
  authDomain: "empregin-c82cb.firebaseapp.com",
  projectId: "empregin-c82cb",
  storageBucket: "empregin-c82cb.appspot.com",
  messagingSenderId: "661966210636",
  appId: "1:661966210636:web:8949eba5f1d9bb5759d6e9",
  measurementId: "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();

/*________________________________________________________________________________*/
