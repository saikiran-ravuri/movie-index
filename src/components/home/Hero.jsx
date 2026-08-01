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
    <section className="pb-10 pt-10 sm:pb-12 sm:pt-12 lg:pb-14 lg:pt-14">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#b8862d] sm:text-sm">
            Welcome to Movie Index
          </p>

          <h1 className="font-['Cormorant_Garamond'] text-5xl font-bold leading-[1.02] text-[#1f2329] sm:text-6xl lg:text-7xl">
            Discover Your Next
            <br />
            Favorite Movie
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#6b7280] sm:text-lg sm:leading-8">
            Discover popular movies from around the world. Search instantly,
            explore detailed information, and build your personal watchlist—all
            in one beautifully crafted experience.
          </p>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={handleDiscoverMovies}
              className="rounded-full bg-[#b8862d] px-8 py-3.5 text-sm font-semibold text-white transition duration-300 hover:bg-[#9f7225]"
            >
              Discover Movies
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
