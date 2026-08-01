import { Bookmark } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useWatchlist } from "../../hooks/useWatchlist";
import { getPosterUrl } from "../../utils/image";

function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [hasImageError, setHasImageError] = useState(false);

  const releaseYear = movie.release_date?.slice(0, 4) || "N/A";
  const rating = Number(movie.vote_average || 0).toFixed(1);
  const posterUrl = getPosterUrl(movie.poster_path);
  const isSaved = isInWatchlist(movie.id);

  function handleMovieClick() {
    navigate(`/movie/${movie.id}`);
  }

  function handleWatchlistClick(event) {
    event.stopPropagation();
    toggleWatchlist(movie);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleMovieClick();
    }
  }

  const shouldShowImage = posterUrl && !hasImageError;

  return (
    <article
      role="link"
      tabIndex={0}
      onClick={handleMovieClick}
      onKeyDown={handleKeyDown}
      aria-label={`View details for ${movie.title}`}
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-[#E7DED0] bg-white shadow-[0_2px_8px_rgba(67,52,35,0.05)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#C58B2A]/35 hover:shadow-[0_10px_24px_rgba(67,52,35,0.12)] focus:outline-none focus:ring-4 focus:ring-[#B8862D]/20"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-[#F1ECE4]">
        {shouldShowImage && !isImageLoaded && (
          <div
            aria-hidden="true"
            className="absolute inset-0 animate-pulse bg-[#E8E0D4]"
          />
        )}

        {shouldShowImage ? (
          <img
            src={posterUrl}
            alt=""
            loading="lazy"
            decoding="async"
            onLoad={() => setIsImageLoaded(true)}
            onError={() => {
              setHasImageError(true);
              setIsImageLoaded(false);
            }}
            className={`h-full w-full object-cover transition-all duration-500 ease-out group-hover:scale-[1.025] ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[linear-gradient(145deg,#F2EADF_0%,#E7DCCB_100%)] px-5 text-center">
            <div>
              <p className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#8D672A]">
                Movie Index
              </p>

              <div className="mx-auto mt-3 h-px w-12 bg-[#B8862D]/35" />

              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-500">
                Poster unavailable
              </p>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={handleWatchlistClick}
          aria-label={
            isSaved
              ? `Remove ${movie.title} from watchlist`
              : `Add ${movie.title} to watchlist`
          }
          aria-pressed={isSaved}
          className={`absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border shadow-[0_6px_16px_rgba(0,0,0,0.20)] backdrop-blur-md transition duration-300 focus:outline-none focus:ring-4 focus:ring-[#D5A64E]/30 ${
            isSaved
              ? "border-[#D5A64E] bg-[#C58B2A] text-white"
              : "border-white/25 bg-[#1F2329]/70 text-white hover:border-[#D5A64E] hover:bg-[#C58B2A]"
          }`}
        >
          <Bookmark
            size={18}
            fill={isSaved ? "currentColor" : "none"}
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="px-3.5 py-3">
        <h3 className="line-clamp-2 min-h-10 text-[14px] font-semibold leading-5 text-stone-900 transition-colors duration-300 group-hover:text-[#9B6417]">
          {movie.title}
        </h3>

        <div className="mt-3 flex items-center justify-between border-t border-[#F0EAE1] pt-2.5">
          <div className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="text-[14px] leading-none text-[#C4871F]"
            >
              ★
            </span>

            <span className="text-[13px] font-semibold text-stone-800">
              {rating}
            </span>
          </div>

          <span className="text-[13px] font-medium text-stone-500">
            {releaseYear}
          </span>
        </div>
      </div>
    </article>
  );
}

export default MovieCard;
