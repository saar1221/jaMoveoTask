import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const Live = ({ songId }) => {
  const { user } = useAuth();
  const { role } = user;

  console.log(role, "Live");

  const navigate = useNavigate();

  const [autoScroll, setAutoScroll] = useState(false);
  const [song, setSong] = useState({
    name: "Imagine",
    artist: "John Lennon",
    lyrics: `Imagine there's no heaven
  It's easy if you try
  No hell below us
  Above us, only sky
  Imagine all the people
  Living for today...`,
    chords: `C      Cmaj7    F
  Imagine there's no heaven
  C      Cmaj7    F
  It's easy if you try
  C      Cmaj7    F
  No hell below us
  C      Cmaj7    F
  Above us, only sky`,
  });

  // חיפוש השיר לפי songId
  useEffect(() => {
    // const selectedSong = songsData.find(song => song.id === songId);
    // setSong(selectedSong);
  }, [songId]);

  const toggleAutoScroll = () => {
    setAutoScroll(!autoScroll);
  };

  const handleQuit = () => {
    navigate(-1);
  };

  const scrollToBottom = () => {
    if (autoScroll) {
      const scrollHeight = document.documentElement.scrollHeight;
      window.scrollTo(0, scrollHeight);
    }
  };

  useEffect(() => {
    if (autoScroll) {
      const intervalId = setInterval(scrollToBottom, 100);
      return () => clearInterval(intervalId);
    }
  }, [autoScroll]);

  if (!song) return null;

  return (
    <div className="p-4 flex flex-col items-center">
      <header className="bg-gray-800 text-white p-4 rounded-md w-full text-center">
        <h1 className="text-xl font-bold">
          {song.name} - {song.artist}
        </h1>
      </header>

      <div className="mt-4 w-full flex flex-col items-center">
        {role === "singer" ? (
          <div className="bg-gray-100 p-4 rounded-md w-full max-w-2xl overflow-y-auto max-h-96">
            <pre className="whitespace-pre-wrap">{song.lyrics}</pre>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row bg-gray-100 p-4 rounded-md w-full max-w-2xl overflow-y-auto max-h-96">
            <pre className="whitespace-pre-wrap flex-1 p-2">{song.lyrics}</pre>
            <pre className="whitespace-pre-wrap flex-1 p-2 border-l border-gray-300">
              {song.chords}
            </pre>
          </div>
        )}
      </div>

      <div className="mt-4">
        <button
          onClick={toggleAutoScroll}
          className="bg-black text-black px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          {autoScroll ? "Stop Auto-Scroll" : "Start Auto-Scroll"}
        </button>
      </div>

      {role === "admin" && (
        <div className="mt-4">
          <button
            onClick={handleQuit}
            className="bg-black text-black px-4 py-2 rounded-md hover:bg-gray-800 transition"
          >
            Quit
          </button>
        </div>
      )}
    </div>
  );
};

export default Live;
