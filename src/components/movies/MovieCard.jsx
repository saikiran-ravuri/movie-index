import { useNavigate } from "react-router-dom";
import { getPosterUrl } from "../../utils/image";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  const releaseYear = movie.release_date?.slice(0, 4) || "N/A";
  const rating = Number(movie.vote_average || 0).toFixed(1);
  const posterUrl = getPosterUrl(movie.poster_path);

  function handleMovieClick() {
    navigate(`/movie/${movie.id}`);
  }

  return (
    <article
      onClick={handleMovieClick}
      className="group cursor-pointer overflow-hidden rounded-xl border border-[#E7DED0] bg-white shadow-[0_2px_8px_rgba(67,52,35,0.05)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#C58B2A]/35 hover:shadow-[0_10px_24px_rgba(67,52,35,0.12)]"
    >
      <div className="aspect-[2/3] overflow-hidden bg-[#F1ECE4]">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`${movie.title} poster`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-4 text-center text-xs text-stone-400">
            Poster unavailable
          </div>
        )}
      </div>

      <div className="px-3.5 py-3">
        <h3 className="line-clamp-2 min-h-10 text-[14px] font-semibold leading-5 text-stone-900 transition-colors duration-300 group-hover:text-[#9B6417]">
          {movie.title}
        </h3>

        <div className="mt-3 flex items-center justify-between border-t border-[#F0EAE1] pt-2.5">
          <div className="flex items-center gap-1.5">
            <span className="text-[14px] leading-none text-[#C4871F]">★</span>

            <span className="text-[13px] font-semibold text-stone-800">
              {rating}
            </span>
          </div>

          <span className="text-[13px] font-medium text-stone-500">
            {releaseYear}
          </span>
        </div>
      </div>
    </article>
  );
}

export default MovieCard;
