const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie }) {
  return (
    <article>
      <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />

      <div>
        <h3>{movie.title}</h3>

        <div>
          <p>⭐ {movie.vote_average.toFixed(1)}</p>
          <p>{movie.release_date?.slice(0, 4)}</p>
        </div>

        <p>
          {movie.overview
            ? `${movie.overview.slice(0, 120)}...`
            : "No overview available."}
        </p>
      </div>
    </article>
  );
}

export default MovieCard;
