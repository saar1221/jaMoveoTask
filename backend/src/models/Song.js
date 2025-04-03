import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  content: [
    {
      lyrics: { type: String, required: true },
      chords: { type: String },
    },
  ],
});

export default mongoose.model("Song", songSchema);
