import Container from "../common/Container";
import { getBackdropUrl, getPosterUrl } from "../../utils/image";

function MovieHero({ movie }) {
  const backdropUrl = getBackdropUrl(movie.backdrop_path);
  const posterUrl = getPosterUrl(movie.poster_path);

  const releaseYear = movie.release_date?.slice(0, 4) || "N/A";
  const rating = Number(movie.vote_average || 0).toFixed(1);

  const runtimeHours = Math.floor((movie.runtime || 0) / 60);
  const runtimeMinutes = (movie.runtime || 0) % 60;

  const formattedRuntime = movie.runtime
    ? `${runtimeHours}h ${runtimeMinutes}m`
    : "N/A";

  return (
    <section className="bg-[#F7F2E9] px-0 py-6 sm:py-8 lg:py-10">
      <Container>
        <article className="relative min-h-[720px] overflow-hidden rounded-3xl border border-[#D9C9AE] bg-[#111419] shadow-[0_18px_50px_rgba(45,35,24,0.16)] lg:min-h-[780px]">
          {backdropUrl && (
            <img
              src={backdropUrl}
              alt={`${movie.title} backdrop`}
              className="absolute inset-0 h-full w-full scale-[1.02] object-cover"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-r from-[#101318]/95 via-[#101318]/82 to-[#101318]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101318]/95 via-[#101318]/20 to-[#101318]/25" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(213,166,78,0.10),transparent_38%)]" />

          <div className="relative z-10 flex min-h-[720px] items-end px-6 py-12 sm:px-9 sm:py-14 lg:min-h-[780px] lg:px-14 lg:py-16 xl:px-16">
            <div className="grid w-full gap-10 lg:grid-cols-[290px_minmax(0,1fr)] lg:items-end lg:gap-16 xl:grid-cols-[310px_minmax(0,1fr)] xl:gap-20">
              <div className="mx-auto w-full max-w-[290px] lg:mx-0 xl:max-w-[310px]">
                <div className="relative">
                  <div className="absolute -inset-3 rounded-[30px] bg-[#D5A64E]/15 blur-2xl" />

                  <div className="relative aspect-[2/3] overflow-hidden rounded-3xl border border-[#D5A64E]/40 bg-white/5 shadow-[0_28px_70px_rgba(0,0,0,0.5)]">
                    {posterUrl ? (
                      <img
                        src={posterUrl}
                        alt={`${movie.title} poster`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center px-6 text-center text-sm text-white/50">
                        Poster unavailable
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="max-w-[820px]">
                <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[#D5A64E] sm:text-sm">
                  Movie Details
                </p>

                <h1 className="mt-5 font-['Cormorant_Garamond'] text-5xl font-bold leading-[0.94] text-white sm:text-6xl lg:text-7xl xl:text-[82px]">
                  {movie.title}
                </h1>

                {movie.tagline && (
                  <p className="mt-5 max-w-3xl font-['Cormorant_Garamond'] text-xl italic leading-8 text-white/70 sm:text-2xl">
                    “{movie.tagline}”
                  </p>
                )}

                <div className="mt-7 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
                    <span className="text-[#E0AD4D]">★</span>
                    {rating}
                    <span className="font-medium text-white/55">/ 10</span>
                  </span>

                  <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur-md">
                    {releaseYear}
                  </span>

                  <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur-md">
                    {formattedRuntime}
                  </span>

                  <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur-md">
                    {movie.status || "Status unavailable"}
                  </span>
                </div>

                {movie.genres?.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2.5">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="rounded-full border border-[#D5A64E]/45 bg-[#D5A64E]/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#E8C476]"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-9 max-w-[720px]">
                  <h2 className="font-['Cormorant_Garamond'] text-3xl font-bold text-white">
                    Overview
                  </h2>

                  <p className="mt-4 text-base leading-8 text-white/75 sm:text-lg sm:leading-9">
                    {movie.overview ||
                      "Movie description is currently unavailable."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#101318]/80" />
        </article>
      </Container>
    </section>
  );
}

export default MovieHero;
