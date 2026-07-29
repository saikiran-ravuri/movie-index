import Container from "../components/common/Container";

function Watchlist() {
  return (
    <main className="py-14">
      <Container>
        <section className="space-y-3">
          <h1 className="font-['Cormorant_Garamond'] text-5xl font-bold text-[#1f2329]">
            Watchlist
          </h1>

          <p className="max-w-2xl text-lg leading-8 text-gray-600">
            Save your favorite movies and build your personal watchlist to watch
            later.
          </p>
        </section>
      </Container>
    </main>
  );
}

export default Watchlist;
