import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";

import Container from "../common/Container";
import logo from "../../assets/logos/movie-index-logo.png";

const menuLinks = [
  { name: "Home", path: "/" },
  { name: "Watchlist", path: "/watchlist" },
  { name: "About", path: "/about" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        setIsMobileSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function handleSearchSubmit(event) {
    event.preventDefault();
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#e8ddca] bg-[#f8f4ec]/95 shadow-[0_10px_28px_rgba(72,52,29,0.08)] backdrop-blur-xl">
      <Container>
        <div className="flex min-h-[78px] items-center justify-between gap-5">
          <Link
            to="/"
            onClick={closeMenu}
            aria-label="Go to Movie Index homepage"
            className="flex min-w-0 items-center gap-3"
          >
            <img
              src={logo}
              alt="Movie Index"
              className="h-10 w-10 shrink-0 object-contain sm:h-11 sm:w-11"
            />

            <div className="min-w-0">
              <h1 className="truncate font-['Cormorant_Garamond'] text-[30px] font-bold leading-none text-[#1f2329] sm:text-[34px]">
                Movie Index
              </h1>

              <p className="mt-1 truncate text-[8px] font-semibold uppercase tracking-[0.24em] text-[#b8862d] sm:text-[9px]">
                Every Frame Has A Story
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <form
              onSubmit={handleSearchSubmit}
              className="hidden w-[260px] lg:block xl:w-[280px]"
            >
              <label className="relative block">
                <span className="sr-only">Search movies</span>

                <Search
                  size={17}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#958b7c]"
                />

                <input
                  type="search"
                  placeholder="Search movies..."
                  className="w-full rounded-full border border-[#d8ccb7] bg-white/90 py-2.5 pl-10 pr-4 text-sm text-[#1f2329] outline-none transition-all duration-300 placeholder:text-[#958b7c] hover:border-[#cbb996] focus:border-[#b8862d] focus:ring-4 focus:ring-[#b8862d]/10"
                />
              </label>
            </form>

            <button
              type="button"
              onClick={() => {
                setIsMobileSearchOpen((current) => !current);
                setIsMenuOpen(false);
              }}
              aria-label={
                isMobileSearchOpen ? "Close movie search" : "Open movie search"
              }
              aria-expanded={isMobileSearchOpen}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#ddd0bb] bg-white/85 text-[#1f2329] transition duration-300 hover:border-[#b8862d] hover:bg-[#f3e8d4] hover:text-[#9b6417] lg:hidden"
            >
              {isMobileSearchOpen ? <X size={19} /> : <Search size={19} />}
            </button>

            <div ref={menuRef} className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen((current) => !current);
                  setIsMobileSearchOpen(false);
                }}
                aria-label={
                  isMenuOpen ? "Close navigation menu" : "Open navigation menu"
                }
                aria-expanded={isMenuOpen}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#ddd0bb] bg-white/85 text-[#1f2329] transition duration-300 hover:border-[#b8862d] hover:bg-[#f3e8d4] hover:text-[#9b6417]"
              >
                {isMenuOpen ? <X size={19} /> : <Menu size={19} />}
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 top-[calc(100%+12px)] w-56 overflow-hidden rounded-2xl border border-[#e4d8c5] bg-[#fffdf8] p-2 shadow-[0_10px_28px_rgba(72,52,29,0.08)]">
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
                            onClick={closeMenu}
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
          <form
            onSubmit={handleSearchSubmit}
            className="border-t border-[#e8ddca] pb-4 pt-4 lg:hidden"
          >
            <label className="relative block">
              <span className="sr-only">Search movies</span>

              <Search
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#958b7c]"
              />

              <input
                type="search"
                autoFocus
                placeholder="Search movies..."
                className="w-full rounded-full border border-[#d8ccb7] bg-white py-2.5 pl-10 pr-4 text-sm text-[#1f2329] outline-none transition-all duration-300 placeholder:text-[#958b7c] focus:border-[#b8862d] focus:ring-4 focus:ring-[#b8862d]/10"
              />
            </label>
          </form>
        )}
      </Container>
    </header>
  );
}

export default Navbar;
