import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import helmet from "helmet";
import http from "http";
import { Server } from "socket.io";
import router from "./routes/index.js";
import { SocketIoService } from "./services/index.js";

dotenv.config();
const defaultCorsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

const app = express();
const server = http.createServer(app);

const io = new Server(server, defaultCorsOptions);

connectDB();
SocketIoService.init(io);

app.use(helmet());

app.use(express.json());
app.use(router);
app.use(cors(defaultCorsOptions));

const PORT = process.env.SERVER_PORT || 4001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
