import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { saveFavorites } from '../utils/localStorage';

interface Pokemon { //Import This
    name: string;
    url: string;
    types?: string[];
    id?: number;
    sprites?: {
        front_default: string;
    };
}

interface FavoritesState {
    favorites: Pokemon[];
    addFavorite: (pokemon: Pokemon) => void;
    removeFavorite: (pokemonName: string) => void;
    isFavorite: (pokemonName: string) => boolean;
    clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favorites: [],
            addFavorite: (pokemon) => {
                const favorites = get().favorites;
                if (!favorites.find((fav) => fav.name === pokemon.name)) {
                    const newFavorites = [...favorites, pokemon];
                    set({ favorites: newFavorites });
                    saveFavorites(newFavorites);
                }
            },
            removeFavorite: (pokemonName) => {
                const favorites = get().favorites;
                const newFavorites = favorites.filter((fav) => fav.name !== pokemonName);
                set({ favorites: newFavorites });
                saveFavorites(newFavorites);
            },
            isFavorite: (pokemonName) => get().favorites.some((fav) => fav.name === pokemonName),
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
