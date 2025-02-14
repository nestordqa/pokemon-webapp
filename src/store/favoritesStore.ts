import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { saveFavorites } from '../utils/localStorage';
import { Pokemon } from '@/types/pokemon';

/**
 * @description Interface defining the state and actions for managing favorite Pokémon.
 * @typedef {Object} FavoritesState
 * @property {Pokemon[]} favorites - An array of Pokémon objects that are marked as favorites.
 * @property {Function} addFavorite - A function to add a Pokémon to the favorites list.
 * @property {Function} removeFavorite - A function to remove a Pokémon from the favorites list by name.
 * @property {Function} isFavorite - A function to check if a Pokémon is in the favorites list by name.
 * @property {Function} clearFavorites - A function to remove all Pokémon from the favorites list.
 */
interface FavoritesState {
    favorites: Pokemon[];
    addFavorite: (pokemon: Pokemon) => void;
    removeFavorite: (pokemonName: string) => void;
    isFavorite: (pokemonName: string) => boolean;
    clearFavorites: () => void;
}

/**
 * @description Zustand store for managing the list of favorite Pokémon.
 *
 * This store uses Zustand with the `persist` middleware to store and manage a list of favorite
 * Pokémon in the local storage. It provides actions to add, remove, check, and clear favorite
 * Pokémon.
 *
 * @function useFavoritesStore
 * @returns {FavoritesState} - The state and actions for managing favorite Pokémon.
 */
export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favorites: [],
            /**
             * @description Adds a Pokémon to the favorites list if it's not already in the list.
             * @function addFavorite
             * @param {Pokemon} pokemon - The Pokémon object to add to the favorites list.
             */
            addFavorite: (pokemon) => {
                const favorites = get().favorites;
                if (!favorites.find((fav) => fav.name === pokemon.name)) {
                    const newFavorites = [...favorites, pokemon];
                    set({ favorites: newFavorites });
                    //@ts-ignore
                    saveFavorites(newFavorites);
                }
            },
            /**
             * @description Removes a Pokémon from the favorites list by its name.
             * @function removeFavorite
             * @param {string} pokemonName - The name of the Pokémon to remove from the favorites list.
             */
            removeFavorite: (pokemonName) => {
                const favorites = get().favorites;
                const newFavorites = favorites.filter((fav) => fav.name !== pokemonName);
                set({ favorites: newFavorites });
                //@ts-ignore
                saveFavorites(newFavorites);
            },
            /**
             * @description Checks if a Pokémon is in the favorites list by its name.
             * @function isFavorite
             * @param {string} pokemonName - The name of the Pokémon to check in the favorites list.
             * @returns {boolean} - True if the Pokémon is in the favorites list, false otherwise.
             */
            isFavorite: (pokemonName) => get().favorites.some((fav) => fav.name === pokemonName),
            /**
             * @description Clears all Pokémon from the favorites list.
             * @function clearFavorites
             */
            clearFavorites: () => {
                set({ favorites: [] });
                saveFavorites([]);
            },
        }),
        {
            name: 'favorites-storage', // unique name
            //@ts-ignore
            getStorage: () => localStorage, // Use localStorage
        }
    )
);
