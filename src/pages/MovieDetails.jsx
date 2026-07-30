import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieHero from "../components/movie-details/MovieHero";
import MovieInfo from "../components/movie-details/MovieInfo";
import ProductionCompanies from "../components/movie-details/ProductionCompanies";
import { getMovieDetails } from "../services/tmdb";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMovieDetails() {
      try {
        setLoading(true);
        setError("");

        const movieData = await getMovieDetails(id);
        setMovie(movieData);
      } catch (err) {
        setError("Unable to load movie details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F2E9]">
        <p className="text-lg font-medium text-stone-700">
          Loading movie details...
        </p>
      </main>
    );
  }

  if (error || !movie) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F2E9] px-6">
        <p className="text-center text-lg font-medium text-red-700">
          {error || "Movie not found."}
        </p>
      </main>
    );
  }

  return (
    <main>
      <MovieHero movie={movie} />
      <MovieInfo movie={movie} />
      <ProductionCompanies movie={movie} />
    </main>
  );
}

export default MovieDetails;
