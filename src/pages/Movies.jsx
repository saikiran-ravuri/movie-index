import Container from "../components/common/Container";

function Movies() {
  return (
    <main className="py-14">
      <Container>
        <section className="space-y-3">
          <h1 className="font-['Cormorant_Garamond'] text-5xl font-bold text-[#1f2329]">
            Movies
          </h1>

          <p className="max-w-2xl text-lg leading-8 text-gray-600">
            Discover trending, popular and top-rated movies from around the
            world.
          </p>
        </section>
      </Container>
    </main>
  );
}

export default Movies;
