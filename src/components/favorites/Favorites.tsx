import React from 'react';
import {
    Grid,
    Typography,
    Box,
    Alert,
    Button,
} from '@mui/material';
import { useFavoritesStore } from '../../store/favoritesStore';
import PokemonCard from '../pokemon/PokemonCard';

/**
 * @description A component that displays a list of the user's favorite Pokémon.
 *
 * The component fetches the list of favorite Pokémon from the `useFavoritesStore`
 * and renders them as `PokemonCard` components within a grid. If there are no
 * favorite Pokémon, it displays an informative message. A button is provided to
 * clear all favorites.
 *
 * @component
 * @returns {JSX.Element} A React element representing the favorites page.
 */
const Favorites: React.FC = () => {
    /**
     * @typedef {Object} FavoritesData
     * @property {Array<Pokemon>} favorites - An array of Pokemon objects that are marked as favorites.
     * @property {Function} clearFavorites - A function to remove all Pokemon from the favorites list.
     */

    /**
     * @type {FavoritesData}
     * @description Fetches the list of favorites and the clearFavorites function from the Zustand store.
     */
    const favorites = useFavoritesStore((state) => state.favorites);
    const clearFavorites = useFavoritesStore((state) => state.clearFavorites);

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Favorite Pokémon
            </Typography>
            {favorites.length === 0 ? (
                <Alert severity="info">
                    No favorite Pokémon yet. Add some from the home page!
                </Alert>
            ) : (
                <>
                    <Grid container spacing={2}>
                        {favorites.map((pokemon) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.name}>
                                {/* Render each favorite Pokemon as a PokemonCard */}
                                <PokemonCard pokemon={pokemon} />
                            </Grid>
                        ))}
                    </Grid>
                    <Box mt={2}>
                        {/* Button to clear all favorite Pokemon */}
                        <Button variant="contained" color="error" onClick={clearFavorites}>
                            Clear All Favorites
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default Favorites;
