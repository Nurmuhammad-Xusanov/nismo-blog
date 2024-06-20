// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBK_2jNyJYdxnyFb8ah061vRD_hxPDVO0M",
  authDomain: "nismo-blog.firebaseapp.com",
  projectId: "nismo-blog",
  storageBucket: "nismo-blog.appspot.com",
  messagingSenderId: "226769062491",
  appId: "1:226769062491:web:7774356fac1fb5e70f8d7e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(app);

export { db, app, auth, googleProvider, storage };
