import { createContext } from 'react';
import { useState, useContext, useEffect } from 'react';

// Criação do contexto
const FavoritesContext = createContext();

// Criação do provider para o contexto
// O provider é um componente que envolve os componentes que precisam acessar o contexto
export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('cinesearch:favorites')
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem('cinesearch:favorites', JSON.stringify(favorites))
    }, [favorites])

    const addFavorite = (movie) => {
        setFavorites(prev => [...prev, movie])
    }

    const removeFavorite = (id) => {
        setFavorites(prev => prev.filter(fav => fav.id !== id))
    }

    const isFavorite = (movie) => {
        return favorites.some(fav => fav.id === movie.id)
    }

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

// Hook personalizado para acessar o contexto
export function useFavorites() {
    const context = useContext(FavoritesContext);

    return context;
}