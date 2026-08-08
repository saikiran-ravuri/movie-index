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
          className="w-full rounded-full border border-[#d8ccb7] bg-white py-3 pl-12 pr-5 text-[15px] text-[#1f2329] outline-none transition duration-300 placeholder:text-[#958b7c] hover:border-[#cbb996] focus:border-[#b8862d] focus:ring-4 focus:ring-[#b8862d]/10"
        />
      </label>
    </div>
  );
}

export default SearchBar;
