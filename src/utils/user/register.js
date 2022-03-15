import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";

import { auth, onSignIn } from "../../index.js";

document.getElementById("signUpEmail").addEventListener("click", classChange);
function classChange() {
  let emailElement = document.getElementById("regWithEmail");
  emailElement.classList.remove("hidden");
  let appElement = document.getElementById("logApplications");
  appElement.classList.add("hidden");
  signUpWithEmail();
}

function signUpWithEmail() {
  const fullName = document.getElementById("fullName");
  const emailField = document.getElementById("email");
  const passwordField = document.getElementById("regPassword");
  const greeting = document.getElementById("greeting");

  const signUpFunction = () => {
    const email = emailField.value;
    const fName = fullName.value;
    const password = passwordField.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Signed Up Successfully !");
        localStorage.setItem("user", userCredential.user);
        document.getElementById("regWithEmail").classList.add("hidden");
        greeting.classList.remove("hidden");
        onSignIn();
        setTimeout(function () {
          $("#registerModal").modal("hide");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  document.getElementById("signUp").addEventListener("click", signUpFunction);
}
