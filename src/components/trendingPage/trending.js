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

window.trending = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const memesRef = collection(db, "home");
  let docRef = query(
    memesRef,
    where("likesCount", ">=", 1),
    orderBy("likesCount"),
    orderBy("timestamp", "desc")
  );
  showPosts(docRef, "trendingMemes");

  if (localStorage.getItem("user") !== "{}") {
    $("#showOnlyOwnPostsTrending").removeClass("hidden");
  }

  $("#showOnlyOwnPostsTrending").click(() => {
    $("#trendingMemes").html("");
    if ($("#showOnlyOwnPostsTrending").text() === "Show my posts") {
      docRef = query(
        memesRef,
        where("likesCount", ">", 1),
        orderBy("timestamp", "desc"),
        where("userID", "==", user.uid)
      );
      showPosts(docRef, "trendingMemes");
      $("#showOnlyOwnPostsTrending").text("Show all");
    } else {
      docRef = query(
        memesRef,
        where("likesCount", ">", 1),
        orderBy("timestamp", "desc")
      );
      showPosts(docRef, "trendingMemes");
      $("#showOnlyOwnPostsTrending").text("Show my posts");
    }
  });
};
