import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Konfigurasi Firebase dari Firebase Console InfoUMKM
export const firebaseConfig = {
  apiKey: "AIzaSyAf473uU00ja6BK--JfmSNDBjjs4x3QsfQ",
  authDomain: "info-umkm.firebaseapp.com",
  databaseURL: "https://info-umkm-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "info-umkm",
  storageBucket: "info-umkm.firebasestorage.app",
  messagingSenderId: "24196986761",
  appId: "1:24196986761:web:b4b80755e8b796406d1358",
  measurementId: "G-1Y54QB9BJ0"
};

// Inisialisasi Firebase App
export const app = initializeApp(firebaseConfig);

// Inisialisasi Firebase Realtime Database
export const rtdb = getDatabase(app, firebaseConfig.databaseURL);
export const db = null;

export default app;
