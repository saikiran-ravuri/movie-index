import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SORT_OPTIONS = [
  {
    label: "Most Popular",
    value: "popularity.desc",
  },
  {
    label: "Highest Rated",
    value: "vote_average.desc",
  },
  {
    label: "Newest",
    value: "primary_release_date.desc",
  },
  {
    label: "Oldest",
    value: "primary_release_date.asc",
  },
];

function SortDropdown({ value, onChange, disabled = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption =
    SORT_OPTIONS.find((option) => option.value === value) ?? SORT_OPTIONS[0];

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

  function handleSelection(sortValue) {
    onChange(sortValue);
    setIsOpen(false);
  }

  return (
    <div ref={dropdownRef} className="relative w-full sm:w-[250px]">
      <p id="sort-filter-label" className="mb-1.5 text-xs font-semibold text-stone-700">
        Sort By
      </p>

      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (!disabled) {
            setIsOpen((current) => !current);
          }
        }}
        aria-labelledby="sort-filter-label"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`flex w-full items-center justify-between rounded-xl border bg-white px-4 py-2.5 text-left text-sm font-medium text-[#1f2329] transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
          isOpen
            ? "border-[#b8862d]"
            : "border-[#e6dcc8] hover:border-[#b8862d]"
        }`}
      >
        <span>{selectedOption.label}</span>

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
          aria-labelledby="sort-filter-label"
        >
          {SORT_OPTIONS.map((option) => {
            const isSelected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelection(option.value)}
                className={`mt-0.5 first:mt-0 flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  isSelected
                    ? "bg-[#f8f4ec] font-semibold text-[#b8862d]"
                    : "text-stone-700 hover:bg-[#f8f4ec] hover:text-[#b8862d]"
                }`}
              >
                <span>{option.label}</span>
                {isSelected && <Check size={15} aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SortDropdown;

