import Container from "../components/common/Container";

function Home() {
  return (
    <main className="py-12 lg:py-16">
      <Container>
        <section className="space-y-3">
          <h2 className="font-['Cormorant_Garamond'] text-5xl font-bold text-[#1f2329]">
            Trending Movies
          </h2>

          <p className="max-w-2xl text-lg text-gray-600">
            Discover trending movies, top-rated films and build your personal
            watchlist.
          </p>
        </section>
      </Container>
    </main>
  );
}

export default Home;
