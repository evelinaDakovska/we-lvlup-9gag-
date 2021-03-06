/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
// eslint-disable-next-line import/extensions
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
import { db } from "./utils/firebaseConfig.js";
import { router } from "./utils/navigoRouter.js";

if (!localStorage.getItem("user")) {
  localStorage.setItem("user", "{}");
}
if (localStorage.getItem("user") !== "{}") {
  userButtons();
}

$("#color-theme").click(() => {
  if (!$("body").hasClass("dark-theme")) {
    $("body").addClass("dark-theme");
    $("#sun").removeClass("hidden");
    $("#moon").addClass("hidden");
  } else {
    $("body").removeClass("dark-theme");
    $("#sun").addClass("hidden");
    $("#moon").removeClass("hidden");
  }
});

export const auth = getAuth();

export function onSignIn() {
  $("#loginModal").modal("hide");
  $("#registerModal").modal("hide");
  $("#loginModal").modal("hide");
  userButtons();
  router.navigate("/");
}

async function userButtons() {
  $("#loginButton").addClass("hidden");
  $("#regButton").addClass("hidden");

  $("#userBtns").removeClass("hidden");

  $("#profileButton").html("");
  $("#profileButton").append(await createAvatar());
}

export async function createAvatar() {
  const avatar = document.createElement("div");

  if (localStorage.getItem("user") !== "{}") {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.uid;
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    const userName = docSnap.data().name.split(" ");
    const firstLetter = userName[0][0];
    const lastLetter = userName[1][0];

    avatar.innerText = `${firstLetter}${lastLetter}`;
  }
  return avatar;
}
