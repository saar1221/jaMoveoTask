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
      console.error(error);
    }
  }

  #initServer(app) {
    //for https secure protocol
    const options = {
      key: readFileSync(process.env.SSL_KEY_PATH, "utf8"),
      cert: readFileSync(process.env.SSL_CERT_PATH, "utf8"),
    };

    const httpsServer = createServer(options, app);

    this.#socketIoServer = new Server(httpsServer, {
      //   path: "/my-custom-path/",
      cors: {
        origin:
          process.env.NODE_ENV === "production"
            ? false
            : ["https://localhost:5173"],
      },
    });

    httpsServer.listen(process.env.SERVER_PORT, () => {
      console.log(
        `Socket.IO server is running on https://localhost:${process.env.SERVER_PORT}`
      );
    });
  }

  #connectionSocketIo() {
    this.#socketIoServer.on("connection", socket => {
      //   const clientIp = socket.handshake.address;
      //   console.log("🔗 new Connecting:", clientIp, "ID:", socket.id);

      //   if (this.#connectedClients.has(clientIp)) {
      //     console.log("⚠️ is all ready Connect ", clientIp);
      //     this.#connectedClients.get(clientIp).disconnect(true);
      //   }

      //   this.#connectedClients.set(clientIp, socket);
      socket.on("message", data => {
        console.log("", data);

        if (data.room === "") {
          socket.broadcast.emit(
            "message",
            `#${data.userName}#: ${data.message}`
          );
          return;
        }
        socket
          .to(data.room)
          .emit("message", `#${data.userName}#: ${data.message}`);
      });

      socket.on("join-room", (room, userName, cb) => {
        console.log("join-roo   m", room, `${socket} join to the room!`);
        socket.join(room);
        cb();
        // socket.broadcast.emit("message", `this is from the backend  ${data}`);
      });
      socket.on("disconnect", () => {
        // console.log("❌ disconnect customer:", clientIp);
        // this.#connectedClients.delete(clientIp);
      });

      //   socket.on("disconnect", () => console.log("❌disconnect customer"));
    });

    //     this.#socketIoServer.on("connection", socket => {
    //       console.log(`New client connected: ${socket.id}`);

    //       socket.on("subscribe", this.subscribe);
    //       socket.on("unsubscribe", this.unsubscribe);

    //       socket.on("disconnect", () => {
    //         console.log(`Client disconnected: ${socket.id}`);
    //       });
    //     });
  }

  //    socket.on("joinRoom", ({ roomId }) => {
  //     if (!roomId) {
  //       console.error("Error: roomId is undefined in joinRoom event");
  //       socket.disconnect();
  //       return;
  //     }

  //     socket.join(roomId);

  subscribe(socket, channel) {
    console.log(`Socket ${socket.id} subscribed to ${channel}`);
    socket.join(channel);
  }

  unsubscribe(socket, channel) {
    console.log(`Socket ${socket.id} unsubscribed from ${channel}`);
    socket.leave(channel);
  }
}

function initSocketIoService() {
  if (!socketIoServiceContainer) {
    socketIoServiceContainer = new SocketIoService();
  }
  return socketIoServiceContainer;
}
export default initSocketIoService();
