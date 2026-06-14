import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useFavorites } from '../context/FavoritesContext'
import { IMAGE_URL } from '../services/tmdb'

function MovieCard({ movie }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  if (!movie) return null;

  const favorited = isFavorite(movie);

  function handleFav(e) {
    e.preventDefault()

    favorited
      ? removeFavorite(movie.id)
      : addFavorite(movie)
  }

  return (
    <CardLink to={`/filme/${movie.id}`}>
      <Card>

        <Poster
          src={`${IMAGE_URL}${movie.poster_path}`}
          alt={movie.title}
        />

        <CardBody>
          <CardTitle>{movie.title}</CardTitle>
          <CardYear>{movie.release_date?.slice(0, 4)}</CardYear>

          <CardFooter>
            <Rating>⭐ {movie.vote_average.toFixed(1)}</Rating>
            <FavBtn onClick={handleFav} aria-label="Favoritar">
              {favorited ? '❤️' : '🤍'}
            </FavBtn>
          </CardFooter>
        </CardBody>

      </Card>
    </CardLink>
  )
}

const CardLink = styled(Link)`
  text-decoration: none;
`

const Card = styled.div`
  background-color: #0f0f1a;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  }
`

const Poster = styled.img`
  width: 100%;
  aspect-ratio: 2/3;
  object-fit: cover;
  display: block;
`

const CardBody = styled.div`
  padding: 10px 12px 12px;
`

const CardTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  margin: 0 0 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const CardYear = styled.p`
  font-size: 12px;
  color: #888;
  margin: 0 0 8px;
`

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Rating = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 500;
  color: #f5c518;
`

const FavBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 2px;
  transition: transform 0.15s;

  &:hover {
    transform: scale(1.2);
  }
`

export default MovieCard