import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../common/Container";
import logo from "../../assets/logos/movie-index-logo.jpg";

const footerLinks = [
  { label: "Home", to: "/" },
  { label: "Watchlist", to: "/watchlist" },
  { label: "About", to: "/about" },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-[#E8DDCA] bg-[#F8F4EC]">
      <Container>
        <div className="py-9 sm:py-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <Link
                to="/"
                aria-label="Go to Movie Index homepage"
                className="inline-flex items-center gap-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#B8862D]/20"
              >
                <img
                  src={logo}
                  alt="Movie Index logo"
                  className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14"
                />

                <div>
                  <h2 className="font-['Cormorant_Garamond'] text-[32px] font-bold leading-none text-[#1F2329] sm:text-[34px]">
                    Movie Index
                  </h2>

                  <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#B8862D]">
                    Every Frame Has A Story
                  </p>
                </div>
              </Link>

              <p className="mt-4 max-w-lg text-sm leading-7 text-stone-600 sm:text-base">
                Discover movies, explore detailed information, and build a
                personal watchlist through a clean and thoughtfully crafted
                experience.
              </p>
            </div>

            <div className="lg:text-right">
              <p className="mb-4 mt-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#9B6417]">
                Navigation
              </p>

              <nav aria-label="Footer navigation">
                <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:justify-end">
                  {footerLinks.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="rounded-md text-sm font-medium text-stone-600 transition-colors duration-300 hover:text-[#9B6417] focus:outline-none focus:ring-4 focus:ring-[#B8862D]/15"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}

                  <li>
                    <a
                      href="https://github.com/saikiran-ravuri"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-stone-600 transition-colors duration-300 hover:text-[#9B6417] focus:outline-none focus:ring-4 focus:ring-[#B8862D]/15"
                    >
                      GitHub Profile
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-[#EEE4D6] pt-4 text-xs text-stone-500 sm:flex-row sm:items-end sm:justify-between">
            <p>© {currentYear} Movie Index · All rights reserved.</p>

            <div className="sm:text-right">
              <p className="uppercase tracking-[0.12em] text-stone-500">
                Designed &amp; Developed by
              </p>

              <a
                href="https://github.com/saikiran-ravuri"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block rounded-md text-sm font-semibold text-[#9B6417] transition-colors duration-300 hover:text-[#B8862D] focus:outline-none focus:ring-4 focus:ring-[#B8862D]/15"
              >
                Ravuri Sai Kiran
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
