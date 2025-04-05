import { useState } from "react";
import apiRequest from "../api/apiRequest";
import toast from "react-hot-toast";

export function useSong() {
  const [loading, setLoading] = useState(false);
  const [song, setSong] = useState([]);

  const getSong = async songData => {
    if (!songData) {
      toast.error(`Error fetching song ${songData}`);
      return;
    }
    setLoading(true);
    try {
      const response = await apiRequest({
        url: `/songs/getSong/?songName=${songData.song}`,
        method: "GET",
      });
      setSong(response.lyrics);

      if (response?.error) {
        toast.error("Data error in login hook");
        throw new Error(response.error);
      }
      return response.lyrics;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, getSong, song, setSong };
}
