import HttpErrors from "../utils/Errors.js";
import { getJsonSong, getFilteredSongs } from "./songService.js";

export const searchSongsByName = async (req, res, _next) => {
  let { songName } = req.query;

  if (!songName) {
    throw HttpErrors.badRequest("Missing songName");
  }

  const parsedSongData = await getJsonSong({ songName });
  res.status(200).json(parsedSongData);
};

export const findFilteredSongs = (req, res, _next) => {
  const { query } = req.query;

  if (!query) {
    throw HttpErrors.badRequest("Missing songName or artist");
  }

  const filteredSongs = getFilteredSongs({ query });
  res.status(200).json({ filteredSongs });
};
