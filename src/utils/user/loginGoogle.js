/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import {
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
import {
  doc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
import { db } from "../firebaseConfig.js";

import { auth, onSignIn } from "../../index.js";

function googleLogin() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // eslint-disable-next-line no-unused-vars
      const token = credential.accessToken;
      localStorage.setItem("user", JSON.stringify(result.user));

      const userID = result.user.uid;
      const fName = result.user.displayName;
      const userRef = doc(db, "users", userID);
      const docSnap = await getDoc(userRef);
      if (!docSnap.exists()) {
        await setDoc(userRef, {
          name: fName,
          like: 0,
          comments: 0,
        });
      }

      onSignIn();
    })
    .catch((error) => {
      alert(error.code);
    });
}

export default googleLogin;
