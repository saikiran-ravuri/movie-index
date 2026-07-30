import { useNavigate } from "react-router-dom";

import Container from "../common/Container";
import { getBackdropUrl } from "../../utils/image";

function MovieBanner({ movie }) {
  const navigate = useNavigate();

  if (!movie) {
    return null;
  }

  const backdropUrl = getBackdropUrl(movie.backdrop_path);
  const releaseYear = movie.release_date?.slice(0, 4) || "N/A";
  const rating = Number(movie.vote_average || 0).toFixed(1);

  function handleViewDetails() {
    navigate(`/movie/${movie.id}`);
  }

  const overview = movie.overview
    ? movie.overview.length > 180
      ? `${movie.overview.substring(0, 180)}...`
      : movie.overview
    : "Movie description is currently unavailable.";

  return (
    <section className="pb-14 lg:pb-16">
      <Container>
        <article className="group relative overflow-hidden rounded-[30px] border border-[#e8ddca] bg-[#1f2329] shadow-[0_14px_35px_rgba(60,45,28,0.10)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(60,45,28,0.18)]">
          {backdropUrl && (
            <img
              src={backdropUrl}
              alt={`${movie.title} backdrop`}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-r from-[#17191d] via-[#17191d]/82 to-[#17191d]/20" />

          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

          <div className="relative z-10 flex min-h-[420px] items-end px-8 py-10 sm:px-10 lg:min-h-[450px] lg:px-14 lg:py-14">
            <div className="max-w-2xl">
              <span className="inline-flex items-center rounded-full border border-[#d5a64e]/40 bg-[#d5a64e]/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#d5a64e] backdrop-blur-sm">
                Featured Movie
              </span>

              <h2 className="mt-5 font-['Cormorant_Garamond'] text-4xl font-bold leading-[0.95] text-white sm:text-5xl lg:text-6xl">
                {movie.title}
              </h2>

              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-white/80">
                <span>{releaseYear}</span>

                <span className="h-1 w-1 rounded-full bg-[#d5a64e]" />

                <span className="flex items-center gap-1.5">
                  <span className="text-[#d5a64e]">★</span>
                  {rating}
                </span>

                <span className="h-1 w-1 rounded-full bg-[#d5a64e]" />

                <span>TMDB Featured</span>
              </div>

              <p className="mt-6 max-w-xl text-[15px] leading-7 text-white/75 lg:text-base">
                {overview}
              </p>

              <div className="mt-10">
                <button
                  type="button"
                  onClick={handleViewDetails}
                  className="rounded-full bg-[#d5a64e] px-6 py-3 text-sm font-semibold text-[#1f2329] transition duration-300 hover:scale-[1.03] hover:bg-[#e3b45d] focus:outline-none focus:ring-4 focus:ring-[#d5a64e]/30"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </article>
      </Container>
    </section>
  );
}

export default MovieBanner;
