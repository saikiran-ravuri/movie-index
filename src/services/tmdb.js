const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const requestOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_TOKEN}`,
  },
};

export async function getPopularMovies() {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/popular`,
    requestOptions,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch popular movies: ${response.status}`);
  }

  const data = await response.json();

  return Array.isArray(data.results) ? data.results : [];
}

export async function getMovieDetails(movieId) {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${movieId}`,
    requestOptions,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch movie details: ${response.status}`);
  }

  return response.json();
}

export async function getMovieCredits(movieId) {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${movieId}/credits`,
    requestOptions,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch movie credits: ${response.status}`);
  }

  const data = await response.json();

  return Array.isArray(data.cast) ? data.cast : [];
}

export async function searchMovies(query) {
  const response = await fetch(
    `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false`,
    requestOptions,
  );

  if (!response.ok) {
    throw new Error(`Failed to search movies: ${response.status}`);
  }

  const data = await response.json();

  return Array.isArray(data.results) ? data.results : [];
}
