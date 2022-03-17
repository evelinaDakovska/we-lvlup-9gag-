/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import {
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";

import { auth, onSignIn } from "../../index.js";

function googleLogin() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // eslint-disable-next-line no-unused-vars
      const token = credential.accessToken;
      localStorage.setItem("user", result.user);
      onSignIn();
    })
    .catch((error) => {
      console.log(error);
    });
}

export default googleLogin;
