import { Router } from "express";
import authRoutes from "./authRoutes.js";
import songRoutes from "./songRoutes.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();
router.use("/api/auth", authRoutes);
router.use("/api/songs", authenticateToken, songRoutes);
router.use((err, _req, res, _next) => {
  console.error(err);

  if (err.statusCode) {
    return res.status(err.statusCode).json({
      message: err.message,
      statusCode: err.statusCode,
      error: process.env.NODE_ENV === "DEV" ? err : null,
    });
  }

  return res.status(500).json({
    message: "Internal Server Error",
    statusCode: 500,
    error: process.env.NODE_ENV === "DEV" ? err : null,
  });
});

export default router;
