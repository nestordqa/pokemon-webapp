import { create } from 'zustand';
import { getAllRegions, getPokemonTypes, getPokemonList } from '../services/pokeApi'; // Import the API service
import { Pokemon, PokemonType, Region } from '../types/pokemon';

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

export const usePokemonStore = create<PokemonState>((set) => ({
    regions: [],
    pokemonTypes: [],
    allPokemon: [],
    loading: false,
    error: null,
    fetchRegions: async () => {
        try {
            set({ loading: true, error: null });
            const regions = await getAllRegions(); // Use service function
            set({ regions: regions, loading: false });
        } catch (error: any) {
            set({ loading: false, error: error.message });
        }
    },
    fetchPokemonTypes: async () => {
        try {
            set({ loading: true, error: null });
            const pokemonTypes = await getPokemonTypes(); // Use service function
            set({ pokemonTypes: pokemonTypes, loading: false });
        } catch (error: any) {
            set({ loading: false, error: error.message });
        }
    },
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
