import express from "express";
import multer from "multer";

import authActions from "./modules/auth/authActions";

import { checkAuthDatas } from "./middlewares/checkAuthDatas";
import fileActions from "./modules/files/fileActions";

const router = express.Router();

router.post("/auth/register", authActions.register);
router.post("/auth/login", checkAuthDatas, authActions.login);
router.get("/auth/find/:id", authActions.findCurrentUser);

router.post(
  "/files/upload",
  multer({ dest: "uploads" }).single("avatar"),
  fileActions.upload
);

export default router;
