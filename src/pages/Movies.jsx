import { RotateCcw, TriangleAlert } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import Container from "../components/common/Container";
import GenreFilter from "../components/movies/GenreFilter";
import MovieCard from "../components/movies/MovieCard";
import Pagination from "../components/movies/Pagination";
import SortDropdown from "../components/movies/SortDropdown";
import { getDiscoverMovies, getMovieGenres } from "../services/tmdb";

const FEATURED_GENRE_IDS = [28, 12, 16, 35, 18, 878];

function MovieCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border border-[#e6dcc8] bg-white">
      <div className="aspect-[2/3] bg-[#f1ece4]" />

      <div className="space-y-2 p-3">
        <div className="h-4 w-4/5 rounded bg-[#f1ece4]" />
        <div className="h-3 w-3/5 rounded bg-[#f1ece4]" />

        <div className="flex items-center justify-between border-t border-[#f0eae1] pt-2">
          <div className="h-3 w-10 rounded bg-[#f1ece4]" />
          <div className="h-3 w-8 rounded bg-[#f1ece4]" />
        </div>
      </div>
    </div>
  );
}

function Movies() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [genresLoading, setGenresLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryKey, setRetryKey] = useState(0);

  const featuredGenres = useMemo(() => {
    return FEATURED_GENRE_IDS.map((genreId) =>
      genres.find((genre) => genre.id === genreId),
    ).filter(Boolean);
  }, [genres]);

  useEffect(() => {
    let active = true;

    async function fetchGenres() {
      try {
        setGenresLoading(true);
        const genreList = await getMovieGenres();
        if (active) setGenres(genreList);
      } catch (err) {
        console.error("Failed to fetch movie genres:", err);
        if (active) setGenres([]);
      } finally {
        if (active) setGenresLoading(false);
      }
    }

    fetchGenres();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  useEffect(() => {
    let active = true;

    async function fetchMovies() {
      try {
        setLoading(true);
        setError("");

        const data = await getDiscoverMovies({
          genreId: selectedGenre,
          page,
          sortBy,
        });

        if (!active) return;

        setMovies(data.movies);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        if (active) {
          setMovies([]);
          setTotalPages(1);
          setError("We couldn't load the movie collection right now.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchMovies();
    return () => {
      active = false;
    };
  }, [page, selectedGenre, sortBy, retryKey]);

  function handleRetry() {
    setRetryKey((k) => k + 1);
  }

  function handleGenreChange(genreId) {
    setSelectedGenre(genreId);
    setPage(1);
  }

  function handleSortChange(sortValue) {
    setSortBy(sortValue);
    setPage(1);
  }

  function handlePreviousPage() {
    if (page <= 1 || loading) return;
    setPage((p) => p - 1);
  }

  function handleNextPage() {
    if (page >= totalPages || loading) return;
    setPage((p) => p + 1);
  }

  return (
    <main className="min-h-screen bg-[#f8f4ec] py-8 sm:py-10 lg:py-12">
      <Container>
        <section aria-label="Movies collection">
          <div className="mb-6 grid gap-4 sm:grid-cols-2 sm:items-end">
            <div className="w-full sm:max-w-[280px]">
              <GenreFilter
                genres={featuredGenres}
                selectedGenre={selectedGenre}
                onGenreChange={handleGenreChange}
                disabled={loading || genresLoading}
              />
            </div>

            <div className="w-full sm:ml-auto sm:max-w-[280px]">
              <SortDropdown
                value={sortBy}
                onChange={handleSortChange}
                disabled={loading}
              />
            </div>
          </div>

          {loading && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
              {Array.from({ length: 10 }, (_, index) => (
                <MovieCardSkeleton key={index} />
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-[#e6dcc8] bg-white p-8 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e6dcc8] bg-[#f8f4ec] text-[#b8862d]">
                <TriangleAlert size={22} aria-hidden="true" />
              </div>

              <h2 className="mt-4 font-['Cormorant_Garamond'] text-2xl font-bold text-[#1f2329]">
                Movies are temporarily unavailable
              </h2>

              <p className="mt-2 text-sm text-stone-600">
                {error} Check your connection and try again.
              </p>

              <button
                type="button"
                onClick={handleRetry}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#b8862d] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#9b6417]"
              >
                <RotateCcw size={16} aria-hidden="true" />
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
            <div className="rounded-2xl border border-[#e6dcc8] bg-white p-12 text-center">
              <h2 className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#1f2329]">
                No movies available
              </h2>

              <p className="mt-2 text-sm text-stone-600">
                No movies are currently available for the selected filters.
              </p>
            </div>
          )}
        </section>
      </Container>
    </main>
  );
}

export default Movies;
