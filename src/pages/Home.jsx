import { useEffect, useState } from "react";

import Hero from "../components/home/Hero";
import MovieBanner from "../components/home/MovieBanner";
import MovieList from "../components/movies/MovieList";
import {
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
} from "../services/tmdb";

function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function fetchHomeMovies() {
      try {
        setLoading(true);
        setError("");

        const [popularResponse, trending, topRated] = await Promise.all([
          getPopularMovies(),
          getTrendingMovies(),
          getTopRatedMovies(),
        ]);

        if (!active) return;

        setPopularMovies(popularResponse.movies || []);
        setTrendingMovies(trending || []);
        setTopRatedMovies(topRated || []);
      } catch (err) {
        if (!active) return;
        console.error("Failed to fetch home movies:", err);
        setPopularMovies([]);
        setTrendingMovies([]);
        setTopRatedMovies([]);
        setError("Unable to load movies. Please try again.");
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchHomeMovies();
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#f8f4ec]">
      <Hero />

      {popularMovies.length > 0 && <MovieBanner movies={popularMovies} />}

      {loading && (
        <p className="py-16 text-center text-sm font-medium text-stone-500">
          Loading movies...
        </p>
      )}

      {!loading && error && (
        <p className="py-16 text-center text-sm font-medium text-red-600">
          {error}
        </p>
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

