import HttpErrors from "../utils/Errors.js";
import { createUser, findUser } from "./authService.js";

export const registerUser = async (req, res, _next) => {
  const { username, password, instrument, role } = req.body;

  if (!username | !password | !role) {
    throw HttpErrors.badRequest("Missing data");
  }

  const { user, token } = await createUser({
    username,
    password,
    instrument,
    role,
  });
  res
    .status(201)
    .json({ message: "User registered successfully!", user, token });
};

export const loginUser = async (req, res, _next) => {
  const { username, password } = req.body;

  if (!username | !password) {
    throw HttpErrors.badRequest("Missing data");
  }

  const { user, token } = await findUser({ username, password });
  console.log(user, token, "user, token");

  res.json({ user, token });
};
