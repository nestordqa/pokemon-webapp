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
import Pagination from './Pagination';
import usePokemonList from '../hooks/usePokemonList';

interface PokemonListProps {
    regionName?: string;
    searchTerm?: string;
}

const PokemonList: React.FC<PokemonListProps> = ({ regionName = '' }) => {
    const itemsPerPage = 15; // Set the number of items per page
    const location = useLocation();

    // Extract search parameters from URL
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search') || ''; // Use this searchTerm

    const errorString = (): string => {
        if (regionName && regionName.length > 0 && searchTerm) {
            return `${regionName} and ${searchTerm}`;
        } else {
            return `${searchTerm}`;
        }
    }

    const { pokemonList, loading, error, currentPage, totalPages, handlePageChange } = usePokemonList(itemsPerPage, regionName, searchTerm);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error">
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
                {pokemonList.map((pokemon) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.name}>
                        <PokemonCard pokemon={pokemon} />
                    </Grid>
                ))}
            </Grid>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </Box>
    );
};

export default PokemonList;
