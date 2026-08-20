import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w92";

function SearchResult({ movie, onSelect, isActive }) {
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "—";
  const rating =
    typeof movie.vote_average === "number"
      ? movie.vote_average.toFixed(1)
      : "—";

  return (
    <Link
      to={`/movie/${movie.id}`}
      onClick={onSelect}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
        isActive ? "bg-[#efe5d3]" : "hover:bg-[#f2e7d3]"
      }`}
    >
      <div className="h-12 w-9 shrink-0 overflow-hidden rounded bg-[#f1ece4]">
        {movie.poster_path ? (
          <img
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[9px] text-stone-500">
            N/A
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="truncate text-sm font-semibold text-[#1f2329]">
          {movie.title}
        </h4>
        <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
          <span>{year}</span>
          <span>•</span>
          <span className="flex items-center gap-0.5 text-[#b8862d] font-medium">
            <Star size={12} fill="currentColor" />
            {rating}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default SearchResult;

