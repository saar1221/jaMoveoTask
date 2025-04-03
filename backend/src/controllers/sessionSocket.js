const sessionSockets = io => {
  io.on("connection", socket => {
    console.log(`User connected: ${socket.id}`);

    socket.on("joinSession", ({ sessionId, userId }) => {
      socket.join(sessionId);
      io.to(sessionId).emit("userJoined", { userId });
    });

    socket.on("leaveSession", ({ sessionId, userId }) => {
      socket.leave(sessionId);
      io.to(sessionId).emit("userLeft", { userId });
    });

    socket.on("selectSong", ({ sessionId, song }) => {
      io.to(sessionId).emit("newSong", song);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

export default sessionSockets;
