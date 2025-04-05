import { useSession } from "../hooks/useSession";
import HandleLyrics from "./HandleLyrics";
import { useAuthContext } from "../contexts/AuthContext";
import { useLyrics } from "../hooks/useLyrics";
import LyricsWithChords from "./LyricsWithChords";
import LyricsOnly from "./LyricsOnly";

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
        {user.instrument !== "vocals" ? (
          <LyricsWithChords data={data} />
        ) : (
          <LyricsOnly data={data} />
        )}
      </div>
    </div>
  );
};

export default LyricsDisplay;
