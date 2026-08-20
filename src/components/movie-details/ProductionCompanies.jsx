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
    <article className="flex flex-col items-center justify-center rounded-xl border border-[#e6dcc8] bg-white p-6 text-center">
      <div className="relative flex h-14 w-full items-center justify-center">
        {shouldShowLogo && !isLogoLoaded && (
          <div className="absolute h-10 w-24 animate-pulse rounded bg-[#f1ece4]" />
        )}

        {shouldShowLogo ? (
          <img
            src={logoUrl}
            alt={`${company.name} logo`}
            loading="lazy"
            onLoad={() => setIsLogoLoaded(true)}
            onError={() => setHasLogoError(true)}
            className={`max-h-14 max-w-[160px] object-contain transition-opacity duration-300 ${
              isLogoLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#e6dcc8] bg-[#f8f4ec] text-[#b8862d]">
            <Building2 size={20} />
          </div>
        )}
      </div>

      <h3 className="mt-3 text-sm font-semibold text-[#1f2329]">
        {company.name}
      </h3>

      {company.origin_country && (
        <p className="mt-1 text-xs font-medium text-stone-500">
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
        <div className="mb-6">
          <h2
            id="production-companies-heading"
            className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#1f2329] sm:text-4xl"
          >
            Production Companies
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ProductionCompanies;

