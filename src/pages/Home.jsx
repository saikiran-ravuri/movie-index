import { RotateCcw, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";

import Container from "../components/common/Container";
import Hero from "../components/home/Hero";
import MovieBanner from "../components/home/MovieBanner";
import MovieList from "../components/movies/MovieList";
import {
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
} from "../services/tmdb";

function MovieCardSkeleton() {
  return (
    <div className="w-[165px] shrink-0 sm:w-[180px] lg:w-[195px] xl:w-[205px]">
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
    </div>
  );
}

function MovieRowSkeleton({ eyebrow, title }) {
  return (
    <section className="pb-8 sm:pb-10 lg:pb-12">
      <Container>
        <div className="mb-6 sm:mb-8">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#B8862D]">
            {eyebrow}
          </p>

          <h2 className="font-['Cormorant_Garamond'] text-4xl font-bold leading-none text-[#1F2329] sm:text-5xl">
            {title}
          </h2>
        </div>

        <div className="flex gap-6 overflow-hidden">
          {Array.from({ length: 6 }, (_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let isCancelled = false;

    async function fetchHomeMovies() {
      try {
        setLoading(true);
        setError("");

        const [popular, trending, topRated] = await Promise.all([
          getPopularMovies(),
          getTrendingMovies(),
          getTopRatedMovies(),
        ]);

        if (isCancelled) {
          return;
        }

        setPopularMovies(popular);
        setTrendingMovies(trending);
        setTopRatedMovies(topRated);

        if (popular.length > 0) {
          const randomIndex = Math.floor(Math.random() * popular.length);
          setFeaturedMovie(popular[randomIndex]);
        } else {
          setFeaturedMovie(null);
        }
      } catch (error) {
        console.error("Failed to fetch home movies:", error);

        if (!isCancelled) {
          setPopularMovies([]);
          setTrendingMovies([]);
          setTopRatedMovies([]);
          setFeaturedMovie(null);
          setError("We couldn’t load the movie collection right now.");
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    fetchHomeMovies();

    return () => {
      isCancelled = true;
    };
  }, [retryKey]);

  function handleRetry() {
    setRetryKey((current) => current + 1);
  }

  return (
    <main className="min-h-screen bg-[#F7F2E9]">
      <Hero />

      {featuredMovie && <MovieBanner movie={featuredMovie} />}

      {loading && (
        <>
          <MovieRowSkeleton eyebrow="Discover" title="Popular Movies" />
          <MovieRowSkeleton eyebrow="Trending" title="Trending This Week" />
          <MovieRowSkeleton eyebrow="Top Rated" title="Top Rated Movies" />
        </>
      )}

      {!loading && error && (
        <section className="pb-16 sm:pb-20">
          <Container>
            <div className="flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-[#E2D3BC] bg-white px-6 py-14 text-center shadow-[0_8px_24px_rgba(67,52,35,0.06)]">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#E8DBC7] bg-[#F7F0E4] text-[#B8862D]">
                <TriangleAlert size={24} />
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
                <RotateCcw size={17} />
                Try Again
              </button>
            </div>
          </Container>
        </section>
      )}

      {!loading && !error && (
        <>
          <MovieList
            id="popular-movies"
            eyebrow="Discover"
            title="Popular Movies"
            movies={popularMovies}
          />

          <MovieList
            eyebrow="Trending"
            title="Trending This Week"
            movies={trendingMovies}
          />

          <MovieList
            eyebrow="Top Rated"
            title="Top Rated Movies"
            movies={topRatedMovies}
          />
        </>
      )}
    </main>
  );
}

export default Home;
