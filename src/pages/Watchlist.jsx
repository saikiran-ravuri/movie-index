import { Bookmark, Compass } from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../components/common/Container";
import MovieCard from "../components/movies/MovieCard";
import { useWatchlist } from "../hooks/useWatchlist";

function Watchlist() {
  const { watchlist, watchlistCount } = useWatchlist();
  const hasMovies = watchlistCount > 0;

  return (
    <main className="min-h-[70vh] bg-[#f8f4ec] py-8 sm:py-10 lg:py-12">
      <Container>
        <section aria-labelledby="watchlist-heading">
          <div className="mb-6">
            <h1
              id="watchlist-heading"
              className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#1f2329] sm:text-4xl"
            >
              Watchlist
            </h1>
          </div>

          {hasMovies ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
              {watchlist.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-[#e6dcc8] bg-white p-10 text-center sm:p-16">
              <div className="mx-auto max-w-md">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#e6dcc8] bg-[#f8f4ec] text-[#b8862d]">
                  <Bookmark size={22} aria-hidden="true" />
                </div>

                <h2 className="mt-4 font-['Cormorant_Garamond'] text-2xl font-bold text-[#1f2329] sm:text-3xl">
                  Your watchlist is empty
                </h2>

                <p className="mt-2 text-sm text-stone-600">
                  Use the bookmark button on any movie card or details page to save a title here for later.
                </p>

                <Link
                  to="/"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#b8862d] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#9b6417]"
                >
                  <Compass size={16} aria-hidden="true" />
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

