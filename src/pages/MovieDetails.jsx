import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Container from "../components/common/Container";
import MovieHero from "../components/movie-details/MovieHero";
import MovieInfo from "../components/movie-details/MovieInfo";
import { getMovieDetails } from "../services/tmdb";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setLoading(true);
        setError("");

        const movieData = await getMovieDetails(id);

        setMovie(movieData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F2E9] py-16">
        <Container>
          <p className="text-stone-600">Loading movie details...</p>
        </Container>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#F7F2E9] py-16">
        <Container>
          <p className="font-medium text-red-700">{error}</p>
        </Container>
      </main>
    );
  }

  if (!movie) {
    return null;
  }

  return (
    <main>
      <MovieHero movie={movie} />
      <MovieInfo movie={movie} />
    </main>
  );
}

export default MovieDetails;
