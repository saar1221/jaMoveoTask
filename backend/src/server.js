import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import http from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/authRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import songRoutes from "./routes/songRoutes.js";
import { SocketIoService } from "./services/index.js";

import helmet from "helmet";

connectDB();
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(helmet());
app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/songs", songRoutes);

SocketIoService.init(app);

// io.on("connection", socket => {
//   console.log("New client connected:", socket.id);

//   socket.on("songSelected", songId => {
//     console.log("Song selected:", songId);

//     socket.broadcast.emit("songSelected", songId);

//     socket.emit("songSelected", songId);
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected:", socket.id);
//   });
// });

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
