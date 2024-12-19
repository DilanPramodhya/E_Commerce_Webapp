import express from "express";
import {
//   GetProfile,
  Login,
  Logout,
  RefreshToken,
  SignUp,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signUp", SignUp);
router.post("/login", Login);
router.post("/logout", Logout);
router.post("/refreshToken", RefreshToken);
// router.get("/getProfile", GetProfile);

export default router;
