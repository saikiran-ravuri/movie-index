import { Search } from "lucide-react";

function SearchBar({ value, onChange, onKeyDown }) {
  return (
    <div className="w-full">
      <label className="relative block">
        <span className="sr-only">Search movies</span>

        <Search
          size={19}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#958b7c]"
        />

        <input
          type="search"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="Search movies..."
          className="w-full rounded-full border border-[#d8ccb7] bg-white py-2.5 pl-11 pr-4 text-sm text-[#1f2329] outline-none transition-colors placeholder:text-[#958b7c] hover:border-[#b8862d] focus:border-[#b8862d]"
        />
      </label>
    </div>
  );
}

export default SearchBar;
