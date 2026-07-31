import { Bookmark } from "lucide-react";

import Container from "../components/common/Container";
import MovieCard from "../components/movies/MovieCard";
import { useWatchlist } from "../hooks/useWatchlist";

function Watchlist() {
  const { watchlist, watchlistCount } = useWatchlist();

  return (
    <main className="min-h-[70vh] bg-[#F7F2E9] py-14 sm:py-16 lg:py-20">
      <Container>
        <section>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5 sm:mb-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#9B6417] sm:text-sm">
                Your Collection
              </p>

              <h1 className="mt-3 font-['Cormorant_Garamond'] text-5xl font-bold leading-none text-[#1f2329] sm:text-6xl">
                Watchlist
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg sm:leading-8">
                Keep the movies you want to watch later in one simple,
                persistent collection.
              </p>
            </div>

            {watchlistCount > 0 && (
              <span className="rounded-full border border-[#E2D3BC] bg-white px-4 py-2 text-sm font-medium text-stone-600 shadow-sm">
                {watchlistCount} {watchlistCount === 1 ? "Movie" : "Movies"}
              </span>
            )}
          </div>

          {watchlistCount > 0 ? (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {watchlist.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[360px] flex-col items-center justify-center rounded-3xl border border-[#E2D3BC] bg-white px-6 py-16 text-center shadow-[0_8px_24px_rgba(67,52,35,0.06)]">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#E8DBC7] bg-[#F7F0E4] text-[#B8862D]">
                <Bookmark size={28} />
              </div>

              <h2 className="mt-6 font-['Cormorant_Garamond'] text-3xl font-bold text-[#1f2329] sm:text-4xl">
                Your watchlist is empty
              </h2>

              <p className="mt-3 max-w-md text-sm leading-7 text-stone-600 sm:text-base">
                Use the bookmark button on any movie card to save it here for
                later.
              </p>
            </div>
          )}
        </section>
      </Container>
    </main>
  );
}

export default Watchlist;
