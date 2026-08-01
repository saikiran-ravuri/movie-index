import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from "../common/Container";
import { getBackdropUrl } from "../../utils/image";

const genreNames = {
  12: "Adventure",
  14: "Fantasy",
  16: "Animation",
  18: "Drama",
  27: "Horror",
  28: "Action",
  35: "Comedy",
  36: "History",
  37: "Western",
  53: "Thriller",
  80: "Crime",
  99: "Documentary",
  878: "Science Fiction",
  9648: "Mystery",
  10402: "Music",
  10749: "Romance",
  10751: "Family",
  10752: "War",
  10770: "TV Movie",
};

function MovieBanner({ movie }) {
  const navigate = useNavigate();

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [hasImageError, setHasImageError] = useState(false);

  if (!movie) {
    return null;
  }

  const backdropUrl = getBackdropUrl(movie.backdrop_path);
  const releaseYear = movie.release_date?.slice(0, 4) || "N/A";
  const rating = Number(movie.vote_average || 0).toFixed(1);

  const primaryGenreId = movie.genre_ids?.[0];
  const primaryGenre = genreNames[primaryGenreId] || "Cinema";

  const shouldShowBackdrop = backdropUrl && !hasImageError;

  function handleViewDetails() {
    navigate(`/movie/${movie.id}`);
  }

  return (
    <section className="pb-12 sm:pb-14 lg:pb-16">
      <Container>
        <article className="group relative overflow-hidden rounded-[26px] border border-[#E8DDCA] bg-[#1F2329] shadow-[0_14px_35px_rgba(60,45,28,0.10)] transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(60,45,28,0.18)] sm:rounded-[30px]">
          {shouldShowBackdrop && (
            <>
              {!isImageLoaded && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 animate-pulse bg-[linear-gradient(110deg,#1A1D22_20%,#292D34_45%,#1A1D22_70%)]"
                />
              )}

              <img
                src={backdropUrl}
                alt=""
                aria-hidden="true"
                loading="eager"
                decoding="async"
                onLoad={() => setIsImageLoaded(true)}
                onError={() => {
                  setHasImageError(true);
                  setIsImageLoaded(false);
                }}
                className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-[1.03] lg:object-[center_35%] ${
                  isImageLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            </>
          )}

          {!shouldShowBackdrop && (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(184,134,45,0.20),transparent_32%),linear-gradient(135deg,#14171C_0%,#26231E_55%,#17191D_100%)]" />
          )}

          <div className="absolute inset-0 bg-gradient-to-r from-[#111419]/90 via-[#111419]/62 to-[#111419]/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111419]/70 via-transparent to-[#111419]/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_25%,rgba(213,166,78,0.09),transparent_38%)]" />

          <div className="relative z-10 flex min-h-[430px] items-end px-6 py-8 sm:min-h-[440px] sm:px-9 sm:py-10 lg:min-h-[450px] lg:px-14 lg:py-14">
            <div className="max-w-2xl">
              <span className="inline-flex items-center rounded-full border border-[#D5A64E]/45 bg-[#17191D]/35 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#E0AD4D] backdrop-blur-md sm:text-[11px]">
                Featured Movie
              </span>

              <h2 className="mt-5 max-w-3xl font-['Cormorant_Garamond'] text-4xl font-bold leading-[0.96] text-white sm:text-5xl lg:text-6xl">
                {movie.title}
              </h2>

              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium text-white/85 sm:gap-x-4">
                <span>{releaseYear}</span>

                <span
                  aria-hidden="true"
                  className="h-1 w-1 rounded-full bg-[#D5A64E]"
                />

                <span className="inline-flex items-center gap-1.5">
                  <span aria-hidden="true" className="text-[#E0AD4D]">
                    ★
                  </span>
                  {rating}
                </span>

                <span
                  aria-hidden="true"
                  className="h-1 w-1 rounded-full bg-[#D5A64E]"
                />

                <span>{primaryGenre}</span>
              </div>

              <p className="mt-5 line-clamp-3 max-w-xl text-[15px] leading-7 text-white/80 lg:mt-6 lg:text-base lg:leading-8">
                {movie.overview ||
                  "Movie description is currently unavailable."}
              </p>

              <div className="mt-8 lg:mt-9">
                <button
                  type="button"
                  onClick={handleViewDetails}
                  className="inline-flex items-center gap-2 rounded-full bg-[#D5A64E] px-6 py-3 text-sm font-semibold text-[#1F2329] shadow-[0_8px_20px_rgba(213,166,78,0.20)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#E3B45D] hover:shadow-[0_12px_25px_rgba(213,166,78,0.28)] focus:outline-none focus:ring-4 focus:ring-[#D5A64E]/30"
                >
                  View Details
                  <ArrowUpRight size={16} aria-hidden="true" />
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
