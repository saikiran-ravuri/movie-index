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
    if (!amount) return "Unavailable";

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
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
      icon: "📅",
    },
    {
      label: "Runtime",
      value: formattedRuntime,
      icon: "⏱",
    },
    {
      label: "Budget",
      value: formatCurrency(movie.budget),
      icon: "💰",
    },
    {
      label: "Revenue",
      value: formatCurrency(movie.revenue),
      icon: "💵",
    },
    {
      label: "Original Language",
      value: originalLanguage,
      icon: "🌐",
    },
    {
      label: "Status",
      value: movie.status || "Unavailable",
      icon: "🎬",
    },
  ];

  return (
    <section>
      <Container>
        <div className="mb-9 sm:mb-11">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#9B6417] sm:text-sm">
            At a Glance
          </p>

          <h2 className="mt-3 font-['Cormorant_Garamond'] text-4xl font-bold text-stone-900 sm:text-5xl">
            Movie Information
          </h2>

          <p className="mt-3 max-w-2xl text-base leading-7 text-stone-600">
            Key production, release, and financial details about the movie.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {movieInformation.map((item) => (
            <InfoCard
              key={item.label}
              label={item.label}
              value={item.value}
              icon={item.icon}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default MovieInfo;
