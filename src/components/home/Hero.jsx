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
    <section className="py-12 sm:py-16">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#9b6417] sm:text-sm">
            Welcome to Movie Index
          </p>

          <h1 className="font-['Cormorant_Garamond'] text-5xl font-bold leading-tight text-[#1f2329] sm:text-6xl">
            Discover Your Next
            <br />
            Favorite Movie
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-stone-600 sm:text-lg">
            Discover popular movies from around the world. Search instantly,
            explore detailed information, and build your personal watchlist—all
            in one beautifully crafted experience.
          </p>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={handleDiscoverMovies}
              className="rounded-full bg-[#b8862d] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#9b6417]"
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
