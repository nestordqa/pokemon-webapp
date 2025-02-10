import { useState, useEffect } from 'react';
import { usePokemonStore } from '../store/pokemonStore';
import { Pokemon } from '../types/pokemon';
import { getPokemonByType, getPokemonsByRegion } from '../services/pokeApi';
import { useLocation } from 'react-router-dom';

/**
 * @description Custom hook to manage and filter a list of Pokémon with pagination and region-specific filtering.
 *
 * This hook retrieves a list of Pokémon from a Zustand store, applies filtering based on a search term
 * and/or region name, and provides pagination for displaying the filtered list in smaller chunks.
 *
 * @param {number} itemsPerPage - The number of Pokémon to display per page.
 * @param {string | null} regionName - The name of the region to filter Pokémon by. If null, no region filter is applied.
 * @param {string | null} searchTerm - The term to search for within Pokémon names. If null, no search filter is applied.
 * @returns {Object} - An object containing the paginated and filtered list of Pokémon, loading and error states,
 *                    current page, total pages, and a function to handle page changes.
 */
const usePokemonList = (itemsPerPage: number, regionName: string | null, searchTerm: string | null, type: string | null) => {
    /**
     * @typedef {Object} PokemonListState
     * @property {Pokemon[]} pokemonList - The list of Pokémon to display on the current page.
     * @property {boolean} loading - Indicates whether the data is currently being loaded.
     * @property {string | null} error - An error message if there was an issue loading the data.
     * @property {number} currentPage - The current page number.
     * @property {number} totalPages - The total number of pages in the paginated list.
     * @property {Function} handlePageChange - A function to update the current page.
     */

    /**
     * @type {Pokemon[]}
     * @description Accesses the list of all Pokémon from the Zustand store.
     */
    const allPokemon = usePokemonStore((state) => state.allPokemon);

    /**
     * @type {boolean}
     * @description Accesses the loading state from the Zustand store.
     */
    const loading = usePokemonStore((state) => state.loading);

    /**
     * @type {string | null}
     * @description Accesses the error state from the Zustand store.
     */
    const error = usePokemonStore((state) => state.error);

    /**
     * @type {[Pokemon[], Function]}
     * @description State variable to store the filtered list of Pokémon.
     */
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

    /**
     * @type {[number, Function]}
     * @description State variable to store the current page number.
     */
    const [currentPage, setCurrentPage] = useState<number>(1);

    /**
     * @type {[number, Function]}
     * @description State variable to store the total number of pages.
     */
    const [totalPages, setTotalPages] = useState<number>(1);

    /**
     * @description Hook to access the current location and its query parameters.
     */
    const location = useLocation();

    /**
     * @description Filters the list of Pokémon based on the search term and region name.
     * @function filterPokemons
     */
    useEffect(() => {
        const filterPokemons = async () => {
            let filteredList = [...allPokemon];
    
            // Apply search term filter
            if (searchTerm) {
                filteredList = filteredList.filter(pokemon =>
                    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }
    
            // Apply region filter (asynchronous)
            if (regionName) {
                try {
                    const regionPokemonNames = await getPokemonsByRegion(regionName);
                    filteredList = filteredList.filter(pokemon =>
                        regionPokemonNames.includes(pokemon.name)
                    );
                } catch (error) {
                    console.error(`Error fetching Pokémon from region ${regionName}:`, error);
                }
            }
    
            // Apply type filter (asynchronous)
            if (type) {
                try {
                    const typeData = await getPokemonByType(type, 1000, 0);
                    if (typeData && typeData.results) {
                        //@ts-nocheck
                        const typePokemonNames = typeData.results.map(p => p.name);
                        // Intersect the type-filtered list with the already filtered list
                        filteredList = filteredList.filter(pokemon =>
                            typePokemonNames.includes(pokemon.name)
                        );
                    }
                } catch (error) {
                    console.error(`Error fetching Pokémon by type ${type}:`, error);
                }
            }
    
            // Update state with the final filtered list
            setPokemonList(filteredList);
            setTotalPages(Math.ceil(filteredList.length / itemsPerPage));
            setCurrentPage(1);
        };
    
        filterPokemons();
    }, [allPokemon, location.search, itemsPerPage, searchTerm, regionName, type]);

    /**
     * @description Handles page changes by updating the current page number.
     * @function handlePageChange
     * @param {number} newPage - The new page number.
     */
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    /**
     * @description Gets the list of Pokémon for the current page.
     * @function paginatedList
     * @returns {Pokemon[]} - The list of Pokémon for the current page.
     */
    const paginatedList = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return pokemonList.slice(startIndex, endIndex);
    };

    return {
        pokemonList: paginatedList(),
        loading,
        error,
        currentPage,
        totalPages,
        handlePageChange
    };
};

export default usePokemonList;
