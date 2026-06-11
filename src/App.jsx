import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import MovieDetails from './pages/MovieDetails'
import { FavoritesProvider } from './context/FavoritesContext'
import Header from './components/Header'

function App() {
  return (
    <FavoritesProvider>
      
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favoritos" element={<Favorites />} />
          <Route path="/filme/:id" element={<MovieDetails />} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  )
}

export default App
