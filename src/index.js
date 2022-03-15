import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";

localStorage.setItem("user", "");
export let auth = getAuth();

import { signOutFunc } from "./utils/user/signOut.js";

export function onSignIn() {
  $("#loginModal").modal("hide");
  $("#registerModal").modal("hide");
  $("#loginModal").modal("hide");

  document.getElementById("loginButton").remove();
  document.getElementById("regButton").remove();

  let navBarPart = document.getElementById("login-signup");

  let profileButn = document.createElement("a");
  profileButn.setAttribute("id", "profileButton");
  profileButn.setAttribute("href", "/profile");
  profileButn.setAttribute("onclick", "route()");
  profileButn.innerText = "Profile";
  navBarPart.appendChild(profileButn);

  let signOut = document.createElement("a");
  signOut.setAttribute("id", "signOutButton");
  signOut.innerText = "Sign Out";
  signOut.addEventListener("click", signOutFunc);
  navBarPart.appendChild(signOut);
}
