import React from 'react';
import {
    Grid,
    Typography,
    Box,
    Alert,
    Button,
} from '@mui/material';
import { useFavoritesStore } from '../store/favoritesStore';
import PokemonCard from './PokemonCard';

const Favorites: React.FC = () => {
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
                                <PokemonCard pokemon={pokemon} />
                            </Grid>
                        ))}
                    </Grid>
                    <Box mt={2}>
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
