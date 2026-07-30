import Container from "../common/Container";
import { getPosterUrl } from "../../utils/image";

function ProductionCompanies({ movie }) {
  const companies = movie.production_companies || [];

  if (companies.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#F7F2E9] pb-24">
      <Container>
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9B6417] sm:text-sm">
            Behind the Scenes
          </p>

          <h2 className="mt-3 font-['Cormorant_Garamond'] text-4xl font-bold text-stone-900 sm:text-5xl">
            Production Companies
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <article
              key={company.id}
              className="flex min-h-[180px] flex-col items-center justify-center rounded-2xl border border-[#E3D5BF] bg-white p-8 shadow-[0_5px_18px_rgba(67,52,35,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C58B2A]/35 hover:shadow-[0_12px_30px_rgba(67,52,35,0.11)]"
            >
              {company.logo_path ? (
                <img
                  src={getPosterUrl(company.logo_path, "w300")}
                  alt={company.name}
                  className="mb-6 max-h-16 object-contain"
                />
              ) : (
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#F7F0E4] text-2xl">
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
