/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import { useIputClick, uploadLogic } from "./uploadLogic.js";

export const user = localStorage.getItem("user");

$("#uploadFile").click(useIputClick);
$("#uploadBtn").click(uploadLogic);