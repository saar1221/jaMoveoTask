import { useState } from "react";
import { useNavigate } from "react-router";
import Results from "./Result";

const Admin = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const songs = [
    { id: 1, title: "Hey Jude" },
    { id: 2, title: "תפילות" },
  ];
  const handleSearch = async e => {
    e.preventDefault();

    if (query.trim()) {
      try {
        // שליחת בקשה ל-backend
        const response = await fetch(
          `http://localhost:4000/api/songs?search=${encodeURIComponent(query)}`
        );
        if (response.ok) {
          const data = await response.json(); // הנחה שהתגובה היא JSON
          console.log(data);

          navigate(`/admin-result?search=${encodeURIComponent(query)}`, {
            state: { songs: data },
          });
        } else {
          console.error("Error fetching songs:", response.statusText);
        }
      } catch (error) {
        console.error("Request failed:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-light-gold px-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-black">
        Search any song...
      </h1>
      <form onSubmit={handleSearch} className="w-full max-w-md">
        <input
          type="text"
          placeholder="Enter song name..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md text-black"
        />
        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-black py-2 rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      <Results songs={songs} />
    </div>
  );
};

export default Admin;
