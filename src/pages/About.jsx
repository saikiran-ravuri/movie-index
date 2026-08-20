import {
  ArrowUpRight,
  Check,
  Code2,
  Database,
  HardDrive,
  Layers3,
  Route,
  Zap,
} from "lucide-react";

import Container from "../components/common/Container";
import logo from "../assets/logos/movie-index-logo.jpg";
import tmdbLogo from "../assets/logos/tmdb-logo.svg";

const engineeringPrinciples = [
  "Component-based architecture",
  "Reusable UI components",
  "Clear separation of responsibilities",
  "API service layer",
  "Context API for shared state",
  "Custom React hooks",
  "Debounced movie search",
  "Loading, error, and empty states",
  "Responsive interface design",
  "Persistent Local Storage",
];

const technologies = [
  { name: "React", icon: Code2 },
  { name: "Vite", icon: Zap },
  { name: "Tailwind CSS", icon: Layers3 },
  { name: "React Router DOM", icon: Route },
  { name: "TMDB API", icon: Database },
  { name: "Local Storage", icon: HardDrive },
  { name: "Lucide React", icon: Code2 },
];

function About() {
  return (
    <main className="min-h-screen bg-[#f8f4ec] py-10 sm:py-12 lg:py-14">
      <Container>
        <div className="mx-auto max-w-6xl space-y-12">
          {/* Hero */}
          <section className="relative overflow-hidden rounded-2xl border border-[#e6dcc8] bg-[#1f2329] p-8 text-white sm:p-10 lg:p-12">
            <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-center">
              <div>
                <div className="flex items-center gap-4">
                  <img
                    src={logo}
                    alt="Movie Index logo"
                    className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14"
                  />

                  <div>
                    <p className="text-xs font-semibold text-[#b8862d]">
                      Movie Index
                    </p>

                    <p className="font-['Cormorant_Garamond'] text-lg font-bold text-stone-200">
                      Every Frame Has A Story
                    </p>
                  </div>
                </div>

                <h1 className="mt-6 font-['Cormorant_Garamond'] text-4xl font-bold leading-tight text-white sm:text-5xl">
                  Crafted with focus. Inspired by cinema.
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-300 sm:text-base">
                  Movie Index is a focused React application that combines movie
                  discovery, detailed information, live search, filtering,
                  sorting, pagination, and a personal watchlist within one clear
                  and consistent experience.
                </p>
              </div>

              <aside className="rounded-xl border border-white/15 bg-white/5 p-6">
                <p className="text-xs font-medium text-stone-400">
                  Designed and developed by
                </p>

                <h2 className="mt-1 font-['Cormorant_Garamond'] text-2xl font-bold text-white">
                  Ravuri Sai Kiran
                </h2>

                <p className="mt-2 text-xs leading-relaxed text-stone-300">
                  Computer Science graduate building product-focused React
                  applications with attention to clean structure, usability,
                  and maintainability.
                </p>

                <a
                  href="https://github.com/saikiran-ravuri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#b8862d] px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#9b6417]"
                >
                  View GitHub
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </aside>
            </div>
          </section>

          {/* Engineering Principles */}
          <section className="py-4">
            <div className="mb-6">
              <p className="text-xs font-semibold text-[#b8862d]">
                Engineering Principles
              </p>

              <h2 className="mt-1 font-['Cormorant_Garamond'] text-3xl font-bold text-[#1f2329] sm:text-4xl">
                Clear responsibilities and maintainable decisions.
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {engineeringPrinciples.map((principle) => (
                <div
                  key={principle}
                  className="flex items-center gap-3 rounded-xl border border-[#e6dcc8] bg-white p-4"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f8f4ec] text-[#b8862d]">
                    <Check size={14} strokeWidth={2.5} aria-hidden="true" />
                  </span>

                  <p className="text-xs font-medium text-stone-700">
                    {principle}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Technology Stack */}
          <section className="border-t border-[#e6dcc8] pt-10">
            <div className="mb-6">
              <p className="text-xs font-semibold text-[#b8862d]">
                Technology Stack
              </p>

              <h2 className="mt-1 font-['Cormorant_Garamond'] text-3xl font-bold text-[#1f2329] sm:text-4xl">
                A focused frontend foundation
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
              {technologies.map(({ name, icon: Icon }) => (
                <article
                  key={name}
                  className="flex flex-col items-center justify-center rounded-xl border border-[#e6dcc8] bg-white p-4 text-center"
                >
                  <Icon size={20} className="text-[#b8862d]" aria-hidden="true" />

                  <h3 className="mt-2 text-xs font-semibold text-[#1f2329]">
                    {name}
                  </h3>
                </article>
              ))}
            </div>
          </section>

          {/* Data & Attribution */}
          <section className="rounded-2xl border border-[#e6dcc8] bg-white p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#1f2329]">
                  Data &amp; Attribution
                </h2>

                <p className="mt-2 text-xs leading-relaxed text-stone-600 sm:text-sm">
                  Movie information displayed throughout Movie Index is provided by
                  <span className="font-semibold text-[#1f2329]">
                    {" "}
                    The Movie Database (TMDB)
                  </span>
                  . Watchlist data is stored locally in the current browser using Local Storage and is not synchronized or shared externally.
                </p>
              </div>

              <div className="rounded-xl border border-[#e6dcc8] bg-[#f8f4ec] p-4 text-center lg:max-w-xs">
                <img
                  src={tmdbLogo}
                  alt="The Movie Database (TMDB)"
                  className="mx-auto h-7 w-auto object-contain"
                />

                <p className="mt-3 text-[11px] leading-snug text-stone-500">
                  This product uses the TMDB API but is not endorsed or certified by TMDB.
                </p>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}

export default About;

