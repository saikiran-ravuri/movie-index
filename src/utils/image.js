const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export function getPosterUrl(path, size = "w500") {
  if (!path) return null;

  return `${IMAGE_BASE_URL}/${size}${path}`;
}

export function getBackdropUrl(path, size = "original") {
  if (!path) return null;

  return `${IMAGE_BASE_URL}/${size}${path}`;
}