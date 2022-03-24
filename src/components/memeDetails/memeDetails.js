import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
import {
  ref,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-storage.js";
import { db, storage } from "../../utils/firebaseConfig.js";
import { likeUnlikeFunc } from "../../utils/managePostData/likeUnlikeFunc.js";
import { avatar } from "../../index.js";
import { showSingleMeme } from "../../utils/managePostData/showPosts.js";

window.memeDetails = async (memeID) => {
  const currentMemeId = memeID.id;
  const docRef = doc(db, "home", currentMemeId);
  const docSnap = await getDoc(docRef);

  showSingleMeme(docSnap, "memeDetailsContainer");

  document.getElementById("userAvatar").src = avatar;
};
