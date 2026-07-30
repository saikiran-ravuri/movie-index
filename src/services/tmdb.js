const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

export async function getPopularMovies() {
  const response = await fetch(`${TMDB_BASE_URL}/movie/popular`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch popular movies: ${response.status}`,
    );
  }

  const data = await response.json();

  return Array.isArray(data.results) ? data.results : [];
}