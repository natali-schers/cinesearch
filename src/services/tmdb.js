const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

async function fetcher(endpoint) {
  const response = await fetch(`${BASE_URL}/${endpoint}?language=pt-BR&api_key=${API_KEY}`);

  if (!response.ok) {
    throw new Error(`Erro na API: ${response.statusText}`);
  }

  return response.json();
}

// Busca filmes pelo nome digitado
export async function getMovies(query) {
  return fetcher(`search/movie?query=${encodeURIComponent(query)}`)
}

// Busca filmes populares (para a Home inicial)
export async function getTrending(time_window = 'week') {
  return fetcher(`trending/movie/${time_window}`)
}

// Busca detalhes de um filme específico pelo ID
export async function getMovieDetails(id) {
  return fetcher(`movie/${id}?`)
}