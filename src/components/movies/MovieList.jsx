import Container from "../common/Container";
import MovieCarousel from "../home/MovieCarousel";
import MovieCard from "./MovieCard";

function MovieList({
  id,
  eyebrow = "Discover",
  title = "Popular Movies",
  movies = [],
}) {
  const movieList = Array.isArray(movies) ? movies : [];

  return (
    <section id={id} className="pb-10 lg:pb-12">
      <Container>
        <div className="mb-6">
          <h2 className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#1f2329] sm:text-4xl">
            {title}
          </h2>
        </div>

        {movieList.length > 0 ? (
          <MovieCarousel ariaLabel={title}>
            {movieList.map((movie) => (
              <div
                key={movie.id}
                className="w-[160px] shrink-0 snap-start sm:w-[180px] lg:w-[200px]"
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </MovieCarousel>
        ) : (
          <div className="rounded-xl border border-[#e6dcc8] bg-white py-12 text-center">
            <p className="text-sm text-stone-500">
              No movies available.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}

export default MovieList;

