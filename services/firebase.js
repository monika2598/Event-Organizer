import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDsb3A7lzlRgvV6sU10xwhzgcrwCFTYmwU",
    authDomain: "neww-42c29.firebaseapp.com",
    projectId: "neww-42c29",
    storageBucket: "neww-42c29.firebasestorage.app",
    messagingSenderId: "252961195467",
    appId: "1:252961195467:web:f6d58051cd0308b93fe24e",
    measurementId: "G-QR68TFWVTQ"
  };
  

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
