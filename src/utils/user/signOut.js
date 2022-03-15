import { signOut } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
import { auth } from "../../index.js";

export function signOutFunc() {
  signOut(auth)
    .then(() => {
      localStorage.setItem("user", '');
      document.getElementById("signOutButton").remove();
      document.getElementById("profileButton").remove();

      let navBarPart = document.getElementById("login-signup");

      let loginButton = document.createElement("a");
      loginButton.setAttribute("id", "loginButton");
      loginButton.setAttribute("data-bs-toggle", "modal");
      loginButton.setAttribute("data-bs-target", "#loginModal");
      loginButton.innerText = "Log in";
      navBarPart.appendChild(loginButton);

      let regButton = document.createElement("a");
      regButton.setAttribute("id", "regButton");
      regButton.setAttribute("data-bs-toggle", "modal");
      regButton.setAttribute("data-bs-target", "#registerModal");
      regButton.innerText = "Sign up";
      navBarPart.appendChild(regButton);
    })
    .catch((error) => {
      console.log(error);
    });
}
