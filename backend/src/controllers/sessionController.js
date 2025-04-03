import Session from "../entities/Session.js";
import User from "../entities/User.js";
import Song from "../entities/Song.js";

/**
 * יצירת חזרה חדשה (admin בלבד)
 */
export const createSession = async (req, res) => {
  try {
    const { adminId } = req.body;

    const adminUser = await User.findById(adminId);
    if (!adminUser || adminUser.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only an admin can create a session!" });
    }

    const session = await Session.create({
      admin: adminId,
      players: [adminId],
    });

    res.status(201).json({ message: "Session created successfully!", session });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const joinSession = async (req, res) => {
  try {
    const { sessionId, userId } = req.body;

    const session = await Session.findById(sessionId);
    if (!session)
      return res.status(404).json({ message: "Session not found!" });

    if (session.players.includes(userId)) {
      return res.status(400).json({ message: "User already in session!" });
    }

    session.players.push(userId);
    await session.save();

    res.status(200).json({ message: "User joined the session!", session });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const leaveSession = async (req, res) => {
  try {
    const { sessionId, userId } = req.body;

    const session = await Session.findById(sessionId);
    if (!session)
      return res.status(404).json({ message: "Session not found!" });

    session.players = session.players.filter(id => id.toString() !== userId);
    await session.save();

    res.status(200).json({ message: "User left the session!", session });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSession = async (req, res) => {
  try {
    const { id } = req.params;

    const session = await Session.findById(id)
      .populate("admin")
      .populate("players")
      .populate("currentSong");
    if (!session)
      return res.status(404).json({ message: "Session not found!" });

    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
