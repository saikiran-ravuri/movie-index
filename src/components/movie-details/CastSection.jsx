import Container from "../common/Container";

function CastSection({ cast }) {
  if (!cast || cast.length === 0) {
    return null;
  }

  return (
    <section>
      <Container>
        <div className="mb-10 sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#9B6417] sm:text-sm">
            Meet the Cast
          </p>

          <h2 className="mt-3 font-['Cormorant_Garamond'] text-4xl font-bold text-stone-900 sm:text-5xl">
            Top Cast
          </h2>

          <p className="mt-3 max-w-2xl text-base leading-7 text-stone-600">
            The leading performers and the characters they portray in the movie.
          </p>
        </div>

        <div className="-mx-1 flex gap-5 overflow-x-auto px-1 pb-5">
          {cast.map((person) => {
            const profileUrl = person.profile_path
              ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
              : null;

            return (
              <article
                key={`${person.id}-${person.cast_id}`}
                className="group w-[180px] shrink-0 overflow-hidden rounded-2xl border border-[#E2D3BC] bg-white shadow-[0_5px_18px_rgba(67,52,35,0.06)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#C58B2A]/40 hover:shadow-[0_12px_26px_rgba(67,52,35,0.1)] sm:w-[200px]"
              >
                <div className="aspect-[2/3] overflow-hidden bg-[#EEE5D8]">
                  {profileUrl ? (
                    <img
                      src={profileUrl}
                      alt={person.name}
                      loading="lazy"
                      decoding="async"
                      width="300"
                      height="450"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-3 px-4 text-center text-sm font-medium text-stone-500">
                      <span
                        aria-hidden="true"
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F7F0E4] text-xl"
                      >
                        🎭
                      </span>
                      Image unavailable
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3
                    className="truncate text-base font-semibold text-stone-900"
                    title={person.name}
                  >
                    {person.name}
                  </h3>

                  <p
                    className="mt-1 line-clamp-2 min-h-[40px] text-sm leading-5 text-stone-500"
                    title={person.character || "Character unavailable"}
                  >
                    {person.character || "Character unavailable"}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default CastSection;
