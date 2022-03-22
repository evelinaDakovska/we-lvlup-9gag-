/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
// eslint-disable-next-line import/extensions
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";

if (!localStorage.getItem("user")) {
  localStorage.setItem("user", "");
} else {
  userButtons();
}

export const auth = getAuth();

export function onSignIn() {
  $("#loginModal").modal("hide");
  $("#registerModal").modal("hide");
  $("#loginModal").modal("hide");

  userButtons();
}

function userButtons() {
  $("#loginButton").addClass("hidden");
  $("#regButton").addClass("hidden");

  $("#userBtns").removeClass("hidden");
}
