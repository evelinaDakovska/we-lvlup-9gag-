document.getElementById("signUpEmail").addEventListener("click", classChange);
function classChange() {
  let appElement = document.getElementById("logApplications");
  appElement.classList.add("hidden");
  let emailElement = document.getElementById("regWithEmail");
  emailElement.classList.remove("hidden");
}
