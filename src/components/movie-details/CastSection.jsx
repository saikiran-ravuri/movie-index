import Container from "../common/Container";

function CastSection({ cast }) {
  if (!cast || cast.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#F7F2E9] pb-24">
      <Container>
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9B6417] sm:text-sm">
            Meet the Cast
          </p>

          <h2 className="mt-3 font-['Cormorant_Garamond'] text-4xl font-bold text-stone-900 sm:text-5xl">
            Top Cast
          </h2>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-4">
          {cast.map((person) => {
            const profileUrl = person.profile_path
              ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
              : null;

            return (
              <article
                key={`${person.id}-${person.cast_id}`}
                className="w-[180px] shrink-0 overflow-hidden rounded-2xl border border-[#E3D5BF] bg-white shadow-[0_5px_18px_rgba(67,52,35,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C58B2A]/35 hover:shadow-[0_12px_30px_rgba(67,52,35,0.11)] sm:w-[200px]"
              >
                <div className="aspect-[2/3] overflow-hidden bg-[#EEE5D8]">
                  {profileUrl ? (
                    <img
                      src={profileUrl}
                      alt={person.name}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center px-4 text-center text-sm font-medium text-stone-500">
                      Image unavailable
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="truncate text-base font-semibold text-stone-900">
                    {person.name}
                  </h3>

                  <p className="mt-1 line-clamp-2 min-h-[40px] text-sm leading-5 text-stone-500">
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
