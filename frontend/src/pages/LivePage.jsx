import React, { useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useSong } from "../hooks/useSong";
import { useLocation } from "react-router";
import LyricsDisplay from "../components/LyricsDisplay";

const LivePage = () => {
  let { song, getSong } = useSong();
  const { user } = useAuthContext();
  const location = useLocation();
  const songDetails = location.state?.songDetails;

  useEffect(() => {
    async function fetchSong() {
      await getSong(songDetails);
    }
    fetchSong();
  }, [songDetails]);

  return (
    <div className="p-4 flex flex-col items-center">
      <header className="bg-gray-800 text-white p-4 rounded-md w-full text-center">
        <h1 className="text-xl font-bold">
          {songDetails.song} - {songDetails.artist}
        </h1>
      </header>

      <div className="w-full flex flex-col items-center justify-center w-full h-full overflow-y-auto">
        <LyricsDisplay data={song} role={user.role} />
      </div>
    </div>
  );
};

export default LivePage;
