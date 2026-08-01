import {
  ArrowUpRight,
  Check,
  Code2,
  Database,
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
  "Context API for shared state",
  "Custom React hooks",
  "Debounced movie search",
  "Responsive interface design",
  "Persistent Local Storage",
];

const technologies = [
  {
    name: "React",
    icon: Code2,
  },
  {
    name: "Vite",
    icon: Zap,
  },
  {
    name: "Tailwind CSS",
    icon: Layers3,
  },
  {
    name: "React Router",
    icon: Route,
  },
  {
    name: "TMDB API",
    icon: Database,
  },
  {
    name: "Lucide React",
    icon: Code2,
  },
];

function About() {
  return (
    <main className="min-h-screen bg-[#F7F2E9] py-12 sm:py-14 lg:py-16">
      <Container>
        <div className="mx-auto max-w-6xl">
          {/* Hero */}
          <section className="relative overflow-hidden rounded-[32px] border border-[#D7C6AA] bg-[linear-gradient(135deg,#17191D_0%,#24211D_52%,#181A1E_100%)] px-7 py-8 shadow-[0_22px_55px_rgba(67,52,35,0.18)] sm:px-10 sm:py-10 lg:px-14 lg:py-11">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_86%_16%,rgba(184,134,45,0.22),transparent_34%)]" />

            <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-[#D5A64E]/15" />

            <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-black/30 to-transparent" />

            <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-center">
              <div className="max-w-2xl">
                <div className="flex items-center gap-4">
                  <img
                    src={logo}
                    alt="Movie Index logo"
                    className="h-14 w-14 shrink-0 object-contain sm:h-16 sm:w-16"
                  />

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#D5A64E] sm:text-xs">
                      Movie Index
                    </p>

                    <p className="mt-1 font-['Cormorant_Garamond'] text-xl font-bold text-white sm:text-2xl">
                      Every Frame Has A Story
                    </p>
                  </div>
                </div>

                <h1 className="mt-6 font-['Cormorant_Garamond'] text-4xl font-bold leading-[0.96] text-white sm:text-5xl lg:text-6xl">
                  Crafted with focus.
                  <br />
                  Inspired by cinema.
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                  Movie Index is a focused React application that combines movie
                  discovery, detailed information, live search, and a personal
                  watchlist within one clear and consistent experience.
                </p>
              </div>

              <aside className="rounded-3xl border border-white/10 bg-white/[0.08] p-7 shadow-[0_12px_32px_rgba(0,0,0,0.18)] backdrop-blur-md">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/45">
                  Designed and developed by
                </p>

                <h2 className="mt-2 font-['Cormorant_Garamond'] text-3xl font-bold leading-tight text-white">
                  Ravuri Sai Kiran
                </h2>

                <p className="mt-3 text-sm leading-6 text-white/70">
                  Computer Science graduate building product-focused React
                  applications with attention to clean structure, usability, and
                  maintainability.
                </p>

                <a
                  href="https://github.com/saikiran-ravuri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#D5A64E] px-5 py-2.5 text-sm font-semibold text-[#1F2329] shadow-[0_8px_18px_rgba(213,166,78,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#E3B45D] focus:outline-none focus:ring-4 focus:ring-[#D5A64E]/25"
                >
                  View GitHub
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </aside>
            </div>
          </section>

          {/* Engineering Principles */}
          <section className="py-14 sm:py-16 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#9B6417] sm:text-sm">
                  Engineering Principles
                </p>

                <h2 className="mt-4 font-['Cormorant_Garamond'] text-4xl font-bold leading-tight text-[#1F2329] sm:text-5xl">
                  Clear responsibilities.
                  <br />
                  Maintainable decisions.
                </h2>

                <p className="mt-5 max-w-xl text-base leading-8 text-stone-600">
                  The project is organized around focused modules instead of
                  large components that mix interface, API, storage, and
                  navigation responsibilities.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {engineeringPrinciples.map((principle) => (
                  <div
                    key={principle}
                    className="flex items-center gap-4 rounded-2xl border border-[#E2D3BC] bg-white px-5 py-4 shadow-[0_5px_18px_rgba(67,52,35,0.05)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[#B8862D]/35 hover:shadow-[0_10px_24px_rgba(67,52,35,0.08)]"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F7F0E4] text-[#B8862D]">
                      <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                    </span>

                    <p className="text-sm font-medium text-stone-700 sm:text-base">
                      {principle}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Technology Stack */}
          <section className="border-t border-[#DED0B9] py-14 sm:py-16 lg:py-20">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#9B6417] sm:text-sm">
                Technology Stack
              </p>

              <h2 className="mt-4 font-['Cormorant_Garamond'] text-4xl font-bold text-[#1F2329] sm:text-5xl">
                A focused frontend foundation
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {technologies.map(({ name, icon: Icon }) => (
                <article
                  key={name}
                  className="group flex min-h-[120px] flex-col items-center justify-center rounded-2xl border border-[#E2D3BC] bg-white p-5 text-center shadow-[0_5px_18px_rgba(67,52,35,0.05)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#B8862D]/40 hover:shadow-[0_12px_26px_rgba(67,52,35,0.09)]"
                >
                  <Icon
                    size={24}
                    className="text-[#B8862D]"
                    aria-hidden="true"
                  />

                  <h3 className="mt-4 text-sm font-semibold text-[#1F2329]">
                    {name}
                  </h3>
                </article>
              ))}
            </div>
          </section>

          {/* Development Approach */}
          <section>
            <div className="rounded-[32px] border border-[#DCCDB5] bg-[#F3EBDE] p-7 sm:p-10 lg:p-12">
              <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#9B6417] sm:text-sm">
                    Development Approach
                  </p>

                  <h2 className="mt-4 font-['Cormorant_Garamond'] text-4xl font-bold leading-tight text-[#1F2329] sm:text-5xl">
                    Built incrementally,
                    <br />
                    refined intentionally.
                  </h2>
                </div>

                <div className="space-y-5 text-base leading-8 text-stone-600">
                  <p>
                    Each meaningful feature was implemented, tested, visually
                    reviewed, and committed before the next milestone was
                    introduced.
                  </p>

                  <p>
                    The project prioritizes maintainable structure, consistent
                    interaction patterns, and useful functionality over feature
                    quantity.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Data and Attribution */}
          {/* Data and Attribution */}
          <section className="pt-14 sm:pt-16 lg:pt-20">
            <div className="rounded-[30px] border border-[#DED0B9] bg-white px-7 py-8 shadow-[0_6px_20px_rgba(67,52,35,0.05)] sm:px-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9B6417]">
                    Data & Attribution
                  </p>

                  <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-600 sm:text-base">
                    Movie information displayed throughout Movie Index is
                    provided by
                    <span className="font-semibold text-[#1F2329]">
                      {" "}
                      The Movie Database (TMDB)
                    </span>
                    . Your watchlist is stored locally in your browser using
                    Local Storage and is never uploaded or shared with any
                    external service.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#E8DBC7] bg-[#F7F0E4] px-6 py-5 text-center lg:max-w-sm">
                  <img
                    src={tmdbLogo}
                    alt="The Movie Database (TMDB)"
                    className="mx-auto h-8 w-auto object-contain"
                  />

                  <p className="mt-4 text-xs leading-6 text-stone-500">
                    This product uses the TMDB API but is not endorsed or
                    certified by TMDB.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}

export default About;
