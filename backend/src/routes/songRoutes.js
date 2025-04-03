import express from "express";
import { searchSongs, getSongById } from "../controllers/songController.js";

const router = express.Router();

router.get("/search", searchSongs);
router.get("/:id", getSongById);

export default router;
