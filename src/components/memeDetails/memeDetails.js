import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";

import { db } from "../../utils/firebaseConfig.js";
import { avatar } from "../../index.js";
import { showSingleMeme } from "../../utils/managePostData/showPosts.js";

window.memeDetails = async (memeID) => {
  const currentMemeId = memeID.id;
  const docRef = doc(db, "home", currentMemeId);
  const docSnap = await getDoc(docRef);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.uid;

  showSingleMeme(docSnap, "memeDetailsContainer");
  document
    .getElementsByClassName("memeTitle")[0]
    .setAttribute("style", "pointer-events: none;");

  showPostComments(currentMemeId);

  document.getElementById("userAvatar").appendChild(avatar);
  const currentComment = document.getElementById("currentComment");

  document.getElementById("cancelComemntBtn").addEventListener("click", () => {
    currentComment.value = "";
  });

  document
    .getElementById("postCommentBtn")
    .addEventListener("click", async () => {
      const commentValue = currentComment.value;
      if (!commentValue) {
        alert("You cant post empty comment");
        return;
      }
      const docData = {
        comment: commentValue,
        postID: currentMemeId,
        userID: userId,
        timestamp: serverTimestamp(),
        likes: [],
        likesCount: 0,
        unlikes: [],
        unlikesCount: 0,
      };
      await addDoc(collection(db, "comments"), docData);
      currentComment.value = "";
    });
};

async function showPostComments(currentMemeId) {
  const commentsRef = collection(db, "comments");
  const docRef = query(commentsRef, where("postID", "==", currentMemeId));
  const querySnapshot = await getDocs(docRef);
  querySnapshot.forEach(async (current) => {
    const currentCom = current.data();
    const docSnap = await getDoc(doc(db, "users", currentCom.userID));
    const userName = docSnap.data().name;

    const currentCommentContainer = document.createElement("div");
    currentCommentContainer.className = "currentCommentContainer";

    const userNameContainer = document.createElement("span");
    userNameContainer.className = "userNameContainer";
    userNameContainer.innerText = userName;
    currentCommentContainer.appendChild(userNameContainer);

    const commentValue = document.createElement("div");
    commentValue.className = "commentValue";
    commentValue.innerText = currentCom.comment;
    currentCommentContainer.appendChild(commentValue);

    const commentButtons = document.createElement("div");
    commentButtons.className = "commentButtons";

    const replyButton = document.createElement("a");
    replyButton.innerText = "Reply";
    replyButton.className = "replyButton";
    commentButtons.appendChild(replyButton);

    const likeBtn = document.createElement("div");
    likeBtn.className = "upVoteBtn sectionBtns";
    likeBtn.innerHTML = `<i class="fa-solid fa-arrow-up fa-lg"></i>`;
    commentButtons.appendChild(likeBtn);

    const unLikeBtn = document.createElement("div");
    unLikeBtn.className = "downVoteBtn sectionBtns";
    unLikeBtn.innerHTML = `<i class="fa-solid fa-arrow-down fa-lg"></i>`;
    commentButtons.appendChild(unLikeBtn);

    const likeCount = document.createElement("div");
    likeCount.innerHTML = currentCom.likesCount;
    likeBtn.appendChild(likeCount);

    const unLikeCount = document.createElement("div");
    unLikeCount.innerHTML = currentCom.unlikesCount;
    unLikeBtn.appendChild(unLikeCount);

    currentCommentContainer.appendChild(commentButtons);

    document
      .getElementById("memeCommentsContainer")
      .appendChild(currentCommentContainer);
  });
}
