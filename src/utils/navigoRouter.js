// eslint-disable-next-line no-undef
const router = new Navigo("/");
const content = document.getElementById("main-content");

const routes = {
  "/": {
    path: "./src/components/HomePage/home.html",
    script: "./src/components/HomePage/home.js",
    style: "./src/components/HomePage/home.css",
    func: "go",
  },
  "/fresh": {
    path: "./src/components/FreshPage/fresh.html",
    script: "./src/components/FreshPage/fresh.js",
    style: "./src/components/FreshPage/fresh.css",
    func: "fresh",
  },
  "/upload": {
    path: "./src/components/UploadPage/upload.html",
    script: "./src/components/UploadPage/upload.js",
    style: "./src/components/UploadPage/upload.css",
    func: "upload",
  },
  "/profile": {
    path: "./src/components/ProfilePage/profile.html",
    script: "./src/components/ProfilePage/profile.js",
    style: "./src/components/ProfilePage/profile.css",
    func: "profile",
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
  const style = document.createElement("link");
  style.href = route.style;
  style.rel = "stylesheet";
  content.appendChild(style);
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
router.on("/upload", () => {
  const route = routes["/upload"];
  reuseFuncOnRoute(route, "/upload");
});
router.on("/profile", () => {
  const route = routes["/profile"];
  reuseFuncOnRoute(route, "/profile");
});

router.resolve();
