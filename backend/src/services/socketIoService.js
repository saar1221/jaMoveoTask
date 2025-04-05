let socketIoServiceContainer = null;

class SocketIoService {
  #socketIoServer;
  #adminSocketList = [];

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
      if (userId != "undefined" && role == "admin") {
        this.#adminSocketList.push(socket.id);
      }
      console.log("New client connected:", userId, role, socket.id);

      socket.on("sessionStart", ({ sessionId, song }) => {
        console.log("Session start:", sessionId);
        this.#broadcastStartSession({ sessionId, song });
      });

      socket.on("sessionEnd", sessionId => {
        console.log("Session ended:", sessionId);
        this.#broadcastSessionEnd(sessionId);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected ", socket.id);
        if (this.#adminSocketList.includes(socket.id)) {
          this.#socketIoServer.emit("sessionEnd");
        }
      });
    });
  }

  #broadcastStartSession(sessionData) {
    this.#socketIoServer.emit("sessionStart", sessionData);
  }

  #broadcastSessionEnd(sessionData) {
    this.#socketIoServer.emit("sessionEnd", sessionData);
  }
}

function initSocketIoService() {
  if (!socketIoServiceContainer) {
    socketIoServiceContainer = new SocketIoService();
  }
  return socketIoServiceContainer;
}

export default initSocketIoService();
