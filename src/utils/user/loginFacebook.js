/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import {
  signInWithPopup,
  FacebookAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";

import { auth, onSignIn } from "../../index.js";

function facebookLogin() {
  const provider = new FacebookAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      localStorage.setItem("user", result.user);
      const credential = FacebookAuthProvider.credentialFromResult(result);

      const accessToken = credential.accessToken;
      onSignIn();
    })
    .catch((error) => {
      console.log(error);
    });
}

export default facebookLogin;
