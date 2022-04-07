/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import {
  collection,
  query,
  where,
  getDoc,
  doc,
  orderBy,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
import { db } from "../../utils/firebaseConfig.js";
import { showPosts } from "../../utils/managePostData/showPosts.js";
import { createAvatar } from "../../index.js";

window.profile = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const memesRef = collection(db, "home");
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data();

  $("#profileAvatar").append(await createAvatar());

  $("#userNameTitle").text(userData.name);
  $("#totalLikes").text(`Total likes: ${userData.like}`);
  $("#totalComments").text(`Total comments: ${userData.comments}`);

  const docRef = query(
    memesRef,
    where("userID", "==", user.uid),
    orderBy("timestamp", "desc")
  );
  showPosts(docRef, "profilePage");
};
