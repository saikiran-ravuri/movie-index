import Container from "../common/Container";

function Hero() {
  function handleDiscoverMovies() {
    const moviesSection = document.getElementById("popular-movies");

    if (moviesSection) {
      moviesSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  return (
    <section className="pb-14 pt-10 sm:pb-16 sm:pt-12 lg:pb-20 lg:pt-14">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#b8862d] sm:text-sm">
            Welcome to Movie Index
          </p>

          <h1 className="font-['Cormorant_Garamond'] text-5xl font-bold leading-[1.02] text-[#1f2329] sm:text-6xl lg:text-7xl">
            Discover Your Next
            <br />
            Favorite Movie
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-[#6b7280] sm:text-lg sm:leading-8">
            Discover popular movies from around the world. Search instantly,
            explore detailed information, and build your personal watchlist—all
            in one beautifully crafted experience.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={handleDiscoverMovies}
              className="w-full rounded-full bg-[#b8862d] px-8 py-3.5 text-center text-sm font-semibold text-white transition duration-300 hover:bg-[#9f7225] sm:w-auto"
            >
              Discover Movies
            </button>

            {/* <Link
              to="/watchlist"
              className="w-full rounded-full border border-[#d8ccb7] bg-white px-8 py-3.5 text-center text-sm font-semibold text-[#1f2329] transition duration-300 hover:border-[#b8862d] hover:text-[#b8862d] sm:w-auto"
            >
              My Watchlist
            </Link> */}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
