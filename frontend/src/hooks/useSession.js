import { useSocketContext } from "../contexts/SocketContext";

const useSession = () => {
  const { socket } = useSocketContext();

  const endSession = () => {
    if (socket) {
      socket.emit("sessionEnd");
    }
  };

  const startSession = data => {
    if (socket) {
      socket.emit("sessionStart", data);
    }
  };
  return { endSession, startSession };
};

export { useSession };
