import React from "react";
import { useNavigate } from "react-router";
import { useSession } from "../hooks/useSession";
import { useAuthContext } from "../contexts/AuthContext";

function Results({ songs }) {
  const navigate = useNavigate();
  const { startSession } = useSession();
  const { user } = useAuthContext();
  const handlePlay = song => {
    startSession({ user, song });
    navigate("/main/live-page", {
      state: { songDetails: song },
    });
  };

  return (
    <div className="p-4">
      {songs && songs.length > 0 ? (
        <ul className="space-y-4 max-h-[350px] overflow-y-auto">
          {songs.map((song, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-md hover:bg-gray-200"
            >
              <span className="text-lg font-semibold">{song.song}</span>
              <span className="text-lg font-semibold">{song.artist}</span>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 flex justify-center items-center"
                onClick={() => handlePlay(song)}
              >
                <img src="/play-button.svg" className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default Results;
