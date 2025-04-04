import songsDb from "../data/SongsDb.json" with { type: 'json' };
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import HttpErrors from "../utils/Errors.js";

export const searchSongsByName = async (req, res) => {
  let { songName } = req.query;
  
  if (!songName) {
    throw HttpErrors.badRequest("Missing songName");
  }

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const songFilePath = path.join(
    __dirname,
    "../data/songs",
    songName +"_.json"
  );
  const songData = await fs.readFile(songFilePath, "utf8");
  const parsedSongData = JSON.parse(songData);

  res.status(200).json(parsedSongData);
};

export const findFilteredSongs = (req, res) => {
  const { query } = req.query;

  if (!query) {
    throw HttpErrors.badRequest("Missing songName or artist");
  }

  const filteredSongs = songsDb.filter(song => {
    const queryLower = query.toLowerCase();
    const songLower = song.song.toLowerCase();
    const artistLower = song.artist.toLowerCase();

    return songLower.includes(queryLower) || artistLower.includes(queryLower);
  });

  res.status(200).json({ filteredSongs });
};
