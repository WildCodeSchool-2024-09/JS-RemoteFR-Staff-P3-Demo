import express from "express";

import authActions from "./modules/auth/authActions";
import fileActions from "./modules/files/fileActions";

import { checkAuthDatas } from "./middlewares/checkAuthDatas";
import { adjustFilePath, upload } from "./middlewares/multerUpload";
import { verifyUser } from "./middlewares/verifyUser";

const router = express.Router();

router.post("/auth/register", authActions.register);
router.post("/auth/login", checkAuthDatas, authActions.login);
router.get("/auth/find/:id", authActions.findCurrentUser);

router.post(
  "/files/upload",
  verifyUser,
  upload,
  adjustFilePath,
  fileActions.upload,
);

export default router;
