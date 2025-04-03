import { createServer } from "node:https";
import { readFileSync } from "fs";
import { Server } from "socket.io";
import { resolve } from "path";

let socketIoServiceContainer = null;

class SocketIoService {
  #connectedClients = new Map();
  #socketIoServer;

  init(app) {
    try {
      this.#initServer(app);
      this.#connectionSocketIo();
    } catch (error) {
      console.error("Error initializing Socket.IO service:", error);
    }
  }

  #initServer(app) {
    const httpsServer = createServer(app);

    this.#socketIoServer = new Server(httpsServer, {
      cors: {
        origin:
          process.env.NODE_ENV === "production"
            ? false
            : ["https://localhost:5173"],
      },
    });

    httpsServer.listen(process.env.SOCKET_PORT, () => {
      console.log(
        `Socket.IO server is running on https://localhost:${process.env.SOCKET_PORT}`
      );
    });
  }

  #connectionSocketIo() {
    this.#socketIoServer.on("connection", socket => {
      console.log("New client connected:", socket.id);

      socket.on("songSelected", songId => {
        console.log("Song selected:", songId);
        this.#broadcastSongSelection(songId);
      });

      socket.on("join-room", (room, userName, cb) => {
        console.log(`${userName} joined room: ${room}`);
        socket.join(room);
        cb();
      });

      socket.on("message", data => {
        this.#sendMessage(data, socket);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });
  }

  #broadcastSongSelection(songId) {
    this.#socketIoServer.emit("songSelected", songId);
  }

  #sendMessage(data, socket) {
    if (data.room === "") {
      socket.broadcast.emit("message", `#${data.userName}: ${data.message}`);
    } else {
      socket
        .to(data.room)
        .emit("message", `#${data.userName}: ${data.message}`);
    }
  }

  // subscribe(socket, channel) {
  //   console.log(`Socket ${socket.id} subscribed to ${channel}`);
  //   socket.join(channel);
  // }

  // unsubscribe(socket, channel) {
  //   console.log(`Socket ${socket.id} unsubscribed from ${channel}`);
  //   socket.leave(channel);
  // }
}

function initSocketIoService() {
  if (!socketIoServiceContainer) {
    socketIoServiceContainer = new SocketIoService();
  }
  return socketIoServiceContainer;
}

export default initSocketIoService();
