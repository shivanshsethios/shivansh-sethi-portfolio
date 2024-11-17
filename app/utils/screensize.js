import { useState, useEffect } from "react";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handler = () => setMatches(mediaQuery.matches);

    handler(); // Set initial value
    mediaQuery.addEventListener("change", handler); // Listen for changes

    return () => mediaQuery.removeEventListener("change", handler); // Cleanup
  }, [query]);

  return matches;
};

export default useMediaQuery;