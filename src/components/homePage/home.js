window.go = () => {
  fetch("https://api.imgflip.com/get_memes")
    .then((response) => response.json())
    .then((data) => {
      let allMemesDiv = document.getElementById("allMemes");
      let allMemes = data.data.memes;

      let underMemeSection = `
      <div class="upVoteBtn sectionBtns">
        <i class="fa-solid fa-arrow-up fa-lg"></i>
      </div>
      <div class="downVoteBtn sectionBtns">
       <i class="fa-solid fa-arrow-down fa-lg"></i>
      </div>
      <div class="commentsBtn sectionBtns">
        <i class="fa-solid fa-message fa-lg"></i>
      </div>`;

      allMemes.map((x) => {
        let memeTitle = document.createElement("h3");
        memeTitle.innerText = x.name;
        let memeImg = document.createElement("img");
        memeImg.src = x.url;
        let singleMeme = document.createElement("div");
        singleMeme.className = "meme";
        let underMeme = document.createElement("div");
        underMeme.className = "underMemeSection";
        underMeme.innerHTML = underMemeSection;
        singleMeme.appendChild(memeTitle);
        singleMeme.appendChild(memeImg);
        singleMeme.appendChild(underMeme);
        allMemesDiv.appendChild(singleMeme);
      });
    });
};
