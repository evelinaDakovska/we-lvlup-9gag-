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

export const auth = getAuth();

export function onSignIn() {
  $("#loginModal").modal("hide");
  $("#registerModal").modal("hide");
  $("#loginModal").modal("hide");
  userButtons();
  router.navigate("/");
}

function userButtons() {
  $("#loginButton").addClass("hidden");
  $("#regButton").addClass("hidden");

  $("#userBtns").removeClass("hidden");
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
/* const ava = await createAvatar(); */
document.getElementById("profileButton").appendChild(await createAvatar());
