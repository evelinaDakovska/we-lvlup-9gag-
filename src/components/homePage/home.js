let allMemes = [];

let memeGenerator = await fetch("https://meme-api.herokuapp.com/gimme/50");
const data = await memeGenerator.json();
allMemes = data.memes;

let allMemesDiv = document.getElementById("allMemes");
allMemes.map((x) => {
  let memeTitle = document.createElement("h3");
  memeTitle.innerText = x.title;
  let memeImg = document.createElement("img");
  memeImg.src = x.preview[3];
  let singleMeme = document.createElement("div");
  singleMeme.className = "meme";
  singleMeme.appendChild(memeTitle);
  singleMeme.appendChild(memeImg);
  allMemesDiv.appendChild(singleMeme);
});
