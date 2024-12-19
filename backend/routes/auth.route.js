import express from "express";
import { Login, Logout, SignUp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signUp", SignUp);
router.post("/login", Login);
router.post("/logout", Logout);

export default router;
