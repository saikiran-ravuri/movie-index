import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  return (
    <section>
      <h2>Popular Movies</h2>

      <p>Total Movies: {movies.length}</p>

      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  );
}

export default MovieList;
