const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const requestOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_TOKEN}`,
  },
};

async function fetchMovieList(endpoint, errorMessage) {
  const response = await fetch(`${TMDB_BASE_URL}${endpoint}`, requestOptions);

  if (!response.ok) {
    throw new Error(`${errorMessage}: ${response.status}`);
  }

  const data = await response.json();

  return Array.isArray(data.results) ? data.results : [];
}

export async function getPopularMovies(page = 1) {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/popular?page=${page}`,
    requestOptions,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch popular movies: ${response.status}`);
  }

  const data = await response.json();

  return {
    movies: Array.isArray(data.results) ? data.results : [],
    page: data.page,
    totalPages: data.total_pages,
    totalResults: data.total_results,
  };
}

export function getTrendingMovies() {
  return fetchMovieList(
    "/trending/movie/week",
    "Failed to fetch trending movies",
  );
}

export function getTopRatedMovies() {
  return fetchMovieList("/movie/top_rated", "Failed to fetch top-rated movies");
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

export function searchMovies(query) {
  const encodedQuery = encodeURIComponent(query.trim());

  return fetchMovieList(
    `/search/movie?query=${encodedQuery}&include_adult=false`,
    "Failed to search movies",
  );
}
