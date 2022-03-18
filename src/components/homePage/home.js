/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
import {
  ref,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-storage.js";
import { db, storage } from "../../utils/firebaseConfig.js";

window.go = async () => {
  const querySnapshot = await getDocs(collection(db, "home"));
  querySnapshot.forEach((doc) => {
    const currentMeme = doc.data();
    const memeTitle = currentMeme.title;
    const memeURL = currentMeme.url;

    const allMemesDiv = document.getElementById("allMemes");

    const underMemeSection = `
      <div class="upVoteBtn sectionBtns">
        <i class="fa-solid fa-arrow-up fa-lg"></i>
      </div>
      <div class="downVoteBtn sectionBtns">
       <i class="fa-solid fa-arrow-down fa-lg"></i>
      </div>
      <div class="commentsBtn sectionBtns">
        <i class="fa-solid fa-message fa-lg"></i>
      </div>`;

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
    underMeme.innerHTML = underMemeSection;
    singleMeme.appendChild(memeTitleElement);
    singleMeme.appendChild(memeImg);
    singleMeme.appendChild(underMeme);
    allMemesDiv.appendChild(singleMeme);
  });
};
