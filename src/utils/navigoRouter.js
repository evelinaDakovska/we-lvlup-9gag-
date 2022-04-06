// eslint-disable-next-line no-undef
export const router = new Navigo("/");
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
  "/trending": {
    path: "./src/components/trendingPage/trending.html",
    script: "./src/components/trendingPage/trending.js",
    func: "trending",
  },
  "/profile": {
    path: "./src/components/ProfilePage/profile.html",
    script: "./src/components/ProfilePage/profile.js",
    func: "profile",
  },
  "/meme": {
    path: "../src/components/memeDetails/memeDetails.html",
    script: "../src/components/memeDetails/memeDetails.js",
    func: "memeDetails",
  },
};

async function reuseFuncOnRoute(route, pathKey, memeID) {
  content.innerHTML = "";
  const html = await fetch(route.path).then((data) => data.text());
  content.innerHTML = html;
  const script = document.createElement("script");
  script.src = route.script;
  script.type = "module";
  content.appendChild(script);
  router.navigate(pathKey);
  script.onload = () => window[route.func](memeID);
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
router.on("/trending", () => {
  const route = routes["/trending"];
  reuseFuncOnRoute(route, "/trending");
});
router.on("/profile", () => {
  const route = routes["/profile"];
  reuseFuncOnRoute(route, "/profile");
});
router.on("/meme/:id", ({ data }) => {
  const route = routes["/meme"];
  reuseFuncOnRoute(route, "/meme", data);
});

router.resolve();
