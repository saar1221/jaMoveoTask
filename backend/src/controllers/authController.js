import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import HttpErrors from "../utils/Errors.js";

export const registerUser = async (req, res, _next) => {
  const { username, password, instrument, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const userResponse = await User.create({
    username,
    password: hashedPassword,
    instrument,
    role,
  });
  const token = jwt.sign(
    { id: userResponse._id, role: userResponse.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  const user = { id: userResponse.id, username, instrument, role };
  res
    .status(201)
    .json({ message: "User registered successfully!", user, token });
};

export const loginUser = async (req, res, _next) => {
  const { username, password } = req.body;

  const userResponse = await User.findOne({ username });
  if (!userResponse) {
    throw HttpErrors.notFound("User not found!");
  }

  const isMatch = await bcrypt.compare(password, userResponse.password);
  if (!isMatch) {
    throw HttpErrors.badRequest("Invalid credentials!");
  }
  const token = jwt.sign(
    { id: userResponse._id, role: userResponse.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  const user = {
    id: userResponse.id,
    username,
    instrument: userResponse.instrument,
    role: userResponse.role,
  };

  res.json({ user, token });
};
