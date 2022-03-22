/* eslint-disable import/no-useless-path-segments */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import { getDocs } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
import {
  ref,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-storage.js";
import { storage } from "../firebaseConfig.js";
import { likeFunc } from "./likeFunc.js";
import { unLikeFunc } from "./unLikeFunc.js";
import { commentFunc } from "./commentFunc.js";

export async function showPosts(orderedDB, divId) {
  const querySnapshot = await getDocs(orderedDB);
  querySnapshot.forEach((doc) => {
    const currentMeme = doc.data();
    const memeTitle = currentMeme.title;
    const memeURL = currentMeme.url;
    const memeID = doc.id;

    const allMemesDiv = document.getElementById(divId);

    const memeImg = document.createElement("img");

    getDownloadURL(ref(storage, memeURL))
      .then((url) => {
        memeImg.setAttribute("src", url);
      })
      .catch((error) => {
        console.log(error);
      });

    const memeTitleElement = document.createElement("h3");
    memeTitleElement.innerText = memeTitle;
    const singleMeme = document.createElement("div");
    singleMeme.className = "meme";
    const underMeme = document.createElement("div");
    underMeme.className = "underMemeSection";

    const likeBtn = document.createElement("div");
    likeBtn.className = "upVoteBtn sectionBtns";
    likeBtn.innerHTML = '<i class="fa-solid fa-arrow-up fa-lg"></i>';
    likeBtn.addEventListener("click", () => likeFunc(memeID));
    underMeme.appendChild(likeBtn);

    const unLikeBtn = document.createElement("div");
    unLikeBtn.className = "downVoteBtn sectionBtns";
    unLikeBtn.innerHTML = '<i class="fa-solid fa-arrow-down fa-lg"></i>';
    unLikeBtn.addEventListener("click", () => unLikeFunc(memeID));
    underMeme.appendChild(unLikeBtn);

    const commentBtn = document.createElement("div");
    commentBtn.className = "commentsBtn sectionBtns";
    commentBtn.innerHTML = '<i class="fa-solid fa-message fa-lg"></i>';
    commentBtn.addEventListener("click", () => commentFunc(memeID));
    underMeme.appendChild(commentBtn);

    singleMeme.appendChild(memeTitleElement);
    singleMeme.appendChild(memeImg);
    singleMeme.appendChild(underMeme);
    allMemesDiv.appendChild(singleMeme);
  });
}
