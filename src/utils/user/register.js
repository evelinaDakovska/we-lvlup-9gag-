/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";

import { auth, onSignIn } from "../../index.js";

function signUpWithEmail() {
  const fullName = document.getElementById("fullName");
  const emailField = document.getElementById("email");
  const passwordField = document.getElementById("regPassword");
  const greeting = document.getElementById("greeting");

  const signUpFunction = () => {
    const email = emailField.value;
    // eslint-disable-next-line no-unused-vars
    const fName = fullName.value;
    const password = passwordField.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Signed Up Successfully !");
        localStorage.setItem("user", userCredential.user);
        document.getElementById("regWithEmail").classList.add("hidden");
        greeting.classList.remove("hidden");
        onSignIn();
        setTimeout(() => {
          // eslint-disable-next-line no-undef
          $("#registerModal").modal("hide");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  document.getElementById("signUp").addEventListener("click", signUpFunction);
}

function classChange() {
  const emailElement = document.getElementById("regWithEmail");
  emailElement.classList.remove("hidden");
  const appElement = document.getElementById("logApplications");
  appElement.classList.add("hidden");
  signUpWithEmail();
}

document.getElementById("signUpEmail").addEventListener("click", classChange);
