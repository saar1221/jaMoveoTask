import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  currentSong: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Song",
    default: null,
  },
  isActive: { type: Boolean, default: true },
});

export default mongoose.model("Session", sessionSchema);
