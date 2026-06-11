import MovieCard from "../components/MovieCard";
import { getTrending } from "../services/tmdb";
import { useState, useEffect } from "react";
import styled from "styled-components";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    getTrending()
    .then(data => setMovies(data.results))
    .catch(err => setErro('Erro ao carregar filmes em alta. Tente novamente mais tarde.'))
    .finally(() => setLoading(false));
  }, [])

  return (
    <main>
      {loading && <p>Carregando...</p>}

      {erro && <p>{erro}</p>}

      {
        !loading && !erro && (
        movies.length > 0 ?
        <>
        <h1>🎬 Filmes em alta da semana 📽️</h1>
        <MoviesContainer>
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </MoviesContainer>
        </>
        : <p>Nenhum filme encontrado.</p>
      )}
    </main>
  )
}

const MoviesContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 350px));
  gap: 16px;
  justify-content: center;
`;

export default Home;