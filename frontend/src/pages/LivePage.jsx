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

  // useEffect(() => {
  //   console.log(song, "songsongsongsong");
  //   async function fetchSong() {
  //     const fetch = await getSong(songDetails);
  //     console.log(fetch, "fetch");
  //     // setSongData(fetch);
  //   }
  //   // if (song) return;
  //   fetchSong();
  //   // return () => {
  //   //   setSong(null);
  //   // };
  // }, [song, songDetails, getSong, setSong]);
  // // }, [songDetails]);

  useEffect(() => {
    async function fetchSong() {
      const fetched = await getSong(songDetails);
      console.log(fetched, "fetch");
    }
    fetchSong();
  }, [songDetails]);

  // const scrollToBottom = () => {
  //   if (autoScroll) {
  //     const scrollHeight = document.documentElement.scrollHeight;
  //     window.scrollTo(0, scrollHeight);
  //   }
  // };

  // useEffect(() => {
  //   if (autoScroll) {
  //     const intervalId = setInterval(scrollToBottom, 100);
  //     return () => clearInterval(intervalId);
  //   }
  // }, [autoScroll]);

  // if (!song) return null;

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
