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
    <article className="w-[160px] shrink-0 snap-start overflow-hidden rounded-xl border border-[#e6dcc8] bg-white sm:w-[180px]">
      <div className="relative aspect-[2/3] overflow-hidden bg-[#f1ece4]">
        {shouldShowImage ? (
          <img
            src={profileUrl}
            alt={`${person.name}`}
            loading="lazy"
            onLoad={() => setIsImageLoaded(true)}
            onError={() => setHasImageError(true)}
            className={`h-full w-full object-cover transition-opacity duration-300 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center bg-[#f8f4ec] text-stone-500">
            <UserRound size={22} />
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="truncate text-sm font-semibold text-[#1f2329]" title={person.name}>
          {person.name}
        </h3>

        <p className="mt-0.5 truncate text-xs text-stone-500" title={person.character}>
          {person.character || "Role unavailable"}
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
        <div className="mb-6">
          <h2
            id="top-cast-heading"
            className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#1f2329] sm:text-4xl"
          >
            Top Cast
          </h2>
        </div>

        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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

