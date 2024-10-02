import express from "express";
import {
  getUserMatches,
  login,
  logout,
  signup,
  verifyEmail,
} from "../controllers/userController.js";
import { isAuth } from "../middlewares/isAuth.js";
import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts from this IP, please try again later.",
});

const router = express.Router();

router.post("/signup", signup);
router.get("/verify/:token", verifyEmail);
router.get("/userMatches", getUserMatches);
router.post("/login", loginLimiter, login);
router.get("/logout", logout);
router.get("/home", isAuth);
export default router;
