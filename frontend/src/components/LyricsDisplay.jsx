import { useSession } from "../hooks/useSession";
import HandleLyrics from "./HandleLyrics";
import { useAuthContext } from "../contexts/AuthContext";
import { useLyrics } from "../hooks/useLyrics";

const LyricsDisplay = ({ data }) => {
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
        {user.instrument !== "vocals"
          ? data.reduce((acc, _, i, arr) => {
              if (i % 2 !== 0 || arr[i].type !== "chords") return acc;

              const chords = arr[i];
              const words = arr[i + 1];

              acc.push(
                <div key={i} className="w-full mb-2">
                  <div className="flex flex-wrap justify-start gap-x-4 gap-y-2 mb-1">
                    {chords.text.split(" ").map((chord, idx) => (
                      <span
                        key={`chord-${i}-${idx}`}
                        className="text-center text-base sm:text-lg font-semibold text-purple-600 w-fit"
                      >
                        {chord || "\u00A0"}
                      </span>
                    ))}
                  </div>

                  {words?.type === "words" && (
                    <div className="flex flex-wrap justify-start gap-x-4 gap-y-2">
                      {words.text.split(" ").map((word, idx) => (
                        <span
                          key={`word-${i}-${idx}`}
                          className="text-center text-lg sm:text-xl font-bold text-gray-900 w-fit"
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );

              return acc;
            }, [])
          : data
              .filter(line => line.type === "words")
              .map((line, idx) => (
                <div
                  key={idx}
                  className="flex flex-wrap justify-start gap-x-4 gap-y-2 mb-2"
                >
                  {line.text.split(" ").map((word, i) => (
                    <span
                      key={`word-${idx}-${i}`}
                      className="text-center text-lg sm:text-xl font-bold text-gray-900 w-fit"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              ))}
      </div>
    </div>
  );
};

export default LyricsDisplay;
