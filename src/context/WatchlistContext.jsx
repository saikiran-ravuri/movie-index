/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";

const STORAGE_KEY = "movie-index-watchlist";

export const WatchlistContext = createContext(null);

function readStoredWatchlist() {
  try {
    const storedValue = localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return [];
    }

    const parsedValue = JSON.parse(storedValue);

    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch (error) {
    console.error("Failed to read watchlist from local storage:", error);
    return [];
  }
}

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(readStoredWatchlist);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
    } catch (error) {
      console.error("Failed to save watchlist to local storage:", error);
    }
  }, [watchlist]);

  function addToWatchlist(movie) {
    if (!movie?.id) {
      return;
    }

    setWatchlist((currentWatchlist) => {
      const alreadyExists = currentWatchlist.some(
        (savedMovie) => savedMovie.id === movie.id,
      );

      if (alreadyExists) {
        return currentWatchlist;
      }

      return [...currentWatchlist, movie];
    });
  }

  function removeFromWatchlist(movieId) {
    setWatchlist((currentWatchlist) =>
      currentWatchlist.filter((movie) => movie.id !== movieId),
    );
  }

  function isInWatchlist(movieId) {
    return watchlist.some((movie) => movie.id === movieId);
  }

  function toggleWatchlist(movie) {
    if (!movie?.id) {
      return;
    }

    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
      return;
    }

    addToWatchlist(movie);
  }

  const contextValue = {
    watchlist,
    watchlistCount: watchlist.length,
    addToWatchlist,
    removeFromWatchlist,
    toggleWatchlist,
    isInWatchlist,
  };

  return (
    <WatchlistContext.Provider value={contextValue}>
      {children}
    </WatchlistContext.Provider>
  );
}
