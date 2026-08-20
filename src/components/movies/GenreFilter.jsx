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
    <div ref={dropdownRef} className="relative w-full sm:w-[250px]">
      <p id="genre-filter-label" className="mb-1.5 text-xs font-semibold text-stone-700">
        Genre
      </p>

      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (!disabled) {
            setIsOpen((current) => !current);
          }
        }}
        aria-labelledby="genre-filter-label"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`flex w-full items-center justify-between rounded-xl border bg-white px-4 py-2.5 text-left text-sm font-medium text-[#1f2329] transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
          isOpen
            ? "border-[#b8862d]"
            : "border-[#e6dcc8] hover:border-[#b8862d]"
        }`}
      >
        <span>{selectedGenreName}</span>

        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`text-stone-500 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#b8862d]" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute left-0 top-[calc(100%+6px)] z-40 w-full overflow-hidden rounded-xl border border-[#e6dcc8] bg-white p-1.5 shadow-md"
          role="listbox"
          aria-labelledby="genre-filter-label"
        >
          <button
            type="button"
            role="option"
            aria-selected={selectedGenre === ""}
            onClick={() => handleSelection("")}
            className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
              selectedGenre === ""
                ? "bg-[#f8f4ec] font-semibold text-[#b8862d]"
                : "text-stone-700 hover:bg-[#f8f4ec] hover:text-[#b8862d]"
            }`}
          >
            <span>All Genres</span>
            {selectedGenre === "" && <Check size={15} aria-hidden="true" />}
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
                className={`mt-0.5 flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  isSelected
                    ? "bg-[#f8f4ec] font-semibold text-[#b8862d]"
                    : "text-stone-700 hover:bg-[#f8f4ec] hover:text-[#b8862d]"
                }`}
              >
                <span>{genre.name}</span>
                {isSelected && <Check size={15} aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default GenreFilter;

