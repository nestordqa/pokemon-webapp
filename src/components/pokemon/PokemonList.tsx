import React from 'react';
import {
    Grid,
    Typography,
    Box,
    CircularProgress,
    Alert,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import PokemonCard from './PokemonCard';
import Pagination from '../common/Pagination';
import usePokemonList from '../../hooks/usePokemonList';

/**
 * @description Interface defining the props for the PokemonList component.
 * @property {string} [regionName=''] - The name of the region to filter Pokémon by. Defaults to an empty string.
 */
interface PokemonListProps {
    regionName?: string;
    searchTerm?: string;
    type?: string
}

/**
 * @description PokemonList Component: Displays a list of Pokémon with optional filtering and pagination.
 *
 * This component fetches and displays a list of Pokémon, with support for filtering by region and
 * a search term. It utilizes pagination to handle large lists of Pokémon.
 *
 * @component
 * @param {PokemonListProps} props - The props for the PokemonList component.
 * @returns {JSX.Element} - The PokemonList component.
 */
const PokemonList: React.FC<PokemonListProps> = ({ regionName = '', type = '' }) => {
    /**
     * @description The number of Pokémon to display per page.
     */
    const itemsPerPage = 15;

    /**
     * @description Hook to access the current location and its query parameters.
     */
    const location = useLocation();

    /**
     * @description Extracts search parameters from the URL.
     */
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search') || '';

    /**
     * @description Function to generate a string for displaying search parameters in the UI.
     * @function errorString
     * @returns {string} - A string containing the search parameters.
     */
    const errorString = (): string => {
        if (regionName && regionName.length > 0 && searchTerm) {
            return `${regionName} and ${searchTerm}`;
        } else {
            return `${searchTerm}`;
        }
    }

    /**
     * @description Fetches the list of Pokémon using a custom hook.
     */
    const { pokemonList, loading, error, currentPage, totalPages, handlePageChange } = usePokemonList(itemsPerPage, regionName, searchTerm, type);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                {/* Display a circular progress indicator while loading */}
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error">
                {/* Display an error message if there's an error */}
                {error}
            </Alert>
        );
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                {
                    pokemonList.length > 0 ?
                        'All Pokémon'
                        :
                        `There are no Pokémon under these search parameters: ${errorString()}`
                }
            </Typography>
            <Grid container spacing={2}>
                {/* Map over the pokemonList and render each PokemonCard */}
                {pokemonList.map((pokemon) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.name}>
                        <PokemonCard pokemon={pokemon} />
                    </Grid>
                ))}
            </Grid>
            {/* Render the Pagination component */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </Box>
    );
};

export default PokemonList;
