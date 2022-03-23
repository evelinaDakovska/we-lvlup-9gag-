/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
import {
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
import { db } from "../firebaseConfig.js";

export async function likeUnlikeFunc(
  memeID,
  action,
  likeBtn,
  unLikeBtn,
  likeCount,
  unLikeCount
) {
  const memeRef = doc(db, "home", memeID);
  const getMeme = await getDoc(memeRef);
  const memeData = getMeme.data();
  const memeCreator = memeData.userID;

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = currentUser.uid;

  if (memeCreator === currentUserId || !currentUserId) {
    return;
  }

  let currentTargetArr;
  let currentTargetCount;
  let currentButton;
  let currentCountDiv;
  let otherTargetArr;
  let otherTargetCount;
  let otherButton;
  let otherCountDiv;

  if (action === "like") {
    currentTargetArr = memeData.likes;
    currentTargetCount = memeData.likesCount;
    currentButton = likeBtn;
    currentCountDiv = likeCount;
    otherTargetArr = memeData.unlikes;
    otherTargetCount = memeData.unlikesCount;
    otherButton = unLikeBtn;
    otherCountDiv = unLikeCount;
  } else {
    currentTargetArr = memeData.unlikes;
    currentTargetCount = memeData.unlikesCount;
    currentButton = unLikeBtn;
    currentCountDiv = unLikeCount;
    otherTargetArr = memeData.likes;
    otherTargetCount = memeData.likesCount;
    otherButton = likeBtn;
    otherCountDiv = likeCount;
  }

  if (currentTargetArr.includes(currentUserId)) {
    currentTargetArr.splice(currentTargetArr.indexOf(currentUserId), 1);
    currentTargetCount--;
    currentButton.classList.remove("activeLikeBtn");
  } else {
    currentTargetArr.push(currentUserId);
    currentTargetCount++;
    currentButton.classList.add("activeLikeBtn");
  }
  currentCountDiv.innerHTML = currentTargetCount;

  if (otherTargetArr.includes(currentUserId)) {
    otherTargetArr.splice(otherTargetArr.indexOf(currentUserId), 1);
    otherTargetCount--;
    otherButton.classList.remove("activeLikeBtn");
    otherCountDiv.innerHTML = otherTargetCount;
  }

  if (action === "like") {
    await updateDoc(memeRef, {
      likes: currentTargetArr,
      likesCount: currentTargetCount,
      unlikes: otherTargetArr,
      unlikesCount: otherTargetCount,
    });
  } else {
    await updateDoc(memeRef, {
      likes: otherTargetArr,
      likesCount: otherTargetCount,
      unlikes: currentTargetArr,
      unlikesCount: currentTargetCount,
    });
  }
}
