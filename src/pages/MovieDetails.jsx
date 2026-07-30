import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CastSection from "../components/movie-details/CastSection";
import MovieHero from "../components/movie-details/MovieHero";
import MovieInfo from "../components/movie-details/MovieInfo";
import ProductionCompanies from "../components/movie-details/ProductionCompanies";
import { getMovieCredits, getMovieDetails } from "../services/tmdb";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMovieData() {
      try {
        setLoading(true);
        setError("");

        const [movieData, castData] = await Promise.all([
          getMovieDetails(id),
          getMovieCredits(id),
        ]);

        setMovie(movieData);
        setCast(castData.slice(0, 12));
      } catch (error) {
        console.error("Failed to load movie details:", error);
        setError("Unable to load movie details.");
      } finally {
        setLoading(false);
      }
    }

    loadMovieData();
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#F7F2E9] px-6">
        <p className="text-base font-medium text-stone-600">
          Loading movie details...
        </p>
      </main>
    );
  }

  if (error || !movie) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#F7F2E9] px-6">
        <p className="text-center text-base font-medium text-red-700">
          {error || "Movie not found."}
        </p>
      </main>
    );
  }

  return (
    <main className="bg-[#F7F2E9]">
      <MovieHero movie={movie} />

      <div className="space-y-16 pb-24 sm:space-y-20">
        <MovieInfo movie={movie} />
        <ProductionCompanies movie={movie} />
        <CastSection cast={cast} />
      </div>
    </main>
  );
}

export default MovieDetails;
