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

async function fetchJson(endpoint, errorMessage) {
  const response = await fetch(`${TMDB_BASE_URL}${endpoint}`, requestOptions);

  if (!response.ok) {
    throw new Error(`${errorMessage}: ${response.status}`);
  }

  return response.json();
}

async function fetchMovieList(endpoint, errorMessage) {
  const data = await fetchJson(endpoint, errorMessage);

  return Array.isArray(data.results) ? data.results : [];
}

function normalizePage(page) {
  const requestedPage = Number(page) || 1;

  return Math.min(Math.max(requestedPage, 1), MAX_MOVIE_PAGES);
}

function createPaginatedMovieResponse(data, fallbackPage) {
  return {
    movies: Array.isArray(data.results) ? data.results : [],
    page: Number(data.page) || fallbackPage,
    totalPages: Math.min(Number(data.total_pages) || 1, MAX_MOVIE_PAGES),
    totalResults: Number(data.total_results) || 0,
  };
}

export async function getPopularMovies(page = 1) {
  const safePage = normalizePage(page);

  const data = await fetchJson(
    `/movie/popular?page=${safePage}`,
    "Failed to fetch popular movies",
  );

  return createPaginatedMovieResponse(data, safePage);
}

export async function getMoviesByGenre(genreId, page = 1) {
  const safePage = normalizePage(page);
  const normalizedGenreId = Number(genreId);

  if (!normalizedGenreId) {
    return getPopularMovies(safePage);
  }

  const data = await fetchJson(
    `/discover/movie?include_adult=false&include_video=false&page=${safePage}&sort_by=popularity.desc&with_genres=${normalizedGenreId}`,
    "Failed to fetch movies by genre",
  );

  return createPaginatedMovieResponse(data, safePage);
}

export async function getMovieGenres() {
  const data = await fetchJson(
    "/genre/movie/list",
    "Failed to fetch movie genres",
  );

  return Array.isArray(data.genres) ? data.genres : [];
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

export function getMovieDetails(movieId) {
  return fetchJson(`/movie/${movieId}`, "Failed to fetch movie details");
}

export async function getMovieCredits(movieId) {
  const data = await fetchJson(
    `/movie/${movieId}/credits`,
    "Failed to fetch movie credits",
  );

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
