import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDILsiJ1iVeVZYrZXj3GbYDI2LTtChU02U",
    authDomain: "multiuser-todo-2e1ca.firebaseapp.com",
    projectId: "multiuser-todo-2e1ca",
    storageBucket: "multiuser-todo-2e1ca.appspot.com",
    messagingSenderId: "934158704653",
    appId: "1:934158704653:web:d8a20346fbe062e10eb544",
    measurementId: "G-NMJJF7G5TT"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);