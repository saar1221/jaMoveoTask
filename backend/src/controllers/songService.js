import songsDb from "../data/SongsDb.json" with { type: 'json' };
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const getJsonSong = async ({ songName }) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const songFilePath = path.join(
    __dirname,
    "../data/songs",
    songName + "_.json"
  );
  const songData = await fs.readFile(songFilePath, "utf8");
  return JSON.parse(songData);
};

const getFilteredSongs = ({query}) => {
  const filteredSongs = songsDb.filter(song => {
    const queryLower = query.toLowerCase();
    const songLower = song.song.toLowerCase();
    const artistLower = song.artist.toLowerCase();

    return songLower.includes(queryLower) || artistLower.includes(queryLower);
  });
  return filteredSongs
};

export { getJsonSong ,getFilteredSongs};
