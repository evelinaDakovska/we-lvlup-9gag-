import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";

import { db } from "../../utils/firebaseConfig.js";
import { avatar } from "../../index.js";
import { showSingleMeme } from "../../utils/managePostData/showPosts.js";

window.memeDetails = async (memeID) => {
  const currentMemeId = memeID.id;
  const docRef = doc(db, "home", currentMemeId);
  const docSnap = await getDoc(docRef);

  showSingleMeme(docSnap, "memeDetailsContainer");

  document.getElementById("userAvatar").appendChild(avatar);
  const currentComment = document.getElementById("currentComment");

  document.getElementById("cancelComemntBtn").addEventListener("click", () => {
    currentComment.value = "";
  });
};
