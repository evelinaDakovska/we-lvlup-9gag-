/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import {
  collection,
  query,
  orderBy,
  where,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
import { db } from "../../utils/firebaseConfig.js";
import { showPosts } from "../../utils/managePostData/showPosts.js";

window.go = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const memesRef = collection(db, "home");
  let docRef = query(memesRef, orderBy("likesCount", "desc"));
  showPosts(docRef, "allMemes");

  $("#showOnlyOwnPosts").click(() => {
    document.getElementById("allMemes").innerText = "";
    if ($("#showOnlyOwnPosts").text() === "Show my posts") {
      docRef = query(
        memesRef,
        orderBy("likesCount", "desc"),
        where("userID", "==", user.uid)
      );
      showPosts(docRef, "allMemes");
      $("#showOnlyOwnPosts").text("Show all");
    } else {
      docRef = query(memesRef, orderBy("likesCount", "desc"));
      showPosts(docRef, "allMemes");
      $("#showOnlyOwnPosts").text("Show my posts");
    }
  });
};
