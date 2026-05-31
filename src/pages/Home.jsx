import MovieCard from "../components/MovieCard";
import { getTrending } from "../services/tmdb";
import { useState, useEffect } from "react";
import styled from "styled-components";

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getTrending()
    .then(data => setMovies(data.results))
  }, [])

  return (
    <div>
      {
        movies.length > 0 ?
        <MoviesContainer>
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </MoviesContainer>
        : <p>Nenhum filme encontrado.</p>
      }
    </div>
  )
}

const MoviesContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
`;

export default Home;