import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, minlength: 2 },
    password: { type: String, required: true, minlength: 6 },
    instrument: { type: String, required: true },
    role: { type: String, enum: ["admin", "player"], default: "player" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
