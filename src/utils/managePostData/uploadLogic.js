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
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
import { storage, db } from "../firebaseConfig.js";

export async function uploadLogic() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user.uid;
  const userEmail = user.email;
  const file = document.getElementById("fakehiddenInput").files[0];
  const title = file.name.split(".")[0];
  const time = file.lastModifiedDate;
  const metadata = { contentType: file.type };
  let fileURL;

  const storageRef = ref(storage, title);

  const uploadTask = uploadBytesResumable(storageRef, file);

  await uploadBytes(storageRef, file).then((snapshot) => {
    console.log(snapshot);
  });

  await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    fileURL = downloadURL;
  });

  await setDoc(doc(db, "home", title), {
    title,
    userID,
    url: fileURL,
    likes: 0,
    unlikes: 0,
    comments: {},
    time,
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
}

export function useIputClick() {
  document.getElementById("fakehiddenInput").click();
}
