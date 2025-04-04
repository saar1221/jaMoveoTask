import { useState, useEffect, useRef } from "react";

export function useLyrics() {
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (isAutoScrolling && scrollContainerRef.current) {
      const scrollInterval = setInterval(() => {
        scrollContainerRef.current.scrollTop += 1;
      }, 20);
      return () => clearInterval(scrollInterval);
    }
  }, [isAutoScrolling]);

  return { isAutoScrolling, setIsAutoScrolling, scrollContainerRef };
}
