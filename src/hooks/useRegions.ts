import { useState, useEffect, useCallback } from 'react';
import { getAllRegions } from '../services/pokeApi';
import { Region } from '../types/pokemon';

/**
 * @description Custom hook to fetch and manage a list of Pokémon regions.
 *
 * This hook fetches a list of Pokémon regions using the `getAllRegions` function from the
 * `pokeApi` service. It manages the loading, error, and regions data states, providing a
 * simple way to retrieve and handle Pokémon regions in functional components.
 *
 * @returns {Object} - An object containing the list of Pokémon regions, loading state, and error message.
 */
const useRegions = () => {
    /**
     * @typedef {Object} RegionsState
     * @property {Region[]} regions - The fetched list of Pokémon regions.
     * @property {boolean} loading - Indicates whether the data is currently being loaded.
     * @property {string | null} error - Stores any error message that occurred during the fetch operation.
     */

    /**
     * @type {[Region[], Function]}
     * @description State variable to store the list of Pokémon regions.
     */
    const [regions, setRegions] = useState<Region[]>([]);

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
     * @description Fetches the list of Pokémon regions from the API.
     * @function fetchRegions
     */
    const fetchRegions = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const regionData = await getAllRegions();
            setRegions(regionData);
            setLoading(false);
        } catch (e: any) {
            setError(e.message || 'Failed to load regions.');
            setLoading(false);
        }
    }, []);

    /**
     * @description useEffect hook to fetch the Pokémon regions when the component mounts.
     */
    useEffect(() => {
        fetchRegions();
    }, [fetchRegions]);

    return { regions, loading, error };
};

export default useRegions;
