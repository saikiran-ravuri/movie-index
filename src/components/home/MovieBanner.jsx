import Container from "../common/Container";

const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

function MovieBanner({ movie }) {
  if (!movie) {
    return null;
  }

  const backdropUrl = movie.backdrop_path
    ? `${BACKDROP_BASE_URL}${movie.backdrop_path}`
    : null;

  const releaseYear = movie.release_date?.slice(0, 4) || "N/A";
  const rating = Number(movie.vote_average || 0).toFixed(1);

  return (
    <section className="pb-24">
      <Container>
        <article className="relative min-h-[500px] overflow-hidden rounded-3xl border border-[#e8ddca] bg-[#1f2329] shadow-sm">
          {backdropUrl && (
            <img
              src={backdropUrl}
              alt={`${movie.title} backdrop`}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-r from-[#17191d]/95 via-[#17191d]/75 to-[#17191d]/20" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#17191d]/75 via-transparent to-transparent" />

          <div className="relative z-10 flex min-h-[500px] items-end p-8 sm:p-10 lg:p-14">
            <div className="max-w-3xl">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-[#d5a64e]">
                Featured Movie
              </p>

              <h2 className="font-['Cormorant_Garamond'] text-4xl font-bold leading-none text-white sm:text-5xl lg:text-6xl">
                {movie.title}
              </h2>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-white/80">
                <span>{releaseYear}</span>

                <span className="h-1 w-1 rounded-full bg-[#d5a64e]" />

                <span className="flex items-center gap-2">
                  <span className="text-[#d5a64e]">★</span>
                  {rating}
                </span>

                <span className="h-1 w-1 rounded-full bg-[#d5a64e]" />

                <span>TMDB Featured</span>
              </div>

              <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                {movie.overview
                  ? movie.overview.length > 180
                    ? `${movie.overview.substring(0, 180)}...`
                    : movie.overview
                  : "Movie description is currently unavailable."}
              </p>
            </div>
          </div>
        </article>
      </Container>
    </section>
  );
}

export default MovieBanner;
