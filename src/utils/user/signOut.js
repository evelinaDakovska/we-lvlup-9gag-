import { signOut } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
import { auth } from "../../index.js";

export function signOutFunc() {
  signOut(auth)
    .then(() => {
      localStorage.setItem("user", "");

      $("#userBtns").addClass("hidden");

      $("#loginButton").removeClass("hidden");
      $("#regButton").removeClass("hidden");
    })
    .catch((error) => {
      console.log(error);
    });
}

$("#signOutButton").click(signOutFunc);
