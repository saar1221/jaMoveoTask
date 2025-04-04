import { useState } from "react";
import apiRequest from "../api/apiRequest";

export function useSong() {
  const [loading, setLoading] = useState(false);
  const [song, setSong] = useState([]);

  const getSong = async songData => {
    console.log("songData", songData);
    if (!songData) {
      console.log("Error fetching song ", songData);
      return;
    }
    setLoading(true);
    try {
      const response = await apiRequest({
        url: `/songs/getSong/?songName=${songData.song}`,
        method: "GET",
      });
      setSong(response);

      if (response?.error) {
        console.log("Data error in login hook");
        throw new Error(response.error);
      }
      return response;
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, getSong, song, setSong };
}
