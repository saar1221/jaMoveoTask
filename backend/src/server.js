import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import http from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/authRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import songRoutes from "./routes/songRoutes.js";
// import { SocketIoService } from "./services/index.js";
import helmet from "helmet";

connectDB();
dotenv.config();
// my code start
// const { SERVER_PORT, CORS_ORIGIN } = process.env;
// const app = express();
// app.use(express.json());

// //INFO: i import helmet i need to check this if i need this
// app.use(
//   cors({
//     // origin: "https://localhost:5173",
//     origin: "*",
//     // origin: CORS_ORIGIN, //INFO: check this if i want every one can call him
//     methods: ["GET", "POST"],
//     credentials: true,
//   })
// );

// // SocketIoService.init(app);

// app.get("/", (req, res) => res.send(",My JaMoveo task is running..."));

// app.listen(SERVER_PORT, () => {
//   console.log("Server is running on port " + SERVER_PORT);
// });
// MY CODE END
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(helmet());
app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/songs", songRoutes);

io.on("connection", socket => {
  console.log("New client connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
