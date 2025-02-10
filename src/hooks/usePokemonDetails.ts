import { useState, useEffect, useCallback } from 'react';
import { getPokemonDetails } from '../services/pokeApi';
import { Pokemon } from '../types/pokemon';

/**
 * @description Custom hook to fetch and manage Pokémon details.
 *
 * This hook fetches details for a specific Pokémon by its name using the `getPokemonDetails`
 * function from the `pokeApi` service. It manages the loading, error, and Pokémon data states,
 * providing a simple way to retrieve and handle Pokémon details in functional components.
 *
 * @param {string} name - The name of the Pokémon to fetch details for.
 * @returns {Object} - An object containing the Pokémon data, loading state, and error message.
 */
const usePokemonDetails = (name: string) => {
    /**
     * @typedef {Object} PokemonDetailsState
     * @property {Pokemon | null} pokemon - The fetched Pokémon data, or null if not loaded or an error occurred.
     * @property {boolean} loading - Indicates whether the data is currently being loaded.
     * @property {string | null} error - Stores any error message that occurred during the fetch operation.
     */

    /**
     * @type {[Pokemon | null, Function]}
     * @description State variable to store the Pokémon data.
     */
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);

    /**
     * @type {[boolean, Function]}
     * @description State variable to track the loading status.
     */
    const [loading, setLoading] = useState<boolean>(true);

    /**
     * @type {[string | null, Function]}
     * @description State variable to store any error message.
     */
    const [error, setError] = useState<string | null>(null);

    /**
     * @description Fetches the Pokémon details from the API.
     * @function fetchPokemonDetails
     */
    const fetchPokemonDetails = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getPokemonDetails(name);
            setPokemon(data);
            setLoading(false);
        } catch (e: any) {
            setError(e.message || 'Failed to load Pokémon details.');
            setLoading(false);
        }
    }, [name]);

    /**
     * @description useEffect hook to fetch the Pokémon details when the name changes.
     */
    useEffect(() => {
        if (name) {
            fetchPokemonDetails();
        }
    }, [name, fetchPokemonDetails]);

    return { pokemon, loading, error };
};

export default usePokemonDetails;
