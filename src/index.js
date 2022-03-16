import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";

localStorage.setItem("user", "");
export let auth = getAuth();

import { signOutFunc } from "./utils/user/signOut.js";

export function onSignIn() {
  $("#loginModal").modal("hide");
  $("#registerModal").modal("hide");
  $("#loginModal").modal("hide");

  $("#loginButton").addClass("hidden");
  $("#regButton").addClass("hidden");

  $("#userBtns").removeClass("hidden");
}
