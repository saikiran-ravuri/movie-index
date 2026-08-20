import { useEffect, useRef, useState, useMemo } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import Container from "../common/Container";
import SearchBar from "../navbar/SearchBar";
import SearchDropdown from "../navbar/SearchDropdown";
import logo from "../../assets/logos/movie-index-logo.jpg";
import useDebounce from "../../hooks/useDebounce";
import { searchMovies } from "../../services/tmdb";

const menuLinks = [
  { name: "Home", path: "/" },
  { name: "Movies", path: "/movies" },
  { name: "Watchlist", path: "/watchlist" },
  { name: "About", path: "/about" },
];

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  const debouncedSearchQuery = useDebounce(searchQuery, 400);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchQuery("");
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setSearchQuery("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    let active = true;

    async function fetchSearchResults() {
      const query = debouncedSearchQuery.trim();
      if (!query) {
        setSearchResults([]);
        setSearchError("");
        setIsSearching(false);
        return;
      }

      try {
        setIsSearching(true);
        setSearchError("");
        const results = await searchMovies(query);
        if (active) setSearchResults(results);
      } catch (error) {
        if (active) {
          setSearchError("Unable to search movies.");
          setSearchResults([]);
        }
      } finally {
        if (active) setIsSearching(false);
      }
    }

    fetchSearchResults();
    return () => {
      active = false;
    };
  }, [debouncedSearchQuery]);

  const visibleSearchResults = useMemo(() => {
    return searchResults
      .filter(
        (movie) =>
          movie &&
          movie.id &&
          movie.title?.trim() &&
          movie.poster_path &&
          movie.vote_count > 0,
      )
      .slice(0, 6);
  }, [searchResults]);

  function closeSearch() {
    setSearchQuery("");
    setSearchResults([]);
    setSearchError("");
    setIsSearching(false);
    setActiveIndex(-1);
  }

  function handleSearchKeyDown(event) {
    if (!searchQuery.trim() || visibleSearchResults.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) =>
        prev < visibleSearchResults.length - 1 ? prev + 1 : prev,
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (activeIndex >= 0 && visibleSearchResults[activeIndex]) {
        navigate(`/movie/${visibleSearchResults[activeIndex].id}`);
        closeSearch();
      }
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#e6dcc8] bg-[#f8f4ec]">
      <Container>
        <div className="relative flex h-20 items-center justify-between gap-4">
          <Link
            to="/"
            onClick={closeSearch}
            className="flex shrink-0 items-center gap-2.5"
          >
            <img
              src={logo}
              alt="Movie Index"
              className="h-9 w-9 rounded-lg object-cover sm:h-10 sm:w-10"
            />
            <span className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#1f2329]">
              Movie Index
            </span>
          </Link>

          <div
            ref={searchRef}
            className="absolute left-1/2 -translate-x-1/2 w-72 lg:w-96 xl:w-[440px]"
          >
            <SearchBar
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveIndex(-1);
              }}
              onKeyDown={handleSearchKeyDown}
            />

            <SearchDropdown
              isOpen={searchQuery.trim().length > 0}
              isSearching={isSearching}
              searchError={searchError}
              searchResults={visibleSearchResults}
              activeIndex={activeIndex}
              onClose={closeSearch}
            />
          </div>

          <nav className="flex items-center gap-6">
            {menuLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `text-sm font-semibold transition-colors ${
                    isActive ? "text-[#9b6417]" : "text-[#2f3136] hover:text-[#9b6417]"
                  }`
                }
              >
                {({ isActive }) => (
                  <span className="relative inline-block py-1">
                    {item.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#9b6417]" />
                    )}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </Container>
    </header>
  );
}

export default Navbar;

