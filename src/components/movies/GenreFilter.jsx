import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function GenreFilter({
  genres = [],
  selectedGenre,
  onGenreChange,
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedGenreName =
    genres.find((genre) => String(genre.id) === String(selectedGenre))?.name ||
    "All Genres";

  useEffect(() => {
    function handleOutsideClick(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function handleSelection(genreId) {
    onGenreChange(genreId);
    setIsOpen(false);
  }

  return (
    <div ref={dropdownRef} className="relative w-full sm:w-[270px]">
      <p
        id="genre-filter-label"
        className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#9B6417]"
      >
        Genre
      </p>

      <button
        type="button"
        onClick={() => {
          if (!disabled) {
            setIsOpen((current) => !current);
          }
        }}
        disabled={disabled}
        aria-labelledby="genre-filter-label"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`flex w-full items-center justify-between rounded-xl border bg-[#FFFDF8] px-4 py-3 text-left text-sm font-semibold text-[#1F2329] shadow-[0_4px_14px_rgba(67,52,35,0.05)] transition duration-300 focus:outline-none focus:ring-4 focus:ring-[#B8862D]/20 disabled:cursor-not-allowed disabled:opacity-60 ${
          isOpen
            ? "border-[#B8862D] ring-4 ring-[#B8862D]/10"
            : "border-[#DCCDB5] hover:border-[#B8862D]"
        }`}
      >
        <span>{selectedGenreName}</span>

        <ChevronDown
          size={18}
          aria-hidden="true"
          className={`text-[#9B6417] transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-[calc(100%+10px)] z-40 w-full overflow-hidden rounded-2xl border border-[#DED0B9] bg-[#FFFDF8] p-2 shadow-[0_18px_40px_rgba(67,52,35,0.16)]">
          <div
            role="listbox"
            aria-labelledby="genre-filter-label"
            className="space-y-1"
          >
            <button
              type="button"
              role="option"
              aria-selected={selectedGenre === ""}
              onClick={() => handleSelection("")}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors duration-200 ${
                selectedGenre === ""
                  ? "bg-[#F1E5D1] text-[#9B6417]"
                  : "text-stone-700 hover:bg-[#F7F0E4] hover:text-[#9B6417]"
              }`}
            >
              <span>All Genres</span>

              {selectedGenre === "" && <Check size={16} aria-hidden="true" />}
            </button>

            {genres.map((genre) => {
              const isSelected = String(selectedGenre) === String(genre.id);

              return (
                <button
                  key={genre.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelection(String(genre.id))}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors duration-200 ${
                    isSelected
                      ? "bg-[#F1E5D1] text-[#9B6417]"
                      : "text-stone-700 hover:bg-[#F7F0E4] hover:text-[#9B6417]"
                  }`}
                >
                  <span>{genre.name}</span>

                  {isSelected && <Check size={16} aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default GenreFilter;
