import { useState } from "react";
import Results from "./Result";
import apiRequest from "../../api/apiRequest";

const Admin = () => {
  const [searchInput, setSearchInput] = useState("");
  const [songs, setSongs] = useState([]);

  const handleSearch = async e => {
    e.preventDefault();

    if (searchInput.trim()) {
      try {
        const response = await apiRequest({
          method: "GET",
          url: "/songs/findSongs",
          params: { query: encodeURIComponent(searchInput) },
        });

        setSongs(response.filteredSongs);
      } catch (error) {
        console.error("Request failed:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-light-gold px-4 ">
      <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-black">
        Search any song...
      </h3>
      <form onSubmit={handleSearch} className="w-full flex max-w-md">
        <input
          type="text"
          placeholder="Enter song name..."
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-l-md text-black mr-2"
        />
        <button
          type="submit"
          className="p-3 text-black rounded-r-md hover:bg-gray-800 transition"
        >
          Search
        </button>
      </form>

      <Results songs={songs} />
    </div>
  );
};

export default Admin;
