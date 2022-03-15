import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";

document.getElementById("signUpEmail").addEventListener("click", classChange);
function classChange() {
  let appElement = document.getElementById("logApplications");
  appElement.classList.add("hidden");
  let emailElement = document.getElementById("regWithEmail");
  emailElement.classList.remove("hidden");
  signUpWithEmail();
}

function signUpWithEmail() {
  const fullName = document.getElementById("fullName");
  const emailField = document.getElementById("email");
  const passwordField = document.getElementById("password");
  const greeting = document.getElementById("greeting");
  const auth = getAuth();

  const signUpFunction = () => {
    const email = emailField.value;
    const fName = fullName.value;
    const password = passwordField.value;

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("Signed Up Successfully !");
        user = userCredential.user;
        document.getElementsByClassName("login-signup").classList.add("hidden");
        document
          .getElementsByClassName("greet-user")
          .classList.remove("hidden");
      })
      .catch((error) => {
        console.error(error);
      });
    greeting.classList.remove("hidden");
    document.getElementById("regWithEmail").classList.add("hidden");
  };
  document
    .getElementById("regWithEmail")
    .addEventListener("submit", signUpFunction);
}
