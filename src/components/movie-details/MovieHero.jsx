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
    <section className="bg-[#F7F2E9] py-6 sm:py-8 lg:py-10">
      <Container>
        <article className="relative overflow-hidden rounded-3xl border border-[#D9C9AE] bg-[#111419] shadow-xl">
          {backdropUrl && (
            <img
              src={backdropUrl}
              alt={`${movie.title} backdrop`}
              loading="eager"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-r from-[#101318]/95 via-[#101318]/82 to-[#101318]/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101318]/95 via-[#101318]/30 to-[#101318]/25" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_25%,rgba(213,166,78,0.12),transparent_40%)]" />

          <div className="relative z-10 flex min-h-[680px] items-end px-6 py-10 sm:min-h-[720px] sm:px-9 sm:py-12 lg:min-h-[740px] lg:px-14 lg:py-14 xl:px-16">
            <div className="grid w-full gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-end lg:gap-14 xl:grid-cols-[300px_minmax(0,1fr)] xl:gap-16">
              <div className="mx-auto w-full max-w-[260px] sm:max-w-[280px] lg:mx-0 lg:max-w-none">
                <div className="relative">
                  <div className="absolute -inset-3 rounded-[30px] bg-[#D5A64E]/15 blur-xl" />

                  <div className="relative aspect-[2/3] overflow-hidden rounded-3xl border border-[#D5A64E]/40 bg-white/5 shadow-2xl">
                    {posterUrl ? (
                      <img
                        src={posterUrl}
                        alt={`${movie.title} poster`}
                        loading="eager"
                        decoding="async"
                        width="500"
                        height="750"
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
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#D5A64E] sm:text-sm">
                  Movie Details
                </p>

                <h1 className="mt-4 font-['Cormorant_Garamond'] text-5xl font-bold leading-[0.95] text-white sm:text-6xl lg:text-7xl xl:text-[78px]">
                  {movie.title}
                </h1>

                {movie.tagline && (
                  <p className="mt-4 max-w-3xl font-['Cormorant_Garamond'] text-xl italic leading-8 text-white/70 sm:text-2xl">
                    “{movie.tagline}”
                  </p>
                )}

                <div className="mt-6 flex flex-wrap gap-2.5">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                    <span className="text-[#E0AD4D]">★</span>
                    {rating}
                    <span className="font-medium text-white/55">/ 10</span>
                  </span>

                  <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90">
                    {releaseYear}
                  </span>

                  <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90">
                    {formattedRuntime}
                  </span>

                  <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90">
                    {movie.status || "Status unavailable"}
                  </span>
                </div>

                {movie.genres?.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="rounded-full border border-[#D5A64E]/45 bg-[#D5A64E]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#E8C476]"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-8 max-w-[720px]">
                  <h2 className="font-['Cormorant_Garamond'] text-3xl font-bold text-white">
                    Overview
                  </h2>

                  <p className="mt-3 text-base leading-8 text-white/75 sm:text-lg sm:leading-9">
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
