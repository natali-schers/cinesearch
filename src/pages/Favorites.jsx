import { useFavorites } from "../context/FavoritesContext";
import styled from "styled-components";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites } = useFavorites();

  return (
    <main>
      {
        favorites.length > 0 ?
          <>
          <h1>Meus Favoritos</h1>
          <MoviesContainer>
            {favorites.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </MoviesContainer>
          </>
          : <p>Nenhum filme encontrado.</p>
        }
    </main>
  )
}

const MoviesContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 250px));
  gap: 16px;
  justify-content: center;
`;

export default Favorites;