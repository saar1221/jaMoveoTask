import Song from "../entities/Song.js";
import songsDb from "../data/SongsDb.json" assert { type: "json" };
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

export const searchSongsByName = async (req, res) => {
  const { songName } = req.query;

  if (!songName) {
    return res.status(400).json({ error: "Missing songName or artist" });
  }

  songName;
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const songFilePath = path.join(
      __dirname,
      "../data/songs",
      songName + ".json"
    );

    console.log(songFilePath, "songFilePath");
    const songData = await fs.readFile(songFilePath, "utf8");
    const parsedSongData = JSON.parse(songData);

    res.status(200).json(parsedSongData);
  } catch (error) {
    console.error("Error getting song:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const findFilteredSongs = (req, res) => {
  const { query } = req.query;
  console.log(query);

  if (!query) {
    return res.status(400).json({ error: "Missing songName or artist" });
  }

  const filteredSongs = songsDb.filter(song => {
    const queryLower = query.toLowerCase();
    const songLower = song.song.toLowerCase();
    const artistLower = song.artist.toLowerCase();

    return songLower.includes(queryLower) || artistLower.includes(queryLower);
  });

  res.status(200).json({ filteredSongs });
};
