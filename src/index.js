import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-analytics.js";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB_Wv28yBKGVSO3hVXzNtvUs6nJ3plw0Gw",
  authDomain: "gag-clone-78890.firebaseapp.com",
  projectId: "gag-clone-78890",
  storageBucket: "gag-clone-78890.appspot.com",
  messagingSenderId: "317040464210",
  appId: "1:317040464210:web:9edeabffcf78e5942e2a8b",
  measurementId: "G-NQJK277K5J",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log("clicked");
      console.log("Welcome " + user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      console.log(email);
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
};
$("#buttonSignInGoogle").click(signInWithGoogle);
