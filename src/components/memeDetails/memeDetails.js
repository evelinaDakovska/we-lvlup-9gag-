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
import { likeUnlikeFunc } from "../../utils/managePostData/likeUnlikeFunc.js";

import { db } from "../../utils/firebaseConfig.js";
import { createAvatar } from "../../index.js";
import { showSingleMeme } from "../../utils/managePostData/showPosts.js";
import { router } from "../../utils/navigoRouter.js";

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
  document.getElementById("userAvatar").appendChild(await createAvatar());
  const currentComment = document.getElementById("currentComment");

  showAllComments(currentMemeId, memeOwnerID);

  document.getElementById("cancelComemntBtn").addEventListener("click", () => {
    currentComment.value = "";
  });

  document
    .getElementById("postCommentBtn")
    .addEventListener("click", async () => {
      postCommentFunction(currentComment, currentMemeId, userId);
      currentComment.value = "";
      showAllComments(currentMemeId, memeOwnerID);
      addCommentCountToMeme("add", currentMemeId);
      addCommentCountToUser("add", memeOwnerID);
    });

  if (memeOwnerID === userId) {
    $("#deleteBtn").removeClass("hidden");
    $("#deleteBtn").click(() => deleteMemeFunc(memeID));
  }
};

async function deleteMemeFunc(memeID) {
  if (confirm("Are you sure you want to delete this post?")) {
    await deleteDoc(doc(db, "home", memeID));
    router.navigate("/profile");
  }
}

async function showAllComments(currentMemeId, memeOwnerID) {
  document.getElementById("memeCommentsContainer").innerText = "";
  const q = query(
    collection(db, "comments"),
    orderBy("timestamp", "desc"),
    where("postID", "==", currentMemeId),
    where("parentCommentID", "==", "none")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (current) => {
    showPostComments(current, currentMemeId, memeOwnerID);
  });
}

async function showPostComments(current, currentMemeId, memeOwnerID) {
  const currentID = current.id;
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

  likeBtn.addEventListener("click", () =>
    likeUnlikeFunc(
      "comments",
      currentID,
      "like",
      likeBtn,
      unLikeBtn,
      likeCount,
      unLikeCount
    )
  );
  unLikeBtn.addEventListener("click", () =>
    likeUnlikeFunc(
      "comments",
      currentID,
      "unlike",
      likeBtn,
      unLikeBtn,
      likeCount,
      unLikeCount
    )
  );

  /*  if (memeLikes.includes(currentUserId)) {
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

    deleteButton.addEventListener("click", () => {
      deleteComment(current.id, currentMemeId);
      addCommentCountToUser("add", currentCom.userID);
      addCommentCountToMeme("delete", currentMemeId);
    });
  }

  currentCommentContainer.appendChild(commentButtons);

  document
    .getElementById("memeCommentsContainer")
    .appendChild(currentCommentContainer);

  replyButton.addEventListener("click", () => {
    replyHTMLStructure(
      currentCommentContainer,
      currentMemeId,
      userId,
      currentID,
      memeOwnerID,
      userName
    );
  });
}

async function deleteComment(id, currentMemeId) {
  await deleteDoc(doc(db, "comments", id));
  showAllComments(currentMemeId);
}

async function postCommentFunction(
  currentComment,
  currentMemeId,
  userId,
  parentCommentID
) {
  const commentValue = currentComment.value;
  if (!commentValue) {
    alert("You cant post empty comment");
    return;
  }
  if (!parentCommentID) {
    parentCommentID = "none";
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
    parentCommentID: parentCommentID,
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

function replyHTMLStructure(
  currentCommentContainer,
  currentMemeId,
  userId,
  parentCommentID,
  memeOwnerID,
  userName
) {
  const replyCommentSection = document.createElement("div");
  replyCommentSection.className = "replyCommentSection";

  const userAvatar = document.createElement("div");
  userAvatar.className = "userAvatar";
  userAvatar.innerText = userName;
  replyCommentSection.appendChild(userAvatar);

  const textAreaSection = document.createElement("section");
  textAreaSection.className = "textAreaSection";

  const currentReplyComment = document.createElement("textarea");
  currentReplyComment.className = "currentReplyComment";
  currentReplyComment.setAttribute("rows", "1");
  currentReplyComment.setAttribute("placeholder", "Write a reply comment...");
  textAreaSection.appendChild(currentReplyComment);

  const replyBtnSection = document.createElement("footer");
  replyBtnSection.className = "replyBtnSection";

  const cancelReplyBtn = document.createElement("a");
  cancelReplyBtn.className = "cancelReplyBtn";
  cancelReplyBtn.innerText = "Cancel";
  replyBtnSection.appendChild(cancelReplyBtn);

  cancelReplyBtn.addEventListener("click", () => {
    currentReplyComment.value = "";
  });

  const postReplyBtn = document.createElement("a");
  postReplyBtn.className = "postReplyBtn";
  postReplyBtn.innerText = "Post";
  replyBtnSection.appendChild(postReplyBtn);

  postReplyBtn.addEventListener("click", async () => {
    postCommentFunction(
      currentReplyComment,
      currentMemeId,
      userId,
      parentCommentID
    );
    currentReplyComment.value = "";
    addCommentCountToMeme("add", currentMemeId);
    addCommentCountToUser("add", memeOwnerID);
  });

  textAreaSection.appendChild(replyBtnSection);
  replyCommentSection.appendChild(textAreaSection);

  currentCommentContainer.appendChild(replyCommentSection);
}
