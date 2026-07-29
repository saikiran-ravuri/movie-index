import Container from "../components/common/Container";

function TopRated() {
  return (
    <main className="py-14">
      <Container>
        <section className="space-y-3">
          <h1 className="font-['Cormorant_Garamond'] text-5xl font-bold text-[#1f2329]">
            Top Rated
          </h1>

          <p className="max-w-2xl text-lg leading-8 text-gray-600">
            Browse the highest-rated movies from around the world, selected by
            audiences and critics.
          </p>
        </section>
      </Container>
    </main>
  );
}

export default TopRated;
