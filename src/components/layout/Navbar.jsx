import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";

import Container from "../common/Container";
import SearchBar from "../navbar/SearchBar";
import SearchDropdown from "../navbar/SearchDropdown";
import useDebounce from "../../hooks/useDebounce";
import { searchMovies } from "../../services/tmdb";
import logo from "../../assets/logos/movie-index-logo.png";

const menuLinks = [
  { name: "Home", path: "/" },
  { name: "Watchlist", path: "/watchlist" },
  { name: "About", path: "/about" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const menuRef = useRef(null);
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }

      const clickedInsideDesktopSearch =
        desktopSearchRef.current &&
        desktopSearchRef.current.contains(event.target);

      const clickedInsideMobileSearch =
        mobileSearchRef.current &&
        mobileSearchRef.current.contains(event.target);

      if (!clickedInsideDesktopSearch && !clickedInsideMobileSearch) {
        setSearchQuery("");
        setIsMobileSearchOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        setIsMobileSearchOpen(false);
        setSearchQuery("");
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    let isCancelled = false;

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

        if (!isCancelled) {
          setSearchResults(results);
        }
      } catch (error) {
        console.error("Movie search failed:", error);

        if (!isCancelled) {
          setSearchError("Unable to search movies.");
          setSearchResults([]);
        }
      } finally {
        if (!isCancelled) {
          setIsSearching(false);
        }
      }
    }

    fetchSearchResults();

    return () => {
      isCancelled = true;
    };
  }, [debouncedSearchQuery]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function closeSearch() {
    setSearchQuery("");
    setSearchResults([]);
    setSearchError("");
    setIsSearching(false);
    setIsMobileSearchOpen(false);
  }

  function handleSearchChange(event) {
    setSearchQuery(event.target.value);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#e8ddca] bg-[#f8f4ec]/95 shadow-[0_8px_24px_rgba(72,52,29,0.07)] backdrop-blur-xl">
      <Container>
        <div className="relative flex min-h-[82px] items-center justify-between">
          <Link
            to="/"
            onClick={() => {
              closeMenu();
              closeSearch();
            }}
            aria-label="Go to Movie Index homepage"
            className="relative z-10 flex shrink-0 items-center gap-3"
          >
            <img
              src={logo}
              alt="Movie Index"
              className="h-11 w-11 shrink-0 object-contain sm:h-12 sm:w-12"
            />

            <div className="hidden min-w-0 xl:block">
              <h1 className="truncate font-['Cormorant_Garamond'] text-[34px] font-bold leading-none text-[#1f2329]">
                Movie Index
              </h1>

              <p className="mt-1 truncate text-[9px] font-semibold uppercase tracking-[0.24em] text-[#b8862d]">
                Every Frame Has A Story
              </p>
            </div>
          </Link>

          <div
            ref={desktopSearchRef}
            className="absolute left-1/2 hidden w-[52%] -translate-x-1/2 md:block lg:w-[56%] xl:w-[52%] 2xl:max-w-[780px]"
          >
            <SearchBar value={searchQuery} onChange={handleSearchChange} />

            <SearchDropdown
              isOpen={searchQuery.trim().length > 0}
              isSearching={isSearching}
              searchError={searchError}
              searchResults={searchResults}
              onClose={closeSearch}
            />
          </div>

          <div className="relative z-10 ml-auto flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setIsMobileSearchOpen((current) => !current);
                setIsMenuOpen(false);

                if (isMobileSearchOpen) {
                  closeSearch();
                }
              }}
              aria-label={
                isMobileSearchOpen ? "Close movie search" : "Open movie search"
              }
              aria-expanded={isMobileSearchOpen}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#ddd0bb] bg-white/90 text-[#1f2329] transition duration-300 hover:border-[#b8862d] hover:bg-[#f3e8d4] hover:text-[#9b6417] md:hidden"
            >
              {isMobileSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button>

            <div ref={menuRef} className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen((current) => !current);
                  setIsMobileSearchOpen(false);
                  setSearchQuery("");
                }}
                aria-label={
                  isMenuOpen ? "Close navigation menu" : "Open navigation menu"
                }
                aria-expanded={isMenuOpen}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#ddd0bb] bg-white/90 text-[#1f2329] transition duration-300 hover:border-[#b8862d] hover:bg-[#f3e8d4] hover:text-[#9b6417]"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 top-[calc(100%+12px)] w-56 overflow-hidden rounded-2xl border border-[#e4d8c5] bg-[#fffdf8] p-2 shadow-[0_14px_32px_rgba(72,52,29,0.14)]">
                  <div className="border-b border-[#eee5d8] px-3 pb-3 pt-2">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#b8862d]">
                      Navigation
                    </p>
                  </div>

                  <nav aria-label="Application navigation" className="pt-2">
                    <ul className="space-y-1">
                      {menuLinks.map((item) => (
                        <li key={item.path}>
                          <NavLink
                            to={item.path}
                            end={item.path === "/"}
                            onClick={() => {
                              closeMenu();
                              closeSearch();
                            }}
                            className={({ isActive }) =>
                              `block rounded-xl px-4 py-3 text-sm font-semibold transition-colors duration-300 ${
                                isActive
                                  ? "bg-[#f2e7d2] text-[#9b6417]"
                                  : "text-[#2f3136] hover:bg-[#f6efe3] hover:text-[#9b6417]"
                              }`
                            }
                          >
                            {item.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>

        {isMobileSearchOpen && (
          <div
            ref={mobileSearchRef}
            className="relative border-t border-[#e8ddca] pb-4 pt-4 md:hidden"
          >
            <SearchBar value={searchQuery} onChange={handleSearchChange} />

            <SearchDropdown
              isOpen={searchQuery.trim().length > 0}
              isSearching={isSearching}
              searchError={searchError}
              searchResults={searchResults}
              onClose={closeSearch}
            />
          </div>
        )}

        <div className="sr-only" aria-live="polite">
          {isSearching && "Searching movies."}

          {!isSearching &&
            !searchError &&
            debouncedSearchQuery.trim() &&
            `${searchResults.length} movies found.`}

          {searchError}
        </div>
      </Container>
    </header>
  );
}

export default Navbar;
