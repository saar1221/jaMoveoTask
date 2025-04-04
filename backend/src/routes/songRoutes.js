import express from "express";
import {
  searchSongsByName,
  findFilteredSongs,
} from "../controllers/songController.js";
import { wrapController } from "../utils/routerUtile.js";

const router = express.Router();

router.get("/getSong", wrapController(searchSongsByName));
router.get("/findSongs", wrapController(findFilteredSongs));

export default router;
