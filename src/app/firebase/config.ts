import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  enableIndexedDbPersistence
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDNYwOF_b1ADVCCxfv2ma6nHqMRb0fmbUw",
  authDomain: "pepitobonitoagm.firebaseapp.com",
  projectId: "pepitobonitoagm",
  storageBucket: "pepitobonitoagm.firebasestorage.app",
  messagingSenderId: "969875819683",
  appId: "1:969875819683:web:50702cc1b98a23e7c28316"
};

// Firebase SÍ está configurado
const isFirebaseConfigured = true;

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// Persistencia offline
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Persistencia offline no disponible: múltiples pestañas');
  } else if (err.code === 'unimplemented') {
    console.warn('Persistencia offline no soportada');
  }
});

export { db, isFirebaseConfigured };