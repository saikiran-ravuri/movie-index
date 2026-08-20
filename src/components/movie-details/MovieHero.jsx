import { Bookmark, BookmarkCheck } from "lucide-react";
import { useState } from "react";

import Container from "../common/Container";
import { useWatchlist } from "../../hooks/useWatchlist";
import { getBackdropUrl, getPosterUrl } from "../../utils/image";

function MovieHero({ movie }) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  const [isBackdropLoaded, setIsBackdropLoaded] = useState(false);
  const [hasBackdropError, setHasBackdropError] = useState(false);
  const [isPosterLoaded, setIsPosterLoaded] = useState(false);
  const [hasPosterError, setHasPosterError] = useState(false);

  const backdropUrl = getBackdropUrl(movie.backdrop_path);
  const posterUrl = getPosterUrl(movie.poster_path);

  const releaseYear = movie.release_date?.slice(0, 4) || "N/A";
  const rating = Number(movie.vote_average || 0).toFixed(1);
  const saved = isInWatchlist(movie.id);

  const runtimeHours = Math.floor((movie.runtime || 0) / 60);
  const runtimeMinutes = (movie.runtime || 0) % 60;
  const formattedRuntime = movie.runtime
    ? `${runtimeHours}h ${runtimeMinutes}m`
    : "N/A";

  const shouldShowBackdrop = backdropUrl && !hasBackdropError;
  const shouldShowPoster = posterUrl && !hasPosterError;

  function handleWatchlistClick() {
    toggleWatchlist(movie);
  }

  return (
    <section className="bg-[#f8f4ec] py-6 sm:py-8 lg:py-10">
      <Container>
        <article className="relative overflow-hidden rounded-2xl border border-[#e6dcc8] bg-[#1f2329]">
          {shouldShowBackdrop && (
            <img
              src={backdropUrl}
              alt=""
              aria-hidden="true"
              onLoad={() => setIsBackdropLoaded(true)}
              onError={() => setHasBackdropError(true)}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 opacity-60 ${
                isBackdropLoaded ? "opacity-60" : "opacity-0"
              }`}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#1f2329] via-[#1f2329]/80 to-transparent" />

          <div className="relative z-10 p-6 sm:p-8 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-end lg:gap-10 xl:grid-cols-[260px_minmax(0,1fr)]">
              <div className="mx-auto w-full max-w-[220px] lg:mx-0 lg:max-w-none">
                <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-[#e6dcc8]/30 bg-white/5">
                  {shouldShowPoster ? (
                    <img
                      src={posterUrl}
                      alt={`${movie.title} poster`}
                      onLoad={() => setIsPosterLoaded(true)}
                      onError={() => setHasPosterError(true)}
                      className={`h-full w-full object-cover transition-opacity duration-300 ${
                        isPosterLoaded ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[#1f2329] text-xs text-stone-400">
                      Poster unavailable
                    </div>
                  )}
                </div>
              </div>

              <div className="max-w-3xl">
                <h1 className="font-['Cormorant_Garamond'] text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                  {movie.title}
                </h1>

                {movie.tagline && (
                  <p className="mt-2 font-['Cormorant_Garamond'] text-lg italic text-stone-300">
                    "{movie.tagline}"
                  </p>
                )}

                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-stone-200">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 border border-white/15">
                    <span className="text-[#b8862d]">★</span>
                    {rating} / 10
                  </span>

                  <span className="rounded-full bg-white/10 px-3 py-1 border border-white/15">
                    {releaseYear}
                  </span>

                  <span className="rounded-full bg-white/10 px-3 py-1 border border-white/15">
                    {formattedRuntime}
                  </span>

                  {movie.status && (
                    <span className="rounded-full bg-white/10 px-3 py-1 border border-white/15">
                      {movie.status}
                    </span>
                  )}
                </div>

                {movie.genres?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="rounded-full border border-[#b8862d]/40 bg-[#b8862d]/10 px-3 py-1 text-xs font-medium text-[#e6dcc8]"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-6">
                  <h2 className="font-['Cormorant_Garamond'] text-2xl font-bold text-white">
                    Overview
                  </h2>

                  <p className="mt-2 text-sm text-stone-300 leading-relaxed sm:text-base">
                    {movie.overview || "Movie description is currently unavailable."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleWatchlistClick}
                  aria-pressed={saved}
                  className={`mt-6 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${
                    saved
                      ? "border border-white/20 bg-white/15 text-white hover:bg-white/25"
                      : "bg-[#b8862d] text-white hover:bg-[#9b6417]"
                  }`}
                >
                  {saved ? (
                    <BookmarkCheck size={16} aria-hidden="true" />
                  ) : (
                    <Bookmark size={16} aria-hidden="true" />
                  )}
                  {saved ? "In Watchlist" : "Add to Watchlist"}
                </button>
              </div>
            </div>
          </div>
        </article>
      </Container>
    </section>
  );
}

export default MovieHero;

