/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "movie-index-watchlist";

export const WatchlistContext = createContext(null);

function readStoredWatchlist() {
  try {
    const storedValue = localStorage.getItem(STORAGE_KEY);
    if (!storedValue) return [];

    const parsedValue = JSON.parse(storedValue);
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch (error) {
    console.error("failed to read watchlist from local storage:", error);
    return [];
  }
}

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(readStoredWatchlist);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
    } catch (error) {
      console.error("failed to save watchlist to local storage:", error);
    }
  }, [watchlist]);

  const addToWatchlist = useCallback((movie) => {
    if (!movie?.id) return;

    setWatchlist((current) => {
      const exists = current.some((item) => item.id === movie.id);
      return exists ? current : [...current, movie];
    });
  }, []);

  const removeFromWatchlist = useCallback((movieId) => {
    setWatchlist((current) => current.filter((item) => item.id !== movieId));
  }, []);

  const isInWatchlist = useCallback(
    (movieId) => watchlist.some((item) => item.id === movieId),
    [watchlist],
  );

  const toggleWatchlist = useCallback(
    (movie) => {
      if (!movie?.id) return;
      if (isInWatchlist(movie.id)) {
        removeFromWatchlist(movie.id);
      } else {
        addToWatchlist(movie);
      }
    },
    [isInWatchlist, removeFromWatchlist, addToWatchlist],
  );

  const value = useMemo(
    () => ({
      watchlist,
      watchlistCount: watchlist.length,
      addToWatchlist,
      removeFromWatchlist,
      toggleWatchlist,
      isInWatchlist,
    }),
    [watchlist, addToWatchlist, removeFromWatchlist, toggleWatchlist, isInWatchlist],
  );

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
}

