import {
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
  Globe,
  Activity,
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
      icon: Calendar,
    },
    {
      label: "Runtime",
      value: formattedRuntime,
      icon: Clock,
    },
    {
      label: "Budget",
      value: formatCurrency(movie.budget),
      icon: DollarSign,
    },
    {
      label: "Revenue",
      value: formatCurrency(movie.revenue),
      icon: TrendingUp,
    },
    {
      label: "Original Language",
      value: originalLanguage,
      icon: Globe,
    },
    {
      label: "Status",
      value: movie.status || "Unavailable",
      icon: Activity,
    },
  ];

  return (
    <section aria-labelledby="movie-information-heading">
      <Container>
        <div className="mb-6">
          <h2
            id="movie-information-heading"
            className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#1f2329] sm:text-4xl"
          >
            Movie Information
          </h2>
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
