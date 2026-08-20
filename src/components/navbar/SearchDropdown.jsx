import { Film } from "lucide-react";
import SearchResult from "./SearchResult";

function SearchDropdown({
  isOpen,
  isSearching,
  searchError,
  searchResults = [],
  activeIndex = -1,
  onClose,
}) {
  if (!isOpen) return null;

  const visibleResults = searchResults
    .filter(
      (movie) =>
        movie &&
        movie.id &&
        movie.title?.trim() &&
        movie.poster_path &&
        movie.vote_count > 0,
    )
    .slice(0, 6);

  return (
    <div className="absolute left-0 top-[calc(100%+6px)] z-50 w-full overflow-hidden rounded-xl border border-[#e6dcc8] bg-white p-1.5 shadow-md">
      {isSearching && (
        <div className="px-4 py-5 text-center text-xs font-medium text-stone-500">
          Searching movies...
        </div>
      )}

      {!isSearching && searchError && (
        <div className="px-4 py-5 text-center text-xs text-red-600 font-medium">
          Unable to search movies.
        </div>
      )}

      {!isSearching && !searchError && visibleResults.length === 0 && (
        <div className="px-4 py-6 text-center text-xs text-stone-500">
          No movies found.
        </div>
      )}

      {!isSearching && !searchError && visibleResults.length > 0 && (
        <div className="max-h-[300px] overflow-y-auto space-y-0.5">
          {visibleResults.map((movie, index) => (
            <SearchResult
              key={movie.id}
              movie={movie}
              isActive={index === activeIndex}
              onSelect={onClose}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchDropdown;

