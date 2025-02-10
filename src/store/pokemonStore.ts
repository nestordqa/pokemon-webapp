import { create } from 'zustand';
import { getAllRegions, getPokemonTypes, getPokemonList } from '../services/pokeApi'; // Import the API service
import { Pokemon, PokemonType, Region } from '../types/pokemon';

/**
 * @description Interface defining the structure of the PokemonState.
 * @typedef {Object} PokemonState
 * @property {Region[]} regions - An array of Pokémon regions.
 * @property {PokemonType[]} pokemonTypes - An array of Pokémon types.
 * @property {Pokemon[]} allPokemon - An array containing all Pokémon.
 * @property {boolean} loading - Indicates whether data is currently being loaded.
 * @property {string | null} error - Stores any error message that occurred during data fetching.
 * @property {Function} fetchRegions - A function to fetch the list of regions.
 * @property {Function} fetchPokemonTypes - A function to fetch the list of Pokémon types.
 * @property {Function} fetchAllPokemon - A function to fetch the list of all Pokémon.
 */
interface PokemonState {
    regions: Region[];
    pokemonTypes: PokemonType[];
    allPokemon: Pokemon[];
    loading: boolean;
    error: string | null;
    fetchRegions: () => Promise<void>;
    fetchPokemonTypes: () => Promise<void>;
    fetchAllPokemon: () => Promise<void>;
}

/**
 * @description Zustand store for managing Pokémon-related state, including regions, types, and all Pokémon.
 *
 * This store uses Zustand to manage global state related to Pokémon data. It includes arrays for regions,
 * Pokémon types, and all Pokémon, as well as actions for fetching this data from the PokeAPI.
 *
 * @function usePokemonStore
 * @returns {PokemonState} - The state and actions for managing Pokémon data.
 */
export const usePokemonStore = create<PokemonState>((set) => ({
    regions: [],
    pokemonTypes: [],
    allPokemon: [],
    loading: false,
    error: null,
    /**
     * @description Fetches the list of regions from the PokeAPI and updates the state.
     * @async
     * @function fetchRegions
     */
    fetchRegions: async () => {
        try {
            set({ loading: true, error: null });
            const regions = await getAllRegions(); // Use service function
            set({ regions: regions, loading: false });
        } catch (error: any) {
            set({ loading: false, error: error.message });
        }
    },
    /**
     * @description Fetches the list of Pokémon types from the PokeAPI and updates the state.
     * @async
     * @function fetchPokemonTypes
     */
    fetchPokemonTypes: async () => {
        try {
            set({ loading: true, error: null });
            const pokemonTypes = await getPokemonTypes(); // Use service function
            set({ pokemonTypes: pokemonTypes, loading: false });
        } catch (error: any) {
            set({ loading: false, error: error.message });
        }
    },
    /**
     * @description Fetches the list of all Pokémon from the PokeAPI and updates the state.
     * @async
     * @function fetchAllPokemon
     */
    fetchAllPokemon: async () => {
        try {
            set({ loading: true, error: null });
            const limit = 200; // Increased limit
            let offset = 0;
            let allPokemonData: Pokemon[] = [];
            while (true) {
                const data = await getPokemonList(limit, offset); // use getPokemonList
                if (data.results.length === 0) {
                    break;
                }
                allPokemonData = [...allPokemonData, ...data.results];
                offset += limit;
            }
            set({ allPokemon: allPokemonData, loading: false });
        } catch (error: any) {
            set({ loading: false, error: error.message });
        }
    },
}));
