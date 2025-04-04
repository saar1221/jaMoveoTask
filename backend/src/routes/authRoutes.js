import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { wrapController } from "../utils/routerUtile.js";

const router = express.Router();

router.post("/signup", wrapController(registerUser));
router.post("/login", wrapController(loginUser));

export default router;
