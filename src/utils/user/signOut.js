/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { signOut } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
import { auth } from "../../index.js";
import { router } from "../navigoRouter.js";

export default function signOutFunc() {
  signOut(auth)
    .then(() => {
      localStorage.setItem("user", "{}");

      $("#userBtns").addClass("hidden");

      $("#loginButton").removeClass("hidden");
      $("#regButton").removeClass("hidden");
      router.navigate("/fresh");
    })
    .catch(() => {});
}

$("#signOutButton").click(signOutFunc);
