import express from "express";
import {
  createSession,
  joinSession,
  leaveSession,
  getSession,
} from "../controllers/sessionController.js";

const router = express.Router();

router.post("/create", createSession);
router.post("/join", joinSession);
router.post("/leave", leaveSession);
router.get("/:id", getSession);

export default router;
