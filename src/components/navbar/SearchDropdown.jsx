import SearchResult from "./SearchResult";

function SearchDropdown({
  isOpen,
  isSearching,
  searchError,
  searchResults,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="absolute left-0 top-[calc(100%+12px)] z-50 w-full overflow-hidden rounded-3xl border border-[#e8ddca] bg-[#fffdf8] shadow-[0_20px_40px_rgba(72,52,29,0.14)]">
      {isSearching && (
        <div className="px-6 py-8 text-center text-sm font-medium text-[#8d7b63]">
          Searching movies...
        </div>
      )}

      {!isSearching && searchError && (
        <div className="px-6 py-8 text-center">
          <p className="font-semibold text-[#b24a3a]">
            Unable to search movies.
          </p>

          <p className="mt-1 text-sm text-[#8d7b63]">Please try again.</p>
        </div>
      )}

      {!isSearching && !searchError && searchResults.length === 0 && (
        <div className="px-6 py-10 text-center">
          <div className="text-4xl">🎬</div>

          <h3 className="mt-3 font-semibold text-[#1f2329]">No movies found</h3>

          <p className="mt-1 text-sm text-[#8d7b63]">
            Try another movie title.
          </p>
        </div>
      )}

      {!isSearching && !searchError && searchResults.length > 0 && (
        <div className="max-h-[520px] overflow-y-auto p-2">
          {searchResults.slice(0, 8).map((movie) => (
            <SearchResult key={movie.id} movie={movie} onSelect={onClose} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchDropdown;
