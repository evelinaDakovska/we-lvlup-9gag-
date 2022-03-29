import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  deleteDoc,
  orderBy,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";

import { db } from "../../utils/firebaseConfig.js";
import { avatar } from "../../index.js";
import { showSingleMeme } from "../../utils/managePostData/showPosts.js";

window.memeDetails = async (data) => {
  let memeInfo = data.id.split("+");
  let memeID = memeInfo[0];
  let memeOwnerID = memeInfo[1];
  const currentMemeId = memeID;
  const docRef = doc(db, "home", currentMemeId);
  const docSnap = await getDoc(docRef);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.uid;

  showSingleMeme(docSnap, "memeDetailsContainer");
  document
    .getElementsByClassName("memeTitle")[0]
    .setAttribute("style", "pointer-events: none;");
  document.getElementById("userAvatar").appendChild(avatar);
  const currentComment = document.getElementById("currentComment");

  showAllComments(currentMemeId);

  document.getElementById("cancelComemntBtn").addEventListener("click", () => {
    currentComment.value = "";
  });

  document
    .getElementById("postCommentBtn")
    .addEventListener("click", async () => {
      postCommentFunction(currentComment, currentMemeId, userId);
      currentComment.value = "";
      showAllComments(currentMemeId);
      addCommentCountToMeme("add", currentMemeId);
      addCommentCountToUser("add", memeOwnerID);
    });
};

async function showAllComments(currentMemeId) {
  document.getElementById("memeCommentsContainer").innerText = "";
  const q = query(
    collection(db, "comments"),
    orderBy("timestamp", "desc"),
    where("postID", "==", currentMemeId)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (current) => {
    showPostComments(current, currentMemeId);
  });
}

async function showPostComments(current, currentMemeId) {
  const currentCom = current.data();
  const docSnap = await getDoc(doc(db, "users", currentCom.userID));
  const userName = docSnap.data().name;
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.uid;

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

  /*  likeBtn.addEventListener("click", () =>
  likeUnlikeFunc(
    memeID,
    "like",
    likeBtn,
    unLikeBtn,
    likeCount,
    unLikeCount,
    cantLikeMessage
  )
);
unLikeBtn.addEventListener("click", () =>
  likeUnlikeFunc(
    memeID,
    "unlike",
    likeBtn,
    unLikeBtn,
    likeCount,
    unLikeCount,
    cantLikeMessage
  )
);

if (memeLikes.includes(currentUserId)) {
  likeBtn.classList.add("activeLikeBtn");
}
if (memeUnlikes.includes(currentUserId)) {
  unLikeBtn.classList.add("activeLikeBtn");
} */

  if (userId === currentCom.userID) {
    const deleteButton = document.createElement("a");
    deleteButton.innerText = "Delete";
    deleteButton.className = "deleteButton";
    commentButtons.appendChild(deleteButton);

    commentButtons.addEventListener("click", () => {
      deleteComment(current.id, currentMemeId);
      addCommentCountToUser("add", currentCom.userID);
      addCommentCountToMeme("delete", currentMemeId);
    });
  }

  currentCommentContainer.appendChild(commentButtons);

  document
    .getElementById("memeCommentsContainer")
    .appendChild(currentCommentContainer);
}

async function deleteComment(id, currentMemeId) {
  await deleteDoc(doc(db, "comments", id));
  showAllComments(currentMemeId);
}

async function postCommentFunction(currentComment, currentMemeId, userId) {
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
}

async function addCommentCountToMeme(action, currentMemeId) {
  const memeRef = doc(db, "home", currentMemeId);
  const getMeme = await getDoc(memeRef);
  let memeDataComments = getMeme.data().comments;
  if (action === "delete") {
    memeDataComments--;
  } else {
    memeDataComments++;
  }
  await updateDoc(memeRef, {
    comments: memeDataComments,
  });
}

async function addCommentCountToUser(action, userId) {
  const userRef = doc(db, "users", userId);
  const getUser = await getDoc(userRef);
  let userDataComments = getUser.data().comments;
  if (action === "delete") {
    userDataComments--;
  } else {
    userDataComments++;
  }
  await updateDoc(userRef, {
    comments: userDataComments,
  });
}
