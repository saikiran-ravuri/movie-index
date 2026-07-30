import Container from "../common/Container";
import { getPosterUrl } from "../../utils/image";

function ProductionCompanies({ movie }) {
  const companies = movie.production_companies || [];

  if (companies.length === 0) {
    return null;
  }

  return (
    <section>
      <Container>
        <div className="mb-10 sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#9B6417] sm:text-sm">
            Behind the Scenes
          </p>

          <h2 className="mt-3 font-['Cormorant_Garamond'] text-4xl font-bold text-stone-900 sm:text-5xl">
            Production Companies
          </h2>

          <p className="mt-3 max-w-2xl text-base leading-7 text-stone-600">
            Studios and production houses responsible for bringing this film to
            the big screen.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {companies.map((company) => (
            <article
              key={company.id}
              className="group flex min-h-[180px] flex-col items-center justify-center rounded-2xl border border-[#E2D3BC] bg-white p-8 shadow-md transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#C58B2A]/40 hover:shadow-lg"
            >
              {company.logo_path ? (
                <img
                  src={getPosterUrl(company.logo_path, "w300")}
                  alt={company.name}
                  loading="lazy"
                  decoding="async"
                  className="mb-6 max-h-16 object-contain transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#E8DBC7] bg-[#F7F0E4] text-2xl">
                  🎬
                </div>
              )}

              <h3 className="text-center text-lg font-semibold text-stone-900">
                {company.name}
              </h3>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ProductionCompanies;
