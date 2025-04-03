import express from "express";
import {
  searchSongsByName,
  findFilteredSongs,
} from "../controllers/songController.js";

const router = express.Router();

router.get("/searchSong", searchSongsByName);
router.get("/findSongs", findFilteredSongs);

export default router;
