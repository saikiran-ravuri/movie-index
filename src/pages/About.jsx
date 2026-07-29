import Container from "../components/common/Container";

function About() {
  return (
    <main className="py-14">
      <Container>
        <section className="space-y-3">
          <h1 className="font-['Cormorant_Garamond'] text-5xl font-bold text-[#1f2329]">
            About Movie Index
          </h1>

          <p className="max-w-2xl text-lg leading-8 text-gray-600">
            Movie Index is a modern movie discovery application built with
            React, React Router, Tailwind CSS, and the TMDB API. Explore
            trending, popular, and top-rated movies while creating your own
            watchlist.
          </p>
        </section>
      </Container>
    </main>
  );
}

export default About;
