import express from "express";
import { Login, Logout, RefreshToken, SignUp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signUp", SignUp);
router.post("/login", Login);
router.post("/logout", Logout);
router.post("/refreshToken", RefreshToken);

export default router;