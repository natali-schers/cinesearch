import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useFavorites } from '../context/FavoritesContext'

function Header() {
  const { favorites } = useFavorites()
  const { pathname } = useLocation()

  return (
    <>
      <NavDesktop>
        <Logo to="/">
          🎬 CineSearch
        </Logo>
        <NavLinks>
          <NavLink to="/" $active={pathname === '/'}>
            Início
          </NavLink>
          <NavLink to="/favoritos" $active={pathname === '/favoritos'}>
            Favoritos
            {favorites.length > 0 && (
              <Badge>{favorites.length}</Badge>
            )}
          </NavLink>
        </NavLinks>
      </NavDesktop>

      <NavMobile>
        <MobLink to="/" $active={pathname === '/'}>
          🏠
          <span>Início</span>
        </MobLink>
        <MobLink to="/favoritos" $active={pathname === '/favoritos'}>
          🤍
          <span>Favoritos {favorites.length > 0 && `(${favorites.length})`}</span>
        </MobLink>
      </NavMobile>
    </>
  )
}

const NavDesktop = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 2rem;
  height: 56px;
  background: #0f0f1a;
  border-bottom: 1px solid #1e1e2e;

  @media (max-width: 600px) {
    display: none;  /* esconde no mobile */
  }
`

const Logo = styled(Link)`
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  text-decoration: none;
`

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
  padding: 6px 14px;
  border-radius: 8px;
  text-decoration: none;
  color: ${({ $active }) => $active ? '#ffffff' : '#888'};
  background: ${({ $active }) => $active ? '#1e1e2e' : 'transparent'};
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: #1e1e2e;
    color: #ffffff;
  }
`

const Badge = styled.span`
  background: rgb(192, 57, 43);
  color: rgb(255, 255, 255);
  font-size: 10px;
  font-weight: 600;
  border-radius: 100px;
  padding: 3px 8px 4px;
`

const NavMobile = styled.nav`
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #0f0f1a;
  border-top: 1px solid #1e1e2e;

  @media (max-width: 600px) {
    display: flex;  /* aparece só no mobile */
  }
`

const MobLink = styled(Link)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  text-decoration: none;
  font-size: 11px;
  color: ${({ $active }) => $active ? '#ffffff' : '#666'};
  transition: color 0.2s;

  span { font-size: 11px; }
`

export default Header