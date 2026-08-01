import { Bookmark, Compass } from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../components/common/Container";
import MovieCard from "../components/movies/MovieCard";
import { useWatchlist } from "../hooks/useWatchlist";

function Watchlist() {
  const { watchlist, watchlistCount } = useWatchlist();

  const hasMovies = watchlistCount > 0;

  return (
    <main className="min-h-[70vh] bg-[#F7F2E9] py-12 sm:py-16 lg:py-20">
      <Container>
        <section aria-labelledby="watchlist-heading">
          <div className="mb-8 flex flex-col gap-6 sm:mb-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#9B6417] sm:text-sm">
                Your Collection
              </p>

              <h1
                id="watchlist-heading"
                className="mt-3 font-['Cormorant_Garamond'] text-5xl font-bold leading-none text-[#1F2329] sm:text-6xl"
              >
                Watchlist
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base sm:leading-8 lg:text-lg">
                Save movies you want to revisit and keep them together in one
                persistent collection.
              </p>
            </div>

            {hasMovies && (
              <span className="w-fit rounded-full border border-[#E2D3BC] bg-white px-4 py-2 text-sm font-medium text-stone-600 shadow-[0_4px_14px_rgba(67,52,35,0.05)]">
                {watchlistCount} {watchlistCount === 1 ? "Movie" : "Movies"}
              </span>
            )}
          </div>

          {hasMovies ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
              {watchlist.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-[30px] border border-[#E2D3BC] bg-white px-6 py-16 text-center shadow-[0_8px_24px_rgba(67,52,35,0.06)] sm:px-10 sm:py-20">
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#B8862D]/8 blur-3xl" />

              <div className="relative z-10 mx-auto max-w-xl">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#E8DBC7] bg-[#F7F0E4] text-[#B8862D] shadow-[0_8px_20px_rgba(67,52,35,0.06)]">
                  <Bookmark size={28} aria-hidden="true" />
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-[#9B6417]">
                  Nothing saved yet
                </p>

                <h2 className="mt-3 font-['Cormorant_Garamond'] text-3xl font-bold leading-tight text-[#1F2329] sm:text-4xl">
                  Your watchlist is waiting
                </h2>

                <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-stone-600 sm:text-base">
                  Use the bookmark button on any movie card or details page to
                  save a title here for later.
                </p>

                <Link
                  to="/"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#B8862D] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#9F7225] focus:outline-none focus:ring-4 focus:ring-[#B8862D]/25"
                >
                  <Compass size={17} aria-hidden="true" />
                  Explore Movies
                </Link>
              </div>
            </div>
          )}
        </section>
      </Container>
    </main>
  );
}

export default Watchlist;
