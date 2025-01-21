import express from "express";
import authActions from "./modules/auth/authActions";

const router = express.Router();

router.post("/auth/register", authActions.register);

export default router;
