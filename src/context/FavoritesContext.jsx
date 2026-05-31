import { createContext } from 'react';
import { useState, useContext } from 'react';

// Criação do contexto
const FavoritesContext = createContext();

// Criação do provider para o contexto
// O provider é um componente que envolve os componentes que precisam acessar o contexto
export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]);

    const addFavorite = (item) => {
        setFavorites([...favorites, item]);
    };

    const removeFavorite = (item) => {
        setFavorites(favorites.filter(fav => fav.id !== item.id));
    };

    const isFavorite = (item) => {
        return favorites.some(fav => fav.id === item.id);
    };

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