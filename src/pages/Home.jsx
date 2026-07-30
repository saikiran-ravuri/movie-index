import { useEffect, useState } from "react";

import Hero from "../components/home/Hero";
import MovieBanner from "../components/home/MovieBanner";
import { getPopularMovies } from "../services/tmdb.js";

import MovieList from "../components/movies/MovieList";

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function loadMovies() {
      const data = await getPopularMovies();
      setMovies(data.results);
    }

    loadMovies();
  }, []);

  return (
    <main>
      <Hero />
      <MovieBanner />
      <MovieList movies={movies} />
    </main>
  );
}

export default Home;
