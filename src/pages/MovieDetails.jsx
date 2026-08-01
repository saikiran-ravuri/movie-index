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
    <main className="min-h-screen bg-[#F7F2E9] py-6 sm:py-8 lg:py-10">
      <Container>
        <div className="animate-pulse overflow-hidden rounded-3xl border border-[#D9C9AE] bg-[#1F2329] p-6 sm:p-9 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-end lg:gap-14">
            <div className="mx-auto aspect-[2/3] w-full max-w-[260px] rounded-3xl bg-white/10 lg:mx-0 lg:max-w-none" />

            <div>
              <div className="h-3 w-32 rounded bg-white/15" />

              <div className="mt-5 h-14 w-4/5 rounded bg-white/15 sm:h-16" />

              <div className="mt-4 h-6 w-2/3 rounded bg-white/10" />

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="h-9 w-24 rounded-full bg-white/10" />
                <div className="h-9 w-20 rounded-full bg-white/10" />
                <div className="h-9 w-24 rounded-full bg-white/10" />
              </div>

              <div className="mt-8 space-y-3">
                <div className="h-5 w-full rounded bg-white/10" />
                <div className="h-5 w-11/12 rounded bg-white/10" />
                <div className="h-5 w-3/4 rounded bg-white/10" />
              </div>

              <div className="mt-8 h-11 w-48 rounded-full bg-white/15" />
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
    let isCancelled = false;

    async function loadMovieData() {
      try {
        setLoading(true);
        setError("");

        const [movieData, castData] = await Promise.all([
          getMovieDetails(id),
          getMovieCredits(id),
        ]);

        if (isCancelled) {
          return;
        }

        setMovie(movieData);
        setCast(castData.slice(0, 12));
      } catch (error) {
        console.error("Failed to load movie details:", error);

        if (!isCancelled) {
          setMovie(null);
          setCast([]);
          setError("We couldn’t load this movie right now.");
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    loadMovieData();

    return () => {
      isCancelled = true;
    };
  }, [id, retryKey]);

  function handleRetry() {
    setRetryKey((current) => current + 1);
  }

  if (loading) {
    return <MovieDetailsSkeleton />;
  }

  if (error || !movie) {
    return (
      <main className="min-h-[75vh] bg-[#F7F2E9] py-12 sm:py-16">
        <Container>
          <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-[#E2D3BC] bg-white px-6 py-14 text-center shadow-[0_8px_24px_rgba(67,52,35,0.06)]">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#E8DBC7] bg-[#F7F0E4] text-[#B8862D]">
              <TriangleAlert size={24} />
            </div>

            <h1 className="mt-5 font-['Cormorant_Garamond'] text-3xl font-bold text-[#1F2329] sm:text-4xl">
              Movie details are unavailable
            </h1>

            <p className="mt-3 max-w-md text-sm leading-7 text-stone-600 sm:text-base">
              {error || "The requested movie could not be found."} Check your
              connection and try again.
            </p>

            <button
              type="button"
              onClick={handleRetry}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#B8862D] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-[#9F7225] focus:outline-none focus:ring-4 focus:ring-[#B8862D]/25"
            >
              <RotateCcw size={17} />
              Try Again
            </button>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F2E9]">
      <MovieHero movie={movie} />

      <div className="space-y-14 pb-16 sm:space-y-16 sm:pb-20 lg:space-y-20 lg:pb-24">
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
