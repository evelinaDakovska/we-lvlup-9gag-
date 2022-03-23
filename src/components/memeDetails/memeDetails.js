import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
import {
  ref,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-storage.js";
import { db, storage } from "../../utils/firebaseConfig.js";
import { likeUnlikeFunc } from "../../utils/managePostData/likeUnlikeFunc.js";
import { avatar } from "../../index.js";

window.memeDetails = async (memeID) => {
  let currentMemeId = memeID.id;
  const docRef = doc(db, "home", currentMemeId);
  const docSnap = await getDoc(docRef);
  const currentMemeData = docSnap.data();

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = currentUser.uid;

  $("#titleMeme").text(currentMemeData.title);

  const memeImg = document.createElement("img");
  getDownloadURL(ref(storage, currentMemeData.url))
    .then((url) => {
      memeImg.setAttribute("src", url);
    })
    .catch((error) => {
      console.log(error);
    });
  $("#memeImgContainer").html(memeImg);

  const likeBtn = document.createElement("div");
  likeBtn.className = "upVoteBtn sectionBtns";
  likeBtn.innerHTML = `<i class="fa-solid fa-arrow-up fa-lg"></i>`;
  $("#currentMemeLike").html(likeBtn);

  const likeCount = document.createElement("div");
  likeCount.innerHTML = currentMemeData.likesCount;
  likeBtn.appendChild(likeCount);

  const unLikeBtn = document.createElement("div");
  unLikeBtn.className = "downVoteBtn sectionBtns";
  unLikeBtn.innerHTML = `<i class="fa-solid fa-arrow-down fa-lg"></i>`;
  $("#currentMemeUnlike").html(unLikeBtn);

  const unLikeCount = document.createElement("div");
  unLikeCount.innerHTML = currentMemeData.unlikesCount;
  unLikeBtn.appendChild(unLikeCount);

  likeBtn.addEventListener("click", () =>
    likeUnlikeFunc(
      currentMemeId,
      "like",
      likeBtn,
      unLikeBtn,
      likeCount,
      unLikeCount
    )
  );
  unLikeBtn.addEventListener("click", () =>
    likeUnlikeFunc(
      currentMemeId,
      "unlike",
      likeBtn,
      unLikeBtn,
      likeCount,
      unLikeCount
    )
  );

  if (currentMemeData.likes.includes(currentUserId)) {
    likeBtn.classList.add("activeLikeBtn");
  }
  if (currentMemeData.unlikes.includes(currentUserId)) {
    unLikeBtn.classList.add("activeLikeBtn");
  }

  document.getElementById("userAvatar").src = avatar;
};
