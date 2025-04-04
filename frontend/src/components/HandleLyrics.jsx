import React from "react";
import { useAuthContext } from "../contexts/AuthContext";

const HandleLyrics = ({ isAutoScrolling, toggleAutoScroll, handleQuit }) => {
  const { user } = useAuthContext();
  return (
    <div className="mt-2 w-full flex justify-center items-center gap-4 z-50">
      <button
        onClick={toggleAutoScroll}
        className="bg-black text-black px-4 py-2 rounded-md hover:bg-gray-800 transition"
      >
        {isAutoScrolling ? "Stop Auto-Scroll" : "Start Auto-Scroll"}
      </button>

      {user.role === "admin" && (
        <button
          onClick={handleQuit}
          className="bg-black text-black px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          Quit
        </button>
      )}
    </div>
  );
};

export default HandleLyrics;
