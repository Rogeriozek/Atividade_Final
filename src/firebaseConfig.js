import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyARubxLn40ZRN4KZ-e7T_9VQ79PHSJ1tvY",
    authDomain: "estude-mais-f948a.firebaseapp.com",
    projectId: "estude-mais-f948a",
    storageBucket: "estude-mais-f948a.appspot.com",
    messagingSenderId: "754218181077",
    appId: "1:754218181077:web:dda4e69cca3712c63cdd5c",
    measurementId: "G-H3ZZJE2NSY"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
