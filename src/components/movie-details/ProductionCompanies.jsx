import { Building2 } from "lucide-react";
import { useState } from "react";

import Container from "../common/Container";
import { getPosterUrl } from "../../utils/image";

function CompanyCard({ company }) {
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);
  const [hasLogoError, setHasLogoError] = useState(false);

  const logoUrl = company.logo_path
    ? getPosterUrl(company.logo_path, "w300")
    : null;

  const shouldShowLogo = logoUrl && !hasLogoError;

  return (
    <article className="group flex min-h-[160px] flex-col items-center justify-center rounded-2xl border border-[#E2D3BC] bg-white p-6 text-center shadow-[0_6px_18px_rgba(67,52,35,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C58B2A]/40 hover:shadow-[0_12px_28px_rgba(67,52,35,0.10)] sm:min-h-[170px] sm:p-7">
      <div className="relative flex h-16 w-full items-center justify-center">
        {shouldShowLogo && !isLogoLoaded && (
          <div className="absolute h-12 w-28 animate-pulse rounded-lg bg-[#E9E1D6]" />
        )}

        {shouldShowLogo ? (
          <img
            src={logoUrl}
            alt={`${company.name} logo`}
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLogoLoaded(true)}
            onError={() => {
              setHasLogoError(true);
              setIsLogoLoaded(false);
            }}
            className={`max-h-16 max-w-[180px] object-contain transition-all duration-300 group-hover:scale-105 ${
              isLogoLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#E8DBC7] bg-[#F7F0E4] text-[#B8862D]">
            <Building2 size={24} />
          </div>
        )}
      </div>

      <h3 className="mt-5 text-base font-semibold leading-6 text-[#1F2329] sm:text-lg">
        {company.name}
      </h3>

      {company.origin_country && (
        <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.16em] text-stone-500">
          {company.origin_country}
        </p>
      )}
    </article>
  );
}

function ProductionCompanies({ movie }) {
  const companies = Array.isArray(movie.production_companies)
    ? movie.production_companies
    : [];

  if (companies.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="production-companies-heading">
      <Container>
        <div className="mb-7 sm:mb-9">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#9B6417] sm:text-sm">
            Behind the Scenes
          </p>

          <h2
            id="production-companies-heading"
            className="mt-3 font-['Cormorant_Garamond'] text-4xl font-bold leading-tight text-[#1F2329] sm:text-5xl"
          >
            Production Companies
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
            The studios and production companies involved in creating this
            movie.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 lg:gap-5">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ProductionCompanies;
