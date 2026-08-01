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
    <section className="bg-[#F7F2E9] py-5 sm:py-7 lg:py-10">
      <Container>
        <article className="relative overflow-hidden rounded-[26px] border border-[#D9C9AE] bg-[#111419] shadow-[0_18px_45px_rgba(50,38,24,0.16)] sm:rounded-3xl">
          {shouldShowBackdrop && (
            <>
              {!isBackdropLoaded && (
                <div className="absolute inset-0 animate-pulse bg-[linear-gradient(110deg,#171A1F_20%,#2A2E35_45%,#171A1F_70%)]" />
              )}

              <img
                src={backdropUrl}
                alt=""
                aria-hidden="true"
                loading="eager"
                decoding="async"
                onLoad={() => setIsBackdropLoaded(true)}
                onError={() => {
                  setHasBackdropError(true);
                  setIsBackdropLoaded(false);
                }}
                className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 lg:object-[center_30%] ${
                  isBackdropLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            </>
          )}

          {!shouldShowBackdrop && (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(213,166,78,0.18),transparent_32%),linear-gradient(135deg,#111419_0%,#26231E_55%,#17191D_100%)]" />
          )}

          <div className="absolute inset-0 bg-gradient-to-r from-[#101318]/95 via-[#101318]/78 to-[#101318]/28" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101318]/96 via-[#101318]/28 to-[#101318]/18" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_22%,rgba(213,166,78,0.11),transparent_38%)]" />

          <div className="relative z-10 px-6 py-8 sm:px-9 sm:py-10 lg:px-14 lg:py-14 xl:px-16">
            <div className="grid gap-9 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-end lg:gap-12 xl:grid-cols-[285px_minmax(0,1fr)] xl:gap-14">
              <div className="mx-auto w-full max-w-[220px] sm:max-w-[250px] lg:mx-0 lg:max-w-none">
                <div className="relative">
                  <div className="absolute -inset-3 rounded-[30px] bg-[#D5A64E]/15 blur-xl" />

                  <div className="relative aspect-[2/3] overflow-hidden rounded-3xl border border-[#D5A64E]/40 bg-white/5 shadow-[0_18px_40px_rgba(0,0,0,0.30)]">
                    {shouldShowPoster && !isPosterLoaded && (
                      <div className="absolute inset-0 animate-pulse bg-white/10" />
                    )}

                    {shouldShowPoster ? (
                      <img
                        src={posterUrl}
                        alt={`${movie.title} poster`}
                        loading="eager"
                        decoding="async"
                        width="500"
                        height="750"
                        onLoad={() => setIsPosterLoaded(true)}
                        onError={() => {
                          setHasPosterError(true);
                          setIsPosterLoaded(false);
                        }}
                        className={`h-full w-full object-cover transition-opacity duration-500 ${
                          isPosterLoaded ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[linear-gradient(145deg,#2A2824_0%,#17191D_100%)] px-6 text-center">
                        <div>
                          <p className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#D5A64E]">
                            Movie Index
                          </p>

                          <div className="mx-auto mt-3 h-px w-12 bg-[#D5A64E]/35" />

                          <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45">
                            Poster unavailable
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="max-w-[820px]">
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#D5A64E] sm:text-sm">
                  Movie Details
                </p>

                <h1 className="mt-4 font-['Cormorant_Garamond'] text-4xl font-bold leading-[0.96] text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                  {movie.title}
                </h1>

                {movie.tagline && (
                  <p className="mt-4 max-w-3xl font-['Cormorant_Garamond'] text-lg italic leading-7 text-white/70 sm:text-xl sm:leading-8">
                    “{movie.tagline}”
                  </p>
                )}

                <div className="mt-6 flex flex-wrap gap-2.5">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                    <span aria-hidden="true" className="text-[#E0AD4D]">
                      ★
                    </span>

                    {rating}

                    <span className="font-medium text-white/55">/ 10</span>
                  </span>

                  <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur-sm">
                    {releaseYear}
                  </span>

                  <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur-sm">
                    {formattedRuntime}
                  </span>

                  <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur-sm">
                    {movie.status || "Status unavailable"}
                  </span>
                </div>

                {movie.genres?.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="rounded-full border border-[#D5A64E]/45 bg-[#D5A64E]/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#E8C476]"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-7 max-w-[720px] sm:mt-8">
                  <h2 className="font-['Cormorant_Garamond'] text-3xl font-bold text-white">
                    Overview
                  </h2>

                  <p className="mt-3 text-[15px] leading-7 text-white/75 sm:text-base sm:leading-8 lg:text-lg lg:leading-9">
                    {movie.overview ||
                      "Movie description is currently unavailable."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleWatchlistClick}
                  aria-pressed={saved}
                  className={`mt-7 inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold shadow-[0_8px_20px_rgba(0,0,0,0.14)] transition duration-300 focus:outline-none focus:ring-4 focus:ring-[#D5A64E]/30 sm:mt-8 ${
                    saved
                      ? "border-[#D5A64E] bg-[#D5A64E] text-[#1F2329] hover:-translate-y-0.5 hover:bg-[#E3B45D]"
                      : "border-white/25 bg-white/10 text-white backdrop-blur-sm hover:-translate-y-0.5 hover:border-[#D5A64E] hover:bg-[#D5A64E] hover:text-[#1F2329]"
                  }`}
                >
                  {saved ? (
                    <BookmarkCheck size={18} aria-hidden="true" />
                  ) : (
                    <Bookmark size={18} aria-hidden="true" />
                  )}

                  {saved ? "Remove from Watchlist" : "Add to Watchlist"}
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
