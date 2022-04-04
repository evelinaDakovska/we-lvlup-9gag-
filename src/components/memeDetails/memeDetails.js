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
  $("#userAvatar").append(await createAvatar());
  const currentComment = document.getElementById("currentComment");

  showAllComments(currentMemeId, memeOwnerID);

  $("#cancelComemntBtn").click(() => {
    currentComment.value = "";
  });

  $("#postCommentBtn").click(async () => {
    postCommentFunction(currentComment, currentMemeId, userId);
    currentComment.value = "";
    showAllComments(currentMemeId, memeOwnerID);
    addCommentCountToMeme("add", currentMemeId);
    addCommentCountToUser("add", memeOwnerID);
  });
};

async function showAllComments(currentMemeId, memeOwnerID) {
  $("#memeCommentsContainer").html("");
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
  $(currentCommentContainer).addClass("currentCommentContainer");

  const userNameContainer = document.createElement("span");
  $(userNameContainer).addClass("userNameContainer");
  $(userNameContainer).text(userName);
  $(currentCommentContainer).append(userNameContainer);

  const commentValue = document.createElement("div");
  $(commentValue).addClass("commentValue");
  $(commentValue).text(currentCom.comment);
  $(currentCommentContainer).append(commentValue);

  const commentButtons = document.createElement("div");
  $(commentButtons).addClass("commentButtons");

  const replyButton = document.createElement("a");
  $(replyButton).text("Reply");
  $(replyButton).addClass("replyButton");
  $(commentButtons).append(replyButton);

  const likeBtn = document.createElement("div");
  $(likeBtn).addClass("upVoteBtn sectionBtns");
  $(likeBtn).html(`<i class="fa-solid fa-arrow-up fa-lg"></i>`);
  $(commentButtons).append(likeBtn);

  const unLikeBtn = document.createElement("div");
  $(unLikeBtn).addClass("downVoteBtn sectionBtns");
  $(unLikeBtn).html(`<i class="fa-solid fa-arrow-down fa-lg"></i>`);
  $(commentButtons).append(unLikeBtn);

  const likeCount = document.createElement("div");
  $(likeCount).text(currentCom.likesCount);
  $(likeBtn).append(likeCount);

  const unLikeCount = document.createElement("div");
  $(unLikeCount).text(currentCom.unlikesCount);
  $(unLikeBtn).append(unLikeCount);

  if (userId === currentCom.userID) {
    const deleteButton = document.createElement("a");
    $(deleteButton).text("Delete");
    $(deleteButton).addClass("deleteButton");
    $(commentButtons).append(deleteButton);
    $(deleteButton).click(() => {
      deleteComment(currentID, currentMemeId);
    });
  }

  $(likeBtn).click(() =>
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
  $(unLikeBtn).click(() =>
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

  $(currentCommentContainer).append(commentButtons);

  $("#memeCommentsContainer").append(currentCommentContainer);

  $(replyButton).click(() => {
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
  addCommentCountToMeme("delete", currentMemeId);
  addCommentCountToUser("delete", currentMemeId);
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
  $(replyCommentSection).addClass("replyCommentSection");

  const userAvatar = document.createElement("div");
  $(userAvatar).addClass("userAvatar");
  $(userAvatar).text(userName);
  $(replyCommentSection).append(userAvatar);

  const textAreaSection = document.createElement("section");
  $(textAreaSection).addClass("textAreaSection");

  const currentReplyComment = document.createElement("textarea");
  $(currentReplyComment).addClass("currentReplyComment");
  currentReplyComment.setAttribute("rows", "1");
  currentReplyComment.setAttribute("placeholder", "Write a reply comment...");
  $(textAreaSection).append(currentReplyComment);

  const replyBtnSection = document.createElement("footer");
  $(replyBtnSection).addClass("replyBtnSection");

  const cancelReplyBtn = document.createElement("a");
  $(cancelReplyBtn).addClass("cancelReplyBtn");
  $(cancelReplyBtn).text("Cancel");
  $(replyBtnSection).append(cancelReplyBtn);

  $(cancelReplyBtn).click(() => {
    $(currentReplyComment).value = "";
  });

  const postReplyBtn = document.createElement("a");
  $(postReplyBtn).addClass("postReplyBtn");
  $(postReplyBtn).text("Post");
  $(replyBtnSection).append(postReplyBtn);

  $(postReplyBtn).click(async () => {
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

  $(textAreaSection).append(replyBtnSection);
  $(replyCommentSection).append(textAreaSection);

  $(currentCommentContainer).append(replyCommentSection);
}
