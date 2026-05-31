import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import MovieDetails from './pages/MovieDetails'
import { FavoritesProvider } from './context/FavoritesContext'

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
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
