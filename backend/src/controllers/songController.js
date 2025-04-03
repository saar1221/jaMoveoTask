import Song from "../entities/Song.js";

export const searchSongs = async (req, res) => {
  try {
    const { query } = req.body;

    const songs = await Song.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { artist: { $regex: query, $options: "i" } },
      ],
    });

    if (songs.length === 0) {
      return res.status(404).json({ message: "No songs found" });
    }

    return res.status(200).json(songs);
  } catch (error) {
    console.error("Error searching songs:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getSongById = async (req, res) => {
  try {
    const { id } = req.params;

    const song = await Song.findById(id);

    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    return res.status(200).json(song);
  } catch (error) {
    console.error("Error getting song by ID:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
