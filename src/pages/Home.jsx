import { useEffect, useState } from "react";

import Hero from "../components/home/Hero";
import MovieBanner from "../components/home/MovieBanner";
import MovieList from "../components/movies/MovieList";
import { getPopularMovies } from "../services/tmdb";

function Home() {
  const [movies, setMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPopularMovies() {
      try {
        setLoading(true);
        setError("");

        const popularMovies = await getPopularMovies();

        setMovies(popularMovies);

        if (popularMovies.length > 0) {
          const randomIndex = Math.floor(Math.random() * popularMovies.length);
          setFeaturedMovie(popularMovies[randomIndex]);
        }
      } catch (error) {
        console.error("Failed to fetch popular movies:", error);

        setMovies([]);
        setFeaturedMovie(null);
        setError("Unable to load movies. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchPopularMovies();
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

      {!loading && !error && <MovieList movies={movies} />}
    </main>
  );
}

export default Home;
