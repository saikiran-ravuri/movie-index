import { UserRound } from "lucide-react";
import { useState } from "react";

import Container from "../common/Container";

function CastCard({ person }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [hasImageError, setHasImageError] = useState(false);

  const profileUrl = person.profile_path
    ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
    : null;

  const shouldShowImage = profileUrl && !hasImageError;

  return (
    <article className="group w-[165px] shrink-0 snap-start overflow-hidden rounded-2xl border border-[#E2D3BC] bg-white shadow-[0_5px_18px_rgba(67,52,35,0.06)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#C58B2A]/40 hover:shadow-[0_12px_26px_rgba(67,52,35,0.1)] sm:w-[185px] lg:w-[195px]">
      <div className="relative aspect-[2/3] overflow-hidden bg-[#EEE5D8]">
        {shouldShowImage && !isImageLoaded && (
          <div
            aria-hidden="true"
            className="absolute inset-0 animate-pulse bg-[#E7DED0]"
          />
        )}

        {shouldShowImage ? (
          <img
            src={profileUrl}
            alt={`${person.name} as ${person.character || "a cast member"}`}
            loading="lazy"
            decoding="async"
            width="300"
            height="450"
            onLoad={() => setIsImageLoaded(true)}
            onError={() => {
              setHasImageError(true);
              setIsImageLoaded(false);
            }}
            className={`h-full w-full object-cover transition-[opacity,transform] duration-500 group-hover:scale-[1.03] ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center bg-[linear-gradient(145deg,#F2EADF_0%,#E7DCCB_100%)] px-5 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#DCCDB5] bg-[#F8F3EA] text-[#B8862D]">
              <UserRound size={25} aria-hidden="true" />
            </div>

            <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-500">
              Image unavailable
            </p>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3
          className="truncate text-base font-semibold text-[#1F2329]"
          title={person.name}
        >
          {person.name}
        </h3>

        <p
          className="mt-1 line-clamp-2 min-h-10 text-sm leading-5 text-stone-500"
          title={person.character || "Character unavailable"}
        >
          {person.character || "Character unavailable"}
        </p>
      </div>
    </article>
  );
}

function CastSection({ cast = [] }) {
  const castMembers = Array.isArray(cast) ? cast : [];

  if (castMembers.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="top-cast-heading">
      <Container>
        <div className="mb-7 sm:mb-9">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#9B6417] sm:text-sm">
            Meet the Cast
          </p>

          <h2
            id="top-cast-heading"
            className="mt-3 font-['Cormorant_Garamond'] text-4xl font-bold leading-tight text-[#1F2329] sm:text-5xl"
          >
            Top Cast
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
            The leading performers and the characters they portray in this
            movie.
          </p>
        </div>

        <div className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5">
          {castMembers.map((person) => (
            <CastCard
              key={`${person.id}-${person.cast_id ?? person.credit_id}`}
              person={person}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default CastSection;
