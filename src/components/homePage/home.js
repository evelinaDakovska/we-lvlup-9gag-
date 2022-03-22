/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import {
  collection,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
import { db } from "../../utils/firebaseConfig.js";
import { showPosts } from "../../utils/managePostData/showPosts.js";

window.go = async () => {
  const memesRef = collection(db, "home");
  const docRef = query(memesRef, orderBy("likesCount", "desc"));
  showPosts(docRef, "allMemes");
};
