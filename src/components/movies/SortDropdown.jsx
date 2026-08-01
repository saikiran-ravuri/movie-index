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
      <p
        id="sort-filter-label"
        className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9B6417]"
      >
        Sort
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
        className={`flex w-full items-center justify-between rounded-xl border bg-[#FFFDF8] px-4 py-3 text-left text-[15px] font-medium text-[#1F2329] shadow-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#B8862D]/20 disabled:cursor-not-allowed disabled:opacity-60 ${
          isOpen
            ? "border-[#B8862D] ring-4 ring-[#B8862D]/10"
            : "border-[#DCCDB5] hover:border-[#B8862D] hover:shadow-md"
        }`}
      >
        <span>{selectedOption.label}</span>

        <ChevronDown
          size={18}
          aria-hidden="true"
          className={`text-[#9B6417] transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute left-0 top-[calc(100%+10px)] z-40 w-full overflow-hidden rounded-2xl border border-[#E4D6BF] bg-[#FFFDF8] p-2 shadow-[0_16px_32px_rgba(67,52,35,0.12)]"
          role="listbox"
          aria-labelledby="sort-filter-label"
        >
          {SORT_OPTIONS.map((option, index) => {
            const isSelected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelection(option.value)}
                className={`${index > 0 ? "mt-1 " : ""}flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm transition-colors duration-200 ${
                  isSelected
                    ? "bg-[#F2E7D5] font-semibold text-[#9B6417]"
                    : "text-stone-700 hover:bg-[#F8F2E8] hover:text-[#9B6417]"
                }`}
              >
                <span>{option.label}</span>

                {isSelected && <Check size={16} aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SortDropdown;
