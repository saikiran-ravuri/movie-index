import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

function MovieBanner({ movies = [], movie = null }) {
  const bannerMovies = movies.length > 0 ? movies.slice(0, 6) : movie ? [movie] : [];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (bannerMovies.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerMovies.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [bannerMovies.length]);

  if (!bannerMovies.length) return null;

  const currentMovie = bannerMovies[currentIndex] || bannerMovies[0];
  const backdropUrl = getBackdropUrl(currentMovie.backdrop_path);
  const releaseYear = currentMovie.release_date?.slice(0, 4) || "N/A";
  const rating = Number(currentMovie.vote_average || 0).toFixed(1);
  const primaryGenreId = currentMovie.genre_ids?.[0];
  const primaryGenre = genreNames[primaryGenreId] || "Cinema";

  return (
    <section className="pb-12">
      <Container>
        <Link
          to={`/movie/${currentMovie.id}`}
          className="group relative flex min-h-[440px] items-end overflow-hidden rounded-2xl border border-[#e6dcc8] bg-[#1f2329] sm:min-h-[460px] lg:min-h-[480px]"
        >
          {backdropUrl && (
            <img
              key={currentMovie.id}
              src={backdropUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 opacity-80"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#1f2329] via-[#1f2329]/60 to-transparent" />

          <div className="relative z-10 w-full p-6 sm:p-8 md:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="font-['Cormorant_Garamond'] text-3xl font-bold text-white sm:text-4xl lg:text-5xl group-hover:text-[#b8862d] transition-colors">
                {currentMovie.title}
              </h2>

              <div className="mt-3 flex items-center gap-3 text-xs font-medium text-stone-300">
                <span>{releaseYear}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-[#b8862d]">
                  <Star size={13} fill="currentColor" />
                  {rating}
                </span>
                <span>•</span>
                <span>{primaryGenre}</span>
              </div>

              <p className="mt-3 line-clamp-2 text-sm text-stone-300 leading-relaxed">
                {currentMovie.overview || "Movie description is currently unavailable."}
              </p>
            </div>
          </div>
        </Link>
      </Container>
    </section>
  );
}

export default MovieBanner;
