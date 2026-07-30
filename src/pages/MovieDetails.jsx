import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Container from "../components/common/Container";
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

        const movieData = await getMovieDetails(id);

        console.log(movieData);
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
      <main className="py-16">
        <Container>
          <p>Loading movie...</p>
        </Container>
      </main>
    );
  }

  if (error) {
    return (
      <main className="py-16">
        <Container>
          <p>{error}</p>
        </Container>
      </main>
    );
  }

  return (
    <main className="py-14">
      <Container>
        <h1 className="text-4xl font-bold">{movie.title}</h1>
      </Container>
    </main>
  );
}

export default MovieDetails;
