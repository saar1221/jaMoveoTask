import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import http from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/authRoutes.js";
import songRoutes from "./routes/songRoutes.js";
import { SocketIoService } from "./services/index.js";

import helmet from "helmet";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});
// close seesion when logout
connectDB();
SocketIoService.init(io);

app.use(helmet());
app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);

const PORT = process.env.SERVER_PORT || 4001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
