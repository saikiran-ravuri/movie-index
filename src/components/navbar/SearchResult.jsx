import { ChevronRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w185";

function SearchResult({ movie, onSelect }) {
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "—";

  const rating =
    typeof movie.vote_average === "number"
      ? movie.vote_average.toFixed(1)
      : "—";

  return (
    <Link
      to={`/movie/${movie.id}`}
      onClick={onSelect}
      className="group flex items-center gap-4 rounded-2xl p-3 transition-all duration-300 hover:bg-[#f7efe2]"
    >
      <div className="h-[88px] w-[60px] shrink-0 overflow-hidden rounded-xl bg-[#f1ece4] shadow-sm">
        {movie.poster_path ? (
          <img
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={`${movie.title} poster`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-2 text-center text-[10px] font-medium text-[#8d7b63]">
            No Image
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate font-semibold text-[#1f2329]">{movie.title}</h3>

        <p className="mt-1 text-sm text-[#7b756b]">{year}</p>

        <div className="mt-2 flex items-center gap-1 text-[#b8862d]">
          <Star size={14} fill="currentColor" />

          <span className="text-sm font-medium">{rating}</span>
        </div>
      </div>

      <ChevronRight
        size={18}
        className="shrink-0 text-[#b8862d] transition-transform duration-300 group-hover:translate-x-1"
      />
    </Link>
  );
}

export default SearchResult;
