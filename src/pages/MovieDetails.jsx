import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import { getMovieDetails, IMAGE_URL } from '../services/tmdb'
import styled from 'styled-components'

function MovieDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()

  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)

  const favorited = movie ? isFavorite(movie) : false

  useEffect(() => {
    getMovieDetails(id)
      .then(data => setMovie(data))
      .catch(err => setErro('Erro ao carregar detalhes do filme. Tente novamente mais tarde.'))
      .finally(() => setLoading(false))
  }, [id])

  function handleFav(e) {
    e.preventDefault()

    favorited
      ? removeFavorite(movie.id)
      : addFavorite(movie);
  }

  if (!movie) return null

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>
        ← Voltar
      </BackButton>

      {loading && <p>Carregando...</p>}

      {erro && <p>{erro}</p>}

      {!loading && !erro && (
        <>
          <Hero>
            <Poster
              src={`${IMAGE_URL}${movie.poster_path}`}
              alt={movie.title}
            />

            <Info>
              <Title>{movie.title}</Title>

              <Badges>
                {movie.genres.map(genre => (
                  <Badge key={genre.id}>{genre.name}</Badge>
                ))}
              </Badges>

              <MetaRow>
                <MetaItem>📅 {movie.release_date?.slice(0, 4)}</MetaItem>
                <MetaItem>⏱ {movie.runtime} min</MetaItem>
                <MetaItem>🌐 {movie.original_language.toUpperCase()}</MetaItem>
              </MetaRow>

              <StatsGrid>
                <StatCard>
                  <StatLabel>Orçamento</StatLabel>
                  <StatValue>
                    {movie.budget > 0
                      ? `$${movie.budget.toLocaleString()}`
                      : 'Não informado'}
                  </StatValue>
                </StatCard>
                <StatCard>
                  <StatLabel>Receita</StatLabel>
                  <StatValue>
                    {movie.revenue > 0
                      ? `$${movie.revenue.toLocaleString()}`
                      : 'Não informado'}
                  </StatValue>
                </StatCard>
                <StatCard>
                  <StatLabel>Votos</StatLabel>
                  <StatValue>{movie.vote_count.toLocaleString()}</StatValue>
                </StatCard>
                <StatCard>
                  <StatLabel>Situação</StatLabel>
                  <StatValue>{movie.status}</StatValue>
                </StatCard>
              </StatsGrid>

              <Rating>
                ⭐ {movie.vote_average.toFixed(1)} / 10
              </Rating>

              <FavButton onClick={handleFav}>
                {favorited ? '❤️ Remover dos favoritos' : '🤍 Adicionar aos favoritos'}
              </FavButton>
            </Info>
          </Hero>

          <Divider />

          <Section>
            <SectionTitle>Sinopse</SectionTitle>
            <Overview>{movie.overview}</Overview>
          </Section>
        </>
      )}
    </Container>
  )
}

const Container = styled.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  width: -webkit-fill-available;
  display: flex;
  flex-direction: column;
`

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #888;
  background: none;
  border: 1px solid #888;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  transition: color 0.2s;
  width: fit-content;

  &:hover {
    color: #ffffff;
    border-color: #ffffff;
  }
`

const Hero = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const Poster = styled.img`
  width: 100%;
  aspect-ratio: 2/3;
  object-fit: cover;
  border-radius: 8px;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
`

const Badges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

// Para cada gênero, use esse componente dentro do Badges
export const Badge = styled.span`
  font-size: 12px;
  padding: 3px 12px;
  border-radius: 99px;
  border: 1px solid #444;
  color: #aaa;
  background: transparent;
`

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 14px;
  color: #888;
`

// Para cada item do MetaRow, use esse componente
export const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`

const Rating = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #2a2a1a;
  color: #f5c518;
  font-size: 15px;
  font-weight: 500;
  padding: 5px 14px;
  border-radius: 8px;
  width: fit-content;
`

const FavButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid #444;
  background: transparent;
  color: #ffffff;
  cursor: pointer;
  margin-top: auto;
  width: fit-content;
  transition: background 0.2s, border-color 0.2s;

  &:hover {
    background: #2a2a2a;
    border-color: #666;
  }
`

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #2a2a2a;
  margin: 1.5rem 0;
`

const Section = styled.section`
  margin-bottom: 2rem;
`

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 12px;
`

const Overview = styled.p`
  font-size: 15px;
  line-height: 1.8;
  color: #aaa;
  margin: 0;
  background: #1a1a2e;
  padding: 1.25rem;
  border-radius: 8px;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
`

// Para cada stat, use esse componente dentro do StatsGrid
export const StatCard = styled.div`
  background: #1a1a2e;
  border-radius: 8px;
  padding: 1rem;
`

export const StatLabel = styled.p`
  font-size: 12px;
  color: #666;
  margin: 0 0 4px;
`

export const StatValue = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
  margin: 0;
`;

export default MovieDetails;