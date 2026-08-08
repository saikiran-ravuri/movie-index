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
  if (!isOpen) {
    return null;
  }

  const visibleResults = searchResults
    .filter(
      (movie) =>
        movie &&
        movie.id &&
        movie.title?.trim() &&
        movie.poster_path &&
        movie.vote_count > 0,
    )
    .slice(0, 8);

  return (
    <div className="absolute left-0 top-[calc(100%+12px)] z-50 w-full overflow-hidden rounded-3xl border border-[#E8DDCA] bg-[#FFFDF8] shadow-[0_20px_40px_rgba(72,52,29,0.14)]">
      {isSearching && (
        <div className="px-6 py-8 text-center text-sm font-medium text-[#8D7B63]">
          Searching movies...
        </div>
      )}

      {!isSearching && searchError && (
        <div className="px-6 py-8 text-center">
          <p className="font-semibold text-[#B24A3A]">
            Unable to search movies.
          </p>

          <p className="mt-1 text-sm text-[#8D7B63]">Please try again.</p>
        </div>
      )}

      {!isSearching && !searchError && visibleResults.length === 0 && (
        <div className="px-6 py-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#E8DBC7] bg-[#F7F0E4] text-[#B8862D]">
            <Film size={24} aria-hidden="true" />
          </div>

          <h3 className="mt-4 font-semibold text-[#1F2329]">No movies found</h3>

          <p className="mt-1 text-sm text-[#8D7B63]">
            Try another movie title.
          </p>
        </div>
      )}

      {!isSearching && !searchError && visibleResults.length > 0 && (
        <div className="max-h-[500px] overflow-y-auto p-2 [scrollbar-width:thin] [scrollbar-color:#C9B48E_transparent]">
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
