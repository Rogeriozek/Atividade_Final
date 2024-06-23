
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Substitua isso com suas próprias configurações do Firebase
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
const firestore = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
const signOut = () => firebaseSignOut(auth);

export { auth, firestore, signInWithGoogle, signOut };

