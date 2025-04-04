import { useSocketContext } from "../contexts/SocketContext";

const useSession = () => {
  const { socket } = useSocketContext();

  const endSession = () => {
    console.log("endSession");
    if (socket) {
      socket.emit("sessionEnd");
    }
  };

  const startSession = data => {
    console.log("startSession", data);

    if (socket) {
      socket.emit("sessionStart", data);
    }
  };
  return { endSession, startSession };
};

export { useSession };
