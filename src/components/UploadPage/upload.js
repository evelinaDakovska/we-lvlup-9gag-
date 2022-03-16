window.upload = () => {
  let user = localStorage.getItem("user");
  if (user === "") {
    $(location).prop("href", "http://127.0.0.1:5503/");
  }
};
