const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const MAX_MOVIE_PAGES = 5;

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
  const requestedPage = Number(page) || 1;

  const safePage = Math.min(Math.max(requestedPage, 1), MAX_MOVIE_PAGES);

  const response = await fetch(
    `${TMDB_BASE_URL}/movie/popular?page=${safePage}`,
    requestOptions,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch popular movies: ${response.status}`);
  }

  const data = await response.json();

  return {
    movies: Array.isArray(data.results) ? data.results : [],
    page: Number(data.page) || safePage,
    totalPages: Math.min(Number(data.total_pages) || 1, MAX_MOVIE_PAGES),
    totalResults: Number(data.total_results) || 0,
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
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return Promise.resolve([]);
  }

  const encodedQuery = encodeURIComponent(normalizedQuery);

  return fetchMovieList(
    `/search/movie?query=${encodedQuery}&include_adult=false`,
    "Failed to search movies",
  );
}
