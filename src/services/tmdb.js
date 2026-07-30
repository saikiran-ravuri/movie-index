const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const headers = {
  Authorization: `Bearer ${ACCESS_TOKEN}`,
  Accept: "application/json",
};

export async function fetchFromTMDB(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers,
  });
  return response.json();
}

export function getPopularMovies() {
  return fetchFromTMDB("/movie/popular");
}