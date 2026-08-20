import { RotateCcw, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Container from "../components/common/Container";
import CastSection from "../components/movie-details/CastSection";
import MovieHero from "../components/movie-details/MovieHero";
import MovieInfo from "../components/movie-details/MovieInfo";
import ProductionCompanies from "../components/movie-details/ProductionCompanies";
import { getMovieCredits, getMovieDetails } from "../services/tmdb";

function MovieDetailsSkeleton() {
  return (
    <main className="min-h-screen bg-[#f8f4ec] py-6 sm:py-8 lg:py-10">
      <Container>
        <div className="animate-pulse overflow-hidden rounded-2xl border border-[#e6dcc8] bg-[#1f2329] p-6 sm:p-8 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-end lg:gap-12">
            <div className="mx-auto aspect-[2/3] w-full max-w-[240px] rounded-2xl bg-white/10 lg:mx-0 lg:max-w-none" />

            <div>
              <div className="h-10 w-4/5 rounded bg-white/15 sm:h-12" />

              <div className="mt-4 flex flex-wrap gap-2">
                <div className="h-8 w-20 rounded-full bg-white/10" />
                <div className="h-8 w-16 rounded-full bg-white/10" />
                <div className="h-8 w-20 rounded-full bg-white/10" />
              </div>

              <div className="mt-6 space-y-2">
                <div className="h-4 w-full rounded bg-white/10" />
                <div className="h-4 w-11/12 rounded bg-white/10" />
                <div className="h-4 w-3/4 rounded bg-white/10" />
              </div>

              <div className="mt-6 h-10 w-44 rounded-full bg-white/15" />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let active = true;

    async function loadMovieData() {
      try {
        setLoading(true);
        setError("");

        const [movieData, castData] = await Promise.all([
          getMovieDetails(id),
          getMovieCredits(id),
        ]);

        if (!active) return;

        setMovie(movieData);
        setCast(castData.slice(0, 12));
      } catch (err) {
        console.error("Failed to load movie details:", err);
        if (active) {
          setMovie(null);
          setCast([]);
          setError("We couldn't load this movie right now.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadMovieData();

    return () => {
      active = false;
    };
  }, [id, retryKey]);

  function handleRetry() {
    setRetryKey((c) => c + 1);
  }

  if (loading) {
    return <MovieDetailsSkeleton />;
  }

  if (error || !movie) {
    return (
      <main className="min-h-[75vh] bg-[#f8f4ec] py-12 sm:py-16">
        <Container>
          <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-[#e6dcc8] bg-white p-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e6dcc8] bg-[#f8f4ec] text-[#b8862d]">
              <TriangleAlert size={22} />
            </div>

            <h1 className="mt-4 font-['Cormorant_Garamond'] text-2xl font-bold text-[#1f2329] sm:text-3xl">
              Movie details are unavailable
            </h1>

            <p className="mt-2 text-sm text-stone-600">
              {error || "The requested movie could not be found."} Check your connection and try again.
            </p>

            <button
              type="button"
              onClick={handleRetry}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#b8862d] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#9b6417]"
            >
              <RotateCcw size={16} />
              Try Again
            </button>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f4ec]">
      <MovieHero movie={movie} />

      <div className="space-y-12 pb-16 lg:space-y-16 lg:pb-20">
        <MovieInfo movie={movie} />

        {movie.production_companies?.length > 0 && (
          <ProductionCompanies movie={movie} />
        )}

        {cast.length > 0 && <CastSection cast={cast} />}
      </div>
    </main>
  );
}

export default MovieDetails;

