import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSocketContext } from "../contexts/SocketContext";
import Spinner from "../components/ui/Spinner";

const Player = () => {
  const navigate = useNavigate();
  const { sessionActive } = useSocketContext();

  useEffect(() => {
    if (sessionActive) {
      setTimeout(() => navigate("/main/live"), 1000);
    }
  }, [sessionActive, navigate]);

  return (
    <div className="flex flex-col items-center mt-8 justify-start h-screen text-black px-4 text-center">
      <h1 className="text-xl mt-8 sm:text-2xl font-semibold animate-pulse mb-6">
        {sessionActive ? "Loading song..." : "Waiting for next song"}
      </h1>
      <div className="mt-6 flex justify-center items-center h-full w-full">
        {!sessionActive && <Spinner />}
      </div>
    </div>
  );
};

export default Player;
