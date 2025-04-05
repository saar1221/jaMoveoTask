const LyricsOnly = ({ data }) => {
  return data
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
    ));
};

export default LyricsOnly;
