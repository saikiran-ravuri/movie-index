import { Link } from "react-router-dom";

import Container from "../common/Container";

function Hero() {
  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#b8862d] sm:text-sm">
            Welcome to Movie Index
          </p>

          <h1 className="font-['Cormorant_Garamond'] text-5xl font-bold leading-[1.05] text-[#1f2329] sm:text-6xl lg:text-7xl">
            Discover Your Next
            <br />
            Favorite Movie
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#6b7280] sm:mt-8 sm:text-lg">
            Explore trending, top-rated, and timeless movies from around the
            world. Build your watchlist and discover stories worth remembering.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/movies"
              className="w-full rounded-full bg-[#b8862d] px-8 py-3.5 text-center text-sm font-semibold text-white transition duration-300 hover:bg-[#9f7225] sm:w-auto"
            >
              Explore Movies
            </Link>

            <Link
              to="/top-rated"
              className="w-full rounded-full border border-[#d8ccb7] bg-white px-8 py-3.5 text-center text-sm font-semibold text-[#1f2329] transition duration-300 hover:border-[#b8862d] hover:text-[#b8862d] sm:w-auto"
            >
              Browse Top Rated
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;