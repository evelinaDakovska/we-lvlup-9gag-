/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyB_Wv28yBKGVSO3hVXzNtvUs6nJ3plw0Gw",
  authDomain: "gag-clone-78890.firebaseapp.com",
  projectId: "gag-clone-78890",
  messagingSenderId: "317040464210",
  appId: "1:317040464210:web:9edeabffcf78e5942e2a8b",
  measurementId: "G-NQJK277K5J",
  storageBucket: "gs://gag-clone-78890.appspot.com/",
};

const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const storage = getStorage(app);
