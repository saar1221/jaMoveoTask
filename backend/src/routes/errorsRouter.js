import { Router } from "express";

const router = Router();

router.use((err, _req, res, _next) => {
  console.error(err);

  if (err.statusCode) {
    return res.status(err.statusCode).json({
      error: err.message,
      statusCode: err.statusCode,
      error: process.env.NODE_ENV === "DEV" ? err : null,
    });
  }

  return res.status(500).json({
    error: "Internal Server Error",
    statusCode: 500,
    error: process.env.NODE_ENV === "DEV" ? err : null,
  });
});
export default router;
