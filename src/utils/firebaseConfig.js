/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-storage.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB_Wv28yBKGVSO3hVXzNtvUs6nJ3plw0Gw",
  authDomain: "gag-clone-78890.firebaseapp.com",
  databaseURL:
    "https://gag-clone-78890-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gag-clone-78890",
  storageBucket: "gag-clone-78890.appspot.com",
  messagingSenderId: "317040464210",
  appId: "1:317040464210:web:9edeabffcf78e5942e2a8b",
  measurementId: "G-NQJK277K5J",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore();
