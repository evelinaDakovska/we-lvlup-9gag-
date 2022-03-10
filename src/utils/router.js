const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  handleLocation();
};

const routes = {
  "/": { path: "./src/pages/home.html", script: "./src/components/home.js" },
  "/login": {
    path: "./src/pages/login.html",
    script: "./src/components/login.js",
  },
  "/register": {
    path: "./src/pages/register.html",
    script: "./src/components/register.js",
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
  let a = document.getElementById("main-content");
  a.innerHTML = html;
  const script = document.createElement("script");
  script.src = route.script;
  script.type = "text/javascript";
  a.appendChild(script);
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();
