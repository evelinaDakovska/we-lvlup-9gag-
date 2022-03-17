window.go = () => {
  fetch("https://api.imgflip.com/get_memes")
    .then((response) => response.json())
    .then((data) => {
      const allMemesDiv = document.getElementById("allMemes");
      const allMemes = data.data.memes;

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

      // eslint-disable-next-line array-callback-return
      allMemes.map((x) => {
        const memeTitle = document.createElement("h3");
        memeTitle.innerText = x.name;
        const memeImg = document.createElement("img");
        memeImg.src = x.url;
        const singleMeme = document.createElement("div");
        singleMeme.className = "meme";
        const underMeme = document.createElement("div");
        underMeme.className = "underMemeSection";
        underMeme.innerHTML = underMemeSection;
        singleMeme.appendChild(memeTitle);
        singleMeme.appendChild(memeImg);
        singleMeme.appendChild(underMeme);
        allMemesDiv.appendChild(singleMeme);
      });
    });
};
