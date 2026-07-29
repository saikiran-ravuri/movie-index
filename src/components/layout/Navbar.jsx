import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";

import Container from "../common/Container";
import logo from "../../assets/logos/movie-index-logo.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Movies", path: "/movies" },
  { name: "Watchlist", path: "/watchlist" },
  { name: "Top Rated", path: "/top-rated" },
  { name: "About", path: "/about" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#e8ddca] bg-[#f8f4ec]/95 backdrop-blur-md">
      <Container>
        {/* Desktop */}

        <div className="hidden xl:grid grid-cols-[360px_1fr_320px] items-center py-5">
          {/* Logo */}

          <Link to="/" className="flex items-center gap-4 whitespace-nowrap">
            <img
              src={logo}
              alt="Movie Index"
              className="h-14 w-14 flex-shrink-0"
            />

            <div>
              <h1 className="font-['Cormorant_Garamond'] text-5xl font-bold leading-none text-[#1f2329]">
                Movie Index
              </h1>

              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.30em] text-[#b8862d]">
                Every Frame Has A Story
              </p>
            </div>
          </Link>

          {/* Navigation */}

          <ul className="flex items-center justify-center gap-10">
            {navLinks.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `relative pb-1 text-[15px] font-semibold transition ${
                      isActive
                        ? "text-[#b8862d]"
                        : "text-[#2f3136] hover:text-[#b8862d]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.name}

                      {isActive && (
                        <span className="absolute left-0 -bottom-1 h-[2px] w-full rounded-full bg-[#b8862d]" />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Search */}

          <div className="justify-self-end w-full max-w-[300px]">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#958b7c]"
              />

              <input
                type="text"
                placeholder="Search movies..."
                className="w-full rounded-full border border-[#d8ccb7] bg-white py-3 pl-11 pr-4 text-sm outline-none transition-all placeholder:text-[#958b7c] focus:border-[#b8862d] focus:ring-4 focus:ring-[#b8862d]/15"
              />
            </div>
          </div>
        </div>

         {/* Tablet + Mobile  */}

        <div className="xl:hidden">
          <div className="flex items-center justify-between py-5">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Movie Index" className="h-12 w-12" />

              <div>
                <h1 className="font-['Cormorant_Garamond'] text-4xl font-bold leading-none">
                  Movie Index
                </h1>

                <p className="mt-1 text-[9px] uppercase tracking-[0.25em] text-[#b8862d]">
                  Every Frame Has A Story
                </p>
              </div>
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-lg border border-[#ddd0bb] p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="space-y-5 border-t border-[#e8ddca] py-5">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#958b7c]"
                />

                <input
                  type="text"
                  placeholder="Search movies..."
                  className="w-full rounded-full border border-[#d8ccb7] bg-white py-3 pl-11 pr-4 text-sm outline-none"
                />
              </div>

              <ul className="space-y-2">
                {navLinks.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      end={item.path === "/"}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        `block rounded-lg px-4 py-3 font-semibold transition ${
                          isActive
                            ? "bg-[#f2e7d2] text-[#b8862d]"
                            : "hover:bg-[#f5ecdc]"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}

export default Navbar;
