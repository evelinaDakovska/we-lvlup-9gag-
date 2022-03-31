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

window.fresh = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const memesRef = collection(db, "home");
  let docRef = query(memesRef, orderBy("timestamp", "desc"));
  showPosts(docRef, "freshPage");

  if (localStorage.getItem("user") !== "{}") {
    $("#showOnlyOwnPostsFresh").removeClass("hidden");
  }

  $("#showOnlyOwnPostsFresh").click(() => {
    document.getElementById("freshPage").innerText = "";
    if ($("#showOnlyOwnPostsFresh").text() === "Show my posts") {
      docRef = query(
        memesRef,
        orderBy("timestamp", "desc"),
        where("userID", "==", user.uid)
      );
      showPosts(docRef, "freshPage");
      $("#showOnlyOwnPostsFresh").text("Show all");
    } else {
      docRef = query(memesRef, orderBy("timestamp", "desc"));
      showPosts(docRef, "freshPage");
      $("#showOnlyOwnPostsFresh").text("Show my posts");
    }
  });
};
