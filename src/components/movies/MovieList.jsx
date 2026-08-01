import Container from "../common/Container";
import MovieCarousel from "../home/MovieCarousel";
import MovieCard from "./MovieCard";

function MovieList({
  eyebrow = "Discover",
  title = "Popular Movies",
  movies = [],
}) {
  const movieList = Array.isArray(movies) ? movies : [];

  return (
    <section className="pb-8 sm:pb-10 lg:pb-12">
      <Container>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-5 sm:mb-8">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.30em] text-[#B8862D]">
              {eyebrow}
            </p>

            <h2 className="font-['Cormorant_Garamond'] text-4xl font-bold leading-none text-[#1F2329] sm:text-5xl">
              {title}
            </h2>
          </div>

          <span className="rounded-full border border-[#E7DED0] bg-white px-4 py-2 text-sm font-medium text-[#5F6368] shadow-sm">
            {movieList.length} {movieList.length === 1 ? "Movie" : "Movies"}
          </span>
        </div>

        {movieList.length > 0 ? (
          <MovieCarousel ariaLabel={title}>
            {movieList.map((movie) => (
              <div
                key={movie.id}
                className="w-[165px] shrink-0 snap-start sm:w-[180px] lg:w-[195px] xl:w-[205px]"
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </MovieCarousel>
        ) : (
          <div className="rounded-2xl border border-[#E7DED0] bg-white py-20 text-center shadow-sm">
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
