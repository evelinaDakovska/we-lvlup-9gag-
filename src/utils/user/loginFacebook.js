import {
  signInWithPopup,
  FacebookAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";

function facebookLogin() {
  const provider = new FacebookAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;

      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;

      $(location).prop("href", "http://127.0.0.1:5500");
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);

      // ...
    });
}

export default facebookLogin;
