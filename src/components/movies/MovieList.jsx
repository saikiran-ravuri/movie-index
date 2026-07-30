import MovieCard from "./MovieCard";

function MovieList({ movies = [] }) {
  const movieList = Array.isArray(movies) ? movies : [];

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#b8862d]">
            Discover
          </p>

          <h2 className="font-['Cormorant_Garamond'] text-3xl font-bold leading-tight text-[#1f2329] sm:text-4xl">
            Popular Movies
          </h2>
        </div>

        <span className="shrink-0 rounded-full border border-[#e7ded0] bg-white px-3.5 py-1.5 text-xs font-medium text-[#5f6368] shadow-sm">
          {movieList.length} Movies
        </span>
      </div>

      {movieList.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
          {movieList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="py-12 text-center text-sm font-medium text-stone-500">
          No movies available.
        </p>
      )}
    </section>
  );
}

export default MovieList;
