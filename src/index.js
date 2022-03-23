/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
// eslint-disable-next-line import/extensions
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
import { db } from "./utils/firebaseConfig.js";

if (localStorage.getItem("user") !== "{}") {
  userButtons();
}

export const auth = getAuth();
export let avatar;

export function onSignIn() {
  $("#loginModal").modal("hide");
  $("#registerModal").modal("hide");
  $("#loginModal").modal("hide");
  userButtons();
  window.location.href = "/";
}

function userButtons() {
  $("#loginButton").addClass("hidden");
  $("#regButton").addClass("hidden");

  $("#userBtns").removeClass("hidden");
}

function generateAvatar(text, foregroundColor, backgroundColor) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = 30;
  canvas.height = 30;

  // Draw background
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw text
  context.font = "bold 10px Assistant";
  context.fillStyle = foregroundColor;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  return canvas.toDataURL("image/png");
}

if (localStorage.getItem("user") !== "{}") {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.uid;
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  const userName = docSnap.data().name.split(" ");
  const firstLetter = userName[0][0];
  const lastLetter = userName[1][0];

  document.getElementById("avatar").src = generateAvatar(
    `${firstLetter}${lastLetter}`,
    "white",
    "#005fcc"
  );
  avatar = generateAvatar(`${firstLetter}${lastLetter}`, "white", "#005fcc");
}
