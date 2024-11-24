// firebase.js
import { initializeApp } from 'firebase/app';
import { 
    getAuth,
    connectAuthEmulator,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB1B36efN8ITmni-PfyVbvkJYkUXG5fSaw",
    authDomain: "papalote-qr.firebaseapp.com",
    projectId: "papalote-qr",
    storageBucket: "papalote-qr.firebasestorage.app",
    messagingSenderId: "947619263486",
    appId: "1:947619263486:web:24b3cd56128258b1d846af"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };