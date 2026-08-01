import {
  Banknote,
  CalendarDays,
  CircleDollarSign,
  Clock3,
  Languages,
  Clapperboard,
} from "lucide-react";

import Container from "../common/Container";
import InfoCard from "../common/InfoCard";

function MovieInfo({ movie }) {
  const formattedReleaseDate = movie.release_date
    ? new Date(`${movie.release_date}T00:00:00`).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Unavailable";

  const runtimeHours = Math.floor((movie.runtime || 0) / 60);
  const runtimeMinutes = (movie.runtime || 0) % 60;

  const formattedRuntime = movie.runtime
    ? `${runtimeHours}h ${runtimeMinutes}m`
    : "Unavailable";

  function formatCurrency(amount) {
    if (!amount || amount <= 0) {
      return "Unavailable";
    }

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(amount);
  }

  const originalLanguage =
    movie.spoken_languages?.find(
      (language) => language.iso_639_1 === movie.original_language,
    )?.english_name ||
    movie.original_language?.toUpperCase() ||
    "Unavailable";

  const movieInformation = [
    {
      label: "Release Date",
      value: formattedReleaseDate,
      icon: CalendarDays,
    },
    {
      label: "Runtime",
      value: formattedRuntime,
      icon: Clock3,
    },
    {
      label: "Budget",
      value: formatCurrency(movie.budget),
      icon: CircleDollarSign,
    },
    {
      label: "Revenue",
      value: formatCurrency(movie.revenue),
      icon: Banknote,
    },
    {
      label: "Original Language",
      value: originalLanguage,
      icon: Languages,
    },
    {
      label: "Status",
      value: movie.status || "Unavailable",
      icon: Clapperboard,
    },
  ];

  return (
    <section aria-labelledby="movie-information-heading">
      <Container>
        <div className="mb-7 sm:mb-9">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#9B6417] sm:text-sm">
            At a Glance
          </p>

          <h2
            id="movie-information-heading"
            className="mt-3 font-['Cormorant_Garamond'] text-4xl font-bold leading-tight text-[#1F2329] sm:text-5xl"
          >
            Movie Information
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
            Key release, production, language, and financial information.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {movieInformation.map(({ label, value, icon: Icon }) => (
            <InfoCard
              key={label}
              label={label}
              value={value}
              icon={<Icon size={20} aria-hidden="true" />}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default MovieInfo;
