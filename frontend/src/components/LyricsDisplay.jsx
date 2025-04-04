// import { useNavigate } from "react-router";
import { useSession } from "../hooks/useSession";
import HandleLyrics from "./HandleLyrics";
import { useAuthContext } from "../contexts/AuthContext";
import { useLyrics } from "../hooks/useLyrics";

const LyricsDisplay = ({ data }) => {
  // const navigate = useNavigate();
  const { endSession } = useSession();
  const { user } = useAuthContext();
  const { isAutoScrolling, setIsAutoScrolling, scrollContainerRef } =
    useLyrics();

  const toggleAutoScroll = () => {
    setIsAutoScrolling(prev => !prev);
  };

  const handleQuit = () => {
    endSession();
  };

  return (
    <div className="relative space-y-8">
      <HandleLyrics
        isAutoScrolling={isAutoScrolling}
        toggleAutoScroll={toggleAutoScroll}
        handleQuit={handleQuit}
      />
      <div
        ref={scrollContainerRef}
        className="relative p-4 mt-5 space-y-8 max-h-[calc(100vh-260px)] overflow-y-auto"
      >
        {data.map((line, lineIndex) => (
          <div key={lineIndex} className="w-full">
            {user.instrument !== "vocals" && (
              <div className="flex flex-wrap justify-start gap-x-4 gap-y-2 mb-1">
                {line.map((word, wordIndex) => (
                  <span
                    key={`chord-${wordIndex}`}
                    className="text-center text-base sm:text-lg font-semibold text-purple-600 w-fit"
                  >
                    {word.chords || "\u00A0"}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap justify-start gap-x-4 gap-y-2">
              {line.map((word, wordIndex) => (
                <span
                  key={`lyrics-${wordIndex}`}
                  className="text-center text-lg sm:text-xl font-bold text-gray-900 w-fit"
                >
                  {word.lyrics}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LyricsDisplay;
