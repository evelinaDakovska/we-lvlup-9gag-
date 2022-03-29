/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
import {
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";

import { auth, onSignIn } from "../../index.js";
import { db } from "../firebaseConfig.js";

async function signUpWithEmail() {
  const fullName = document.getElementById("fullName");
  const emailField = document.getElementById("email");
  const passwordField = document.getElementById("regPassword");
  const greeting = document.getElementById("greeting");

  const signUpFunction = () => {
    const email = emailField.value;
    // eslint-disable-next-line no-unused-vars
    const password = passwordField.value;
    const fName = fullName.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        localStorage.setItem("user", JSON.stringify(userCredential.user));
        document.getElementById("regWithEmail").classList.add("hidden");
        greeting.classList.remove("hidden");
        const userID = userCredential.user.uid;
        await setDoc(doc(db, "users", userID), {
          name: fName,
          like: 0,
          comments: 0,
        });
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

/* async function setName(name) {
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user.uid;

  await setDoc(doc(db, "users", name), {
    userID: name,
  });
} */

function classChange() {
  const emailElement = document.getElementById("regWithEmail");
  emailElement.classList.remove("hidden");
  const appElement = document.getElementById("logApplications");
  appElement.classList.add("hidden");
  signUpWithEmail();
}

document.getElementById("signUpEmail").addEventListener("click", classChange);
