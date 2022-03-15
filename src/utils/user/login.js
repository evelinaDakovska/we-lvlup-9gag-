import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";

import facebookLogin from "./loginFacebook.js";
import googleLogin from "./loginGoogle.js";

const auth = getAuth();

$("#signInFacebook").click(facebookLogin);
$("#signInGoogle").click(googleLogin);
