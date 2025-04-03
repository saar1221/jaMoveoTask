import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { io } from "socket.io-client";
import Spinner from "../components/ui/Spinner";

const socket = io("http://localhost:4000");

export default function Player() {
  const [songSelected, setSongSelected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // מאזין לאירוע מהשרת כאשר האדמין בוחר שיר
    socket.on("songSelected", () => {
      setSongSelected(true);
      setTimeout(() => navigate("/main/live"), 1000); // נווט לדף ה-Live
    });

    return () => {
      socket.off("songSelected"); // נקה את המאזין ביציאה מהדף
    };
  }, [navigate]);

  return (
    <div className="flex flex-col items-center mt-8 justify-start h-screen  text-black px-4 text-center">
      <h1 className="text-xl mt-8 sm:text-2xl font-semibold animate-pulse mb-6">
        {songSelected ? "Loading song..." : "Waiting for next song"}
      </h1>
      <div className="mt-6 flex justify-center items-center h-full w-full">
        {!songSelected && <Spinner />}
      </div>
    </div>
  );
}
