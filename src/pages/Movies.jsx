import { RotateCcw, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";

import Container from "../components/common/Container";
import MovieCard from "../components/movies/MovieCard";
import Pagination from "../components/movies/Pagination";
import { getPopularMovies } from "../services/tmdb";

function MovieCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border border-[#E7DED0] bg-white">
      <div className="aspect-[2/3] bg-[#E9E1D6]" />

      <div className="space-y-3 px-3.5 py-3">
        <div className="h-4 w-4/5 rounded bg-[#E9E1D6]" />
        <div className="h-4 w-3/5 rounded bg-[#E9E1D6]" />

        <div className="flex items-center justify-between border-t border-[#F0EAE1] pt-3">
          <div className="h-3 w-10 rounded bg-[#E9E1D6]" />
          <div className="h-3 w-8 rounded bg-[#E9E1D6]" />
        </div>
      </div>
    </div>
  );
}

function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  useEffect(() => {
    let isCancelled = false;

    async function fetchMovies() {
      try {
        setLoading(true);
        setError("");

        const data = await getPopularMovies(page);

        if (isCancelled) {
          return;
        }

        setMovies(data.movies);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Failed to fetch movies:", error);

        if (!isCancelled) {
          setMovies([]);
          setTotalPages(1);
          setError("We couldn’t load the movie collection right now.");
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    fetchMovies();

    return () => {
      isCancelled = true;
    };
  }, [page, retryKey]);

  function handleRetry() {
    setRetryKey((currentKey) => currentKey + 1);
  }

  function handlePreviousPage() {
    if (page <= 1 || loading) {
      return;
    }

    setPage((currentPage) => currentPage - 1);
  }

  function handleNextPage() {
    if (page >= totalPages || loading) {
      return;
    }

    setPage((currentPage) => currentPage + 1);
  }

  return (
    <main className="min-h-screen bg-[#F7F2E9] py-12 sm:py-16 lg:py-20">
      <Container>
        <section aria-labelledby="movies-heading">
          <div className="mb-8 flex flex-col gap-6 sm:mb-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#9B6417] sm:text-sm">
                Browse Collection
              </p>

              <h1
                id="movies-heading"
                className="mt-3 font-['Cormorant_Garamond'] text-5xl font-bold leading-none text-[#1F2329] sm:text-6xl"
              >
                Movies
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base sm:leading-8 lg:text-lg">
                Explore popular movies from around the world and discover your
                next favorite film.
              </p>
            </div>

            {!loading && !error && movies.length > 0 && (
              <span className="w-fit rounded-full border border-[#E2D3BC] bg-white px-4 py-2 text-sm font-medium text-stone-600 shadow-[0_4px_14px_rgba(67,52,35,0.05)]">
                {movies.length} {movies.length === 1 ? "Movie" : "Movies"}
              </span>
            )}
          </div>

          {loading && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
              {Array.from({ length: 10 }, (_, index) => (
                <MovieCardSkeleton key={index} />
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="flex min-h-[360px] flex-col items-center justify-center rounded-3xl border border-[#E2D3BC] bg-white px-6 py-14 text-center shadow-[0_8px_24px_rgba(67,52,35,0.06)]">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#E8DBC7] bg-[#F7F0E4] text-[#B8862D]">
                <TriangleAlert size={24} aria-hidden="true" />
              </div>

              <h2 className="mt-5 font-['Cormorant_Garamond'] text-3xl font-bold text-[#1F2329] sm:text-4xl">
                Movies are temporarily unavailable
              </h2>

              <p className="mt-3 max-w-md text-sm leading-7 text-stone-600 sm:text-base">
                {error} Check your connection and try again.
              </p>

              <button
                type="button"
                onClick={handleRetry}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#B8862D] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-[#9F7225] focus:outline-none focus:ring-4 focus:ring-[#B8862D]/25"
              >
                <RotateCcw size={17} aria-hidden="true" />
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && movies.length > 0 && (
            <>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>

              <Pagination
                page={page}
                totalPages={totalPages}
                onPrevious={handlePreviousPage}
                onNext={handleNextPage}
                disabled={loading}
              />
            </>
          )}

          {!loading && !error && movies.length === 0 && (
            <div className="rounded-3xl border border-[#E2D3BC] bg-white px-6 py-16 text-center shadow-[0_8px_24px_rgba(67,52,35,0.06)]">
              <h2 className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#1F2329]">
                No movies available
              </h2>

              <p className="mt-3 text-sm leading-7 text-stone-600 sm:text-base">
                The movie collection is currently empty.
              </p>
            </div>
          )}
        </section>
      </Container>
    </main>
  );
}

export default Movies;
