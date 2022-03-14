const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  if (
    `http://127.0.0.1:5500${window.location.pathname}` === event.target.href
  ) {
    return;
  }
  window.history.pushState({}, "", event.target.href);
  handleLocation();
};

const routes = {
  "/": {
    path: "./src/components/HomePage/home.html",
    script: "./src/components/HomePage/home.js",
    style: "./src/components/HomePage/home.css",
  },
  "/index.html": {
    path: "./src/components/HomePage/home.html",
    script: "./src/components/HomePage/home.js",
    style: "./src/components/HomePage/home.css",
  },
  "/login": {
    path: "./src/components/LoginPage/login.html",
    script: "./src/components/LoginPage/login.js",
    style: "./src/components/LoginPage/login.css",
  },
  "/register": {
    path: "./src/components/RegisterPage/register.html",
    script: "./src/components/RegisterPage/register.js",
    style: "./src/components/RegisterPage/register.css",
  },
};

const handleLocation = async () => {
  const path = window.location.pathname;
  const route = routes[path];
  let html;
  try {
    html = await fetch(route.path).then((data) => data.text());
  } catch (e) {
    html = "Error";
  }
  let content = document.getElementById("main-content");
  content.innerHTML = html;
  const script = document.createElement("script");
  script.src = route.script;
  script.type = "module";
  content.appendChild(script);
  const style = document.createElement("link");
  style.href = route.style;
  style.rel = "stylesheet";
  content.appendChild(style);
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();
