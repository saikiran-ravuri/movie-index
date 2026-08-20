import { Bookmark, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useWatchlist } from "../../hooks/useWatchlist";
import { getPosterUrl } from "../../utils/image";

function MovieCard({ movie }) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [hasImageError, setHasImageError] = useState(false);

  const releaseYear = movie.release_date?.slice(0, 4) || "N/A";
  const rating = Number(movie.vote_average || 0).toFixed(1);
  const posterUrl = getPosterUrl(movie.poster_path);
  const isSaved = isInWatchlist(movie.id);

  function handleWatchlistClick(event) {
    event.preventDefault();
    event.stopPropagation();
    toggleWatchlist(movie);
  }

  const shouldShowImage = posterUrl && !hasImageError;

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="relative block overflow-hidden rounded-xl border border-[#e6dcc8] bg-white transition-colors hover:border-[#b8862d]"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-[#f1ece4]">
        {shouldShowImage ? (
          <img
            src={posterUrl}
            alt=""
            loading="lazy"
            onLoad={() => setIsImageLoaded(true)}
            onError={() => setHasImageError(true)}
            className={`h-full w-full object-cover transition-opacity duration-300 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[#f8f4ec] text-xs text-stone-500">
            No Poster
          </div>
        )}

        <button
          type="button"
          onClick={handleWatchlistClick}
          aria-label={isSaved ? "Remove from watchlist" : "Add to watchlist"}
          className={`absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full border transition-colors ${
            isSaved
              ? "border-[#b8862d] bg-[#b8862d] text-white"
              : "border-[#e6dcc8] bg-white/90 text-stone-700 hover:border-[#b8862d] hover:bg-[#b8862d] hover:text-white"
          }`}
        >
          <Bookmark size={14} fill={isSaved ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="p-3">
        <h3 className="truncate text-sm font-semibold text-[#1f2329]">
          {movie.title}
        </h3>

        <div className="mt-2 flex items-center justify-between border-t border-[#f0eae1] pt-2 text-xs text-stone-500">
          <span className="flex items-center gap-1 font-semibold text-[#b8862d]">
            <Star size={12} fill="currentColor" />
            {rating}
          </span>
          <span>{releaseYear}</span>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;

