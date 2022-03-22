/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
import {
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
import { db } from "../firebaseConfig.js";

export async function likeFunc(memeID) {
  const memeRef = doc(db, "home", memeID);
  const getMeme = await getDoc(memeRef);
  const memeData = getMeme.data();
  const memeCreator = memeData.userID;
  const likesArray = memeData.likes;

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = currentUser.uid;

  if (memeCreator === currentUserId) {
    return;
  }

  let countLikes = memeData.likesCount;
  const memeLikes = memeData.likes;

  if (likesArray.includes(currentUserId)) {
    memeLikes.splice(memeLikes.indexOf(currentUserId), 1);
    countLikes--;
  } else {
    memeLikes.push(currentUserId);
    countLikes++;
  }

  await updateDoc(memeRef, {
    likes: memeLikes,
    likesCount: countLikes,
  });
}
