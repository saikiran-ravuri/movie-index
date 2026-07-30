import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#B7791F]">
            Discover
          </p>

          <h2 className="font-serif text-2xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-3xl">
            Popular Movies
          </h2>
        </div>

        <span className="shrink-0 rounded-full border border-[#E7DED0] bg-white px-3.5 py-1.5 text-xs font-medium text-stone-600 shadow-sm">
          {movies.length} Movies
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

export default MovieList;
