import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

// Fixed the path by adding a leading "/" before "api/auth/signup"
router.post("/signup", signup);  // This should match the base path

router.post("/login", login);

router.post("/logout", logout);

export default router;
