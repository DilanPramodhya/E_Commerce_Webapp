import express from "express";
import { Login, Logout, SignUp } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/signUp", SignUp);
router.get("/login", Login);
router.get("/logout", Logout);

export default router;
