import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBNbWZQFsvkMPXnAhRH45vPuc8ollenwLA",
  authDomain: "oquv-96fb4.firebaseapp.com",
  projectId: "oquv-96fb4",
  storageBucket: "oquv-96fb4.appspot.com",
  messagingSenderId: "545232997543",
  appId: "1:545232997543:web:e40ea972e9963924f95f82",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};
