import jwt from "jsonwebtoken";
import HttpErrors from "../utils/Errors.js";

export function authenticateToken(req, _res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    throw HttpErrors.unauthorized("No token provided");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      throw HttpErrors.forbidden("Invalid token");
    }

    req.user = user;
    next();
  });
}
