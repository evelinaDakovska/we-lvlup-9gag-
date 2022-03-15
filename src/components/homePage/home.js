fetch("https://api.imgflip.com/get_memes")
  .then((response) => response.json())
  .then((data) => {
    let allMemesDiv = document.getElementById("allMemes");
    let allMemes = data.data.memes;

    allMemes.map((x) => {
      let memeTitle = document.createElement("h3");
      memeTitle.innerText = x.name;
      let memeImg = document.createElement("img");
      memeImg.src = x.url;
      let singleMeme = document.createElement("div");
      singleMeme.className = "meme";
      singleMeme.appendChild(memeTitle);
      singleMeme.appendChild(memeImg);
      allMemesDiv.appendChild(singleMeme);
    });
  });
