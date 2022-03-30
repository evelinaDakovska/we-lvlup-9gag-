/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import {
  signInWithPopup,
  FacebookAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
import {
  doc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
import { db } from "../firebaseConfig.js";

import { auth, onSignIn } from "../../index.js";

function facebookLogin() {
  const provider = new FacebookAuthProvider();

  signInWithPopup(auth, provider)
    .then(async (result) => {
      localStorage.setItem("user", JSON.stringify(result.user));

      const credential = FacebookAuthProvider.credentialFromResult(result);

      const accessToken = credential.accessToken;

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

export default facebookLogin;
