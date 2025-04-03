import React from "react";

function Results({ songs }) {
  function handlePlay(songId) {
    console.log(`Playing song with ID: ${songId}`);
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Results</h1>
      {songs && songs.length > 0 ? (
        <ul className="space-y-4">
          {songs.map(song => (
            <li
              key={song.id}
              className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-md hover:bg-gray-200"
            >
              <span className="text-lg font-semibold">{song.title}</span>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 flex justify-center items-center"
                onClick={() => handlePlay(song.id)}
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
