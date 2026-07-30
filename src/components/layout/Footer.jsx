import { Heart } from "lucide-react";

import Container from "../common/Container";

function Footer() {
  return (
    <footer className="mt-20 border-t border-[#e8ddca] bg-[#f8f4ec]">
      <Container>
        <div className="py-16">
          <div className="flex flex-col items-center text-center">
            <h2 className="font-['Cormorant_Garamond'] text-5xl font-bold text-[#1f2329]">
              Movie Index
            </h2>

            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.30em] text-[#b8862d]">
              Every Frame Has A Story
            </p>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#6b7280]">
              Discover movies, explore detailed information, and build your
              personal watchlist through a clean, elegant, and modern cinema
              experience powered by TMDB.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-[#6b7280]">
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition duration-300 hover:text-[#b8862d]"
              >
                Powered by TMDB
              </a>

              <span className="h-1 w-1 rounded-full bg-[#d5a64e]" />

              <a
                href="https://github.com/saikiran-ravuri"
                target="_blank"
                rel="noopener noreferrer"
                className="transition duration-300 hover:text-[#b8862d]"
              >
                GitHub Profile
              </a>
            </div>

            <div className="mt-10 h-px w-full max-w-md bg-[#e4d7c2]" />

            <p className="mt-8 flex items-center gap-2 text-sm text-[#7b7b7b]">
              Made with
              <Heart size={15} fill="currentColor" className="text-[#b8862d]" />
              using React & TMDB API
            </p>

            <p className="mt-4 text-sm text-[#9a9a9a]">
              © {new Date().getFullYear()} Movie Index. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
