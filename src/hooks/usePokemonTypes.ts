import { useState, useEffect, useCallback } from 'react';
import { getPokemonTypes } from '../services/pokeApi';

/**
 * @description Custom hook to fetch and manage a list of Pokémon types.
 *
 * This hook fetches a list of Pokémon types using the `getPokemonTypes` function from the
 * `pokeApi` service. It manages the loading, error, and types data states, providing a
 * simple way to retrieve and handle Pokémon types in functional components.
 *
 * @returns {Object} - An object containing the list of Pokémon types, loading state, and error message.
 */
const usePokemonTypes = () => {
    /**
     * @typedef {Object} PokemonTypesState
     * @property {any[]} types - The fetched list of Pokémon types.
     * @property {boolean} loading - Indicates whether the data is currently being loaded.
     * @property {string | null} error - Stores any error message that occurred during the fetch operation.
     */

    /**
     * @type {[any[], Function]}
     * @description State variable to store the list of Pokémon types.
     */
    const [types, setTypes] = useState<any[]>([]);

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
     * @description Fetches the list of Pokémon types from the API.
     * @function fetchTypes
     */
    const fetchTypes = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const typeData = await getPokemonTypes();
            setTypes(typeData);
            setLoading(false);
        } catch (e: any) {
            setError(e.message || 'Failed to load Pokémon types.');
            setLoading(false);
        }
    }, []);

    /**
     * @description useEffect hook to fetch the Pokémon types when the component mounts.
     */
    useEffect(() => {
        fetchTypes();
    }, [fetchTypes]);

    return { types, loading, error };
};

export default usePokemonTypes;
