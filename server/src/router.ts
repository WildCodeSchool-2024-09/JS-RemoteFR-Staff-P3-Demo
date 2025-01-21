import express from "express";
import { checkAuthDatas } from "./middlewares/checkAuthDatas";
import authActions from "./modules/auth/authActions";

const router = express.Router();

router.post("/auth/register", authActions.register);
router.post("/auth/login", checkAuthDatas, authActions.login);

export default router;
