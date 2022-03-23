// eslint-disable-next-line no-undef
const router = new Navigo("/");
const content = document.getElementById("main-content");

const routes = {
  "/": {
    path: "./src/components/HomePage/home.html",
    script: "./src/components/HomePage/home.js",
    func: "go",
  },
  "/fresh": {
    path: "./src/components/FreshPage/fresh.html",
    script: "./src/components/FreshPage/fresh.js",
    func: "fresh",
  },
  "/profile": {
    path: "./src/components/ProfilePage/profile.html",
    script: "./src/components/ProfilePage/profile.js",
    func: "profile",
  },
  "/meme": {
    path: "./src/components/memeDetails/memeDetails.html",
    script: "./src/components/memeDetails/memeDetails.js",
    func: "memeDetails",
  },
};

async function reuseFuncOnRoute(route, pathKey) {
  const html = await fetch(route.path).then((data) => data.text());
  content.innerHTML = html;
  const script = document.createElement("script");
  script.src = route.script;
  script.type = "module";
  script.onload = () => window.go();
  content.appendChild(script);
  router.navigate(pathKey);
  script.onload = () => window[route.func]();
}

router.on("/", () => {
  const route = routes["/"];
  reuseFuncOnRoute(route, "/");
});
router.on("/index.html", () => {
  const route = routes["/"];
  reuseFuncOnRoute(route, "/");
});
router.on("/fresh", () => {
  const route = routes["/fresh"];
  reuseFuncOnRoute(route, "/fresh");
});
router.on("/profile", () => {
  const route = routes["/profile"];
  reuseFuncOnRoute(route, "/profile");
});
router.on("/meme", ({ hashString }) => {
  console.log(hashString);
  /*   const route = routes["/meme/:id"];
  reuseFuncOnRoute(route, "/meme/:id"); */
});

router.resolve();
