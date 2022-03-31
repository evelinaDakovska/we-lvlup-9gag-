/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-storage.js";
import {
  doc,
  setDoc,
  serverTimestamp,
  collection,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
import { storage, db } from "../firebaseConfig.js";
import { router } from "../navigoRouter.js";

export async function uploadLogic() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user.uid;
  const userEmail = user.email;
  const file = document.getElementById("fakehiddenInput").files[0];
  const title = $("#titleInput").val();

  if (!title || !file) {
    alert("Please add title/file!");
    return;
  }

  const metadata = { contentType: file.type };
  let fileURL;

  const storageRef = ref(storage, title);

  const uploadTask = uploadBytesResumable(storageRef, file);

  await uploadBytes(storageRef, file).then((snapshot) => {});

  await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    fileURL = downloadURL;
  });

  await setDoc(doc(collection(db, "home")), {
    title,
    userID,
    url: fileURL,
    likesCount: 0,
    likes: [],
    unlikesCount: 0,
    unlikes: [],
    comments: 0,
    timestamp: serverTimestamp(),
  });

  const uploadedSuccessfully = document.createElement("div");
  uploadedSuccessfully.innerHTML = "Uploaded successfully";
  const parentContainer = document.getElementById("modalUpload-style");
  Array.from(parentContainer?.children).forEach((x) =>
    x.classList.add("hidden")
  );
  parentContainer.appendChild(uploadedSuccessfully);
  setTimeout(() => {
    $("#uploadModal").modal("hide");
    Array.from(parentContainer?.children).forEach((x) =>
      x.classList.remove("hidden")
    );
    uploadedSuccessfully.classList.add("hidden");
  }, 2000);
  router.navigate("/profile");
}

export function useIputClick() {
  document.getElementById("fakehiddenInput").click();
}
