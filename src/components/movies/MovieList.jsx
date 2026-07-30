import Container from "../common/Container";
import MovieCard from "./MovieCard";

function MovieList({ movies = [] }) {
  const movieList = Array.isArray(movies) ? movies : [];

  return (
    <section id="popular-movies" className="pb-24">
      <Container>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.30em] text-[#b8862d]">
              Discover
            </p>

            <h2 className="font-['Cormorant_Garamond'] text-4xl font-bold leading-none text-[#1f2329]">
              Popular Movies
            </h2>
          </div>

          <span className="rounded-full border border-[#e7ded0] bg-white px-4 py-2 text-sm font-medium text-[#5f6368] shadow-sm">
            {movieList.length} Movies
          </span>
        </div>

        {movieList.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {movieList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#e7ded0] bg-white py-20 text-center shadow-sm">
            <p className="text-sm font-medium text-stone-500">
              No movies available.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}

export default MovieList;
