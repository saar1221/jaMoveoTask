let socketIoServiceContainer = null;

class SocketIoService {
  #socketIoServer;

  init(io) {
    try {
      this.#socketIoServer = io;
      console.log("start");
      this.#connectionSocketIo();
      console.log("end");
    } catch (error) {
      console.error("Error initializing Socket.IO service:", error);
    }
  }

  #connectionSocketIo() {
    this.#socketIoServer.on("connection", socket => {
      const { userId, role } = socket.handshake.query;
      console.log("New client connected:", userId, role, socket.id);

      socket.on("sessionStart", sessionId => {
        if (role === "player") return;

        console.log("Session start:", sessionId);
        console.log("Session start:", userId, role);
        this.#broadcastStartSession(sessionId);
      });

      socket.on("sessionEnd", sessionId => {
        console.log("Session ended:", sessionId);
        this.#broadcastSessionEnd(sessionId);
      });
      // socket.on("join-room", (room, userName, cb) => {
      //   console.log(`${userName} joined room: ${room}`);
      //   socket.join(room);
      //   cb();
      // });

      // socket.on("message", data => {
      //   this.#sendMessage(data, socket);
      // });

      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });
  }

  #broadcastStartSession(sessionId) {
    console.log(sessionId, "broadcastSongSelection");
    this.#socketIoServer.emit("sessionStart", sessionId);
  }

  #broadcastSessionEnd(sessionId) {
    this.#socketIoServer.emit("sessionEnd", sessionId);
  }

  // #sendMessage(data, socket) {
  //   if (data.room === "") {
  //     socket.broadcast.emit("message", `#${data.userName}: ${data.message}`);
  //   } else {
  //     socket
  //       .to(data.room)
  //       .emit("message", `#${data.userName}: ${data.message}`);
  //   }
  // }
}

function initSocketIoService() {
  if (!socketIoServiceContainer) {
    socketIoServiceContainer = new SocketIoService();
  }
  return socketIoServiceContainer;
}

export default initSocketIoService();
