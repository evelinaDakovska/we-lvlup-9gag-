const router = new Navigo("/");
let content = document.getElementById("main-content");

router.on("/", function () {
  const route = routes["/"];
  reuseFuncOnRoute(route, "/");
});
router.on("/index.html", function () {
  const route = routes["/"];
  reuseFuncOnRoute(route, "/");
});
router.on("/fresh", function () {
  const route = routes["/fresh"];
  reuseFuncOnRoute(route, "/fresh");
});

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
};

async function reuseFuncOnRoute(route, pathKey) {
  let html = await fetch(route.path).then((data) => data.text());
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
  setTimeout(() => window[route.func](), 100);
}

router.resolve();
