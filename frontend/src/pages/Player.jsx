import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSocketContext } from "../contexts/SocketContext";
import Spinner from "../components/ui/Spinner";

export default function Player() {
  const [songSelected, setSongSelected] = useState(false);
  const navigate = useNavigate();
  const { socket } = useSocketContext();

  useEffect(() => {
    if (socket) {
      socket.on("songSelected", () => {
        setSongSelected(true);
        setTimeout(() => navigate("/main/live"), 1000);
      });

      return () => {
        socket.off("songSelected");
      };
    }
  }, [socket, navigate]);

  return (
    <div className="flex flex-col items-center mt-8 justify-start h-screen text-black px-4 text-center">
      <h1 className="text-xl mt-8 sm:text-2xl font-semibold animate-pulse mb-6">
        {songSelected ? "Loading song..." : "Waiting for next song"}
      </h1>
      <div className="mt-6 flex justify-center items-center h-full w-full">
        {!songSelected && <Spinner />}
      </div>
    </div>
  );
}
