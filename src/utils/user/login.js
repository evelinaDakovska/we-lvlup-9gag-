/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
// eslint-disable-next-line import/extensions
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";

import { auth, onSignIn } from "../../index.js";

import facebookLogin from "./loginFacebook.js";
import googleLogin from "./loginGoogle.js";

$("#signInFacebook").click(facebookLogin);
$("#signUpFacebook").click(facebookLogin);
$("#signInGoogle").click(googleLogin);
$("#signUpGoogle").click(googleLogin);

const emailField = document.getElementById("logEmail");
const passwordField = document.getElementById("logPassword");
const signInWithMail = document.getElementById("signinButton");

function signInWithEmailFunction() {
  const email = emailField.value;
  const password = passwordField.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      localStorage.setItem("user", userCredential.user);
      onSignIn();
    })
    .catch((error) => {
      console.error(error);
    });
}

signInWithMail.addEventListener("click", signInWithEmailFunction);
