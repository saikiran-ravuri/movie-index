const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const MAX_MOVIE_PAGES = 5;

const TMDB_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const ALLOWED_SORT_OPTIONS = new Set([
  "popularity.desc",
  "vote_average.desc",
  "primary_release_date.desc",
  "primary_release_date.asc",
]);

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

function normalizeSortOption(sortBy) {
  return ALLOWED_SORT_OPTIONS.has(sortBy) ? sortBy : "popularity.desc";
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

export async function getDiscoverMovies({
  genreId = "",
  page = 1,
  sortBy = "popularity.desc",
} = {}) {
  const safePage = normalizePage(page);
  const safeSortBy = normalizeSortOption(sortBy);
  const normalizedGenreId = Number(genreId);

  const queryParams = new URLSearchParams({
    include_adult: "false",
    include_video: "false",
    page: String(safePage),
    sort_by: safeSortBy,
  });

  if (normalizedGenreId) {
    queryParams.set("with_genres", String(normalizedGenreId));
  }

  /*
   * Without this condition, "Highest Rated" can surface obscure movies
   * with a perfect score based on only one or two votes.
   */
  if (safeSortBy === "vote_average.desc") {
    queryParams.set("vote_count.gte", "100");
  }

  const data = await fetchJson(
    `/discover/movie?${queryParams.toString()}`,
    "Failed to discover movies",
  );

  return createPaginatedMovieResponse(data, safePage);
}

export function getMoviesByGenre(genreId, page = 1) {
  return getDiscoverMovies({
    genreId,
    page,
    sortBy: "popularity.desc",
  });
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
