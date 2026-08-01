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
  const [featuredMovie, setFeaturedMovie] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
          setError("Unable to load movies. Please try again.");
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
  }, []);

  return (
    <main className="min-h-screen bg-[#F7F2E9]">
      <Hero />

      {featuredMovie && <MovieBanner movie={featuredMovie} />}

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
