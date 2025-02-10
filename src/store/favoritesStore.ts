import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getFavorites, saveFavorites } from '../utils/localStorage';

interface FavoritesState {
    favorites: string[];
    addFavorite: (pokemonName: string) => void;
    removeFavorite: (pokemonName: string) => void;
    isFavorite: (pokemonName: string) => boolean;
    clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favorites: getFavorites(),
            addFavorite: (pokemonName) => {
                const favorites = get().favorites;
                if (!favorites.includes(pokemonName)) {
                    const newFavorites = [...favorites, pokemonName];
                    set({ favorites: newFavorites });
                    saveFavorites(newFavorites);
                }
            },
            removeFavorite: (pokemonName) => {
                const favorites = get().favorites;
                const newFavorites = favorites.filter((name) => name !== pokemonName);
                set({ favorites: newFavorites });
                saveFavorites(newFavorites);
            },
            isFavorite: (pokemonName) => get().favorites.includes(pokemonName),
            clearFavorites: () => {
                set({ favorites: [] });
                saveFavorites([]);
            },
        }),
        {
            name: 'favorites-storage', // unique name
            getStorage: () => localStorage, // Use localStorage
        }
    )
);
