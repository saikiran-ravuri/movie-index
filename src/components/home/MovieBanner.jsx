import Container from "../common/Container";

function MovieBanner() {
  return (
    <section className="pb-24">
      <Container>
        <div className="overflow-hidden rounded-3xl border border-[#e8ddca] bg-white shadow-sm">
          <div className="space-y-6 p-8 sm:p-10 lg:p-14">
            <p className="text-sm font-semibold uppercase tracking-[0.30em] text-[#b8862d]">
              Featured Movie
            </p>

            <h2 className="font-['Cormorant_Garamond'] text-4xl font-bold text-[#1f2329] sm:text-5xl lg:text-6xl">
              Interstellar
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-600">
              <span>2014</span>

              <span>⭐ 8.7</span>

              <span>Science Fiction • Adventure • Drama</span>
            </div>

            <p className="max-w-3xl text-lg leading-8 text-gray-600">
              A team of explorers travels through a wormhole in space in an
              attempt to ensure humanity's survival.
            </p>

            <div className="flex flex-col gap-4 pt-2 sm:flex-row">
              <button className="rounded-full bg-[#b8862d] px-8 py-3 font-semibold text-white transition duration-300 hover:bg-[#9f7225]">
                View Details
              </button>

              <button className="rounded-full border border-[#d8ccb7] bg-white px-8 py-3 font-semibold text-[#1f2329] transition duration-300 hover:border-[#b8862d] hover:text-[#b8862d]">
                Watch Trailer
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default MovieBanner;
