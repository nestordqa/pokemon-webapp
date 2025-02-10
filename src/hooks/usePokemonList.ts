import { useState, useEffect } from 'react';
import { usePokemonStore } from '../store/pokemonStore';
import { Pokemon } from '../types/pokemon';
import { getPokemonsByRegion } from '../services/pokeApi';
import { useLocation } from 'react-router-dom';

const usePokemonList = (itemsPerPage: number, regionName: string | null, searchTerm: string | null) => {
    const allPokemon = usePokemonStore((state) => state.allPokemon);
    const loading = usePokemonStore((state) => state.loading);
    const error = usePokemonStore((state) => state.error);
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const location = useLocation();

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
                console.log(regionName, 'SOY LA REGION')
                try {
                    const regionPokemonNames = await getPokemonsByRegion(regionName); // Fetch Pokémon names for the selected region
                    filteredList = filteredList.filter(pokemon =>
                        regionPokemonNames.includes(pokemon.name)
                    );
                } catch (error) {
                    console.error(`Error fetching Pokémon from region ${regionName}:`, error);
                }
            }
            // Update state with the final filtered list
            setPokemonList(filteredList);
            setTotalPages(Math.ceil(filteredList.length / itemsPerPage));
        };

        filterPokemons();
    }, [allPokemon, location.search, itemsPerPage, searchTerm, regionName]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const paginatedList = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return pokemonList.slice(startIndex, endIndex);
    };

    console.log(paginatedList(), 'SOYLA')

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
