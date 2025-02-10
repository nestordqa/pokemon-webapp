import React, { useCallback, useEffect, useState } from 'react';
import {
    Typography,
    Box,
    CircularProgress,
    Alert,
    Button,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Divider,
    Grid,
    styled,
    Paper,
} from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import usePokemonDetails from '../../hooks/usePokemonDetails';
import { useFavoritesStore } from '../../store/favoritesStore';
import { Ability, PokemonType, Stat } from '../../types/pokemon';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

/**
 * @description A styled Card component with custom styling for the Pokemon detail card.
 */
const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: 800,
    margin: 'auto',
    marginTop: theme.spacing(4),
    borderRadius: theme.spacing(2),
    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
    overflow: 'hidden',
}));

/**
 * @description A styled CardMedia component for displaying the Pokémon image.
 */
const StyledCardMedia = styled(CardMedia)({
    height: 400,
    objectFit: 'contain',
    backgroundColor: '#b2b2b2',
});

/**
 * @description A styled CardContent component for the content of the card.
 */
const StyledCardContent = styled(CardContent)(({ theme }) => ({
    padding: theme.spacing(4),
}));

/**
 * @description A styled Typography component for section titles.
 */
const SectionTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    marginBottom: theme.spacing(2),
}));

/**
 * @description A styled Paper component for displaying stats.
 */
const StatPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(1),
    boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
}));

/**
 * @description PokemonDetail Component: Displays detailed information about a selected Pokémon.
 *
 * This component fetches and displays detailed information about a specific Pokémon,
 * including its image, name, types, abilities, and stats. It also provides a button to
 * add or remove the Pokémon from the user's favorites.
 *
 * @component
 * @returns {JSX.Element} - The PokemonDetail component.
 */
const PokemonDetail: React.FC = () => {
    /**
     * @typedef {Object} PokemonDetailParams
     * @property {string} name - The name of the Pokémon to display details for.
     */

    /**
     * @type {PokemonDetailParams}
     * @description Extracts the Pokémon name from the route parameters.
     */
    const { name } = useParams<{ name: string }>();

    /**
     * @description Fetches Pokémon details using a custom hook.
     */
    const { pokemon, loading, error } = usePokemonDetails(name || '');

    /**
     * @description Accesses functions from the favorites store.
     */
    const addFavorite = useFavoritesStore((state) => state.addFavorite);
    const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
    const isFavorite = useFavoritesStore((state) => state.isFavorite);

    /**
     * @description Manages the state of whether the current Pokémon is a favorite.
     */
    const [isCurrentlyFavorite, setIsCurrentlyFavorite] = useState<boolean>(false);

    /**
     * @description Updates the isCurrentlyFavorite state when the component mounts or when the favorite status changes.
     */
    useEffect(() => {
        setIsCurrentlyFavorite(isFavorite(name || ''));
    }, [name, isFavorite]);

    /**
     * @description Handles the click event for the favorite button.
     * @function handleFavoriteClick
     */
    const handleFavoriteClick = useCallback(() => {
        if (isCurrentlyFavorite) {
            removeFavorite(name || '');
        } else {
            if (pokemon) {
                addFavorite(pokemon);
            }
        }
        setIsCurrentlyFavorite(!isCurrentlyFavorite);
    }, [name, isCurrentlyFavorite, addFavorite, removeFavorite, pokemon]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="400px">
                <CircularProgress size={60} />
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

    if (!pokemon) {
        return <Alert severity="warning">Pokémon not found.</Alert>;
    }

    return (
        <StyledCard>
            <StyledCardMedia
                component="img"
                image={pokemon?.sprites?.front_default}
                alt={pokemon.name}
            />
            <StyledCardContent>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant="h3" component="div" gutterBottom style={{ textTransform: 'capitalize' }}>
                            {pokemon.name}
                        </Typography>
                        <Button
                            variant="contained"
                            color={isCurrentlyFavorite ? 'error' : 'primary'}
                            onClick={handleFavoriteClick}
                            style={{ textTransform: 'capitalize' }}
                            startIcon={isCurrentlyFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        >
                            {isCurrentlyFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <SectionTitle variant="h5">Types:</SectionTitle>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {pokemon?.types && pokemon.types.map((type: PokemonType) => (
                                <Chip key={type.type.name} label={type.type.name} variant="outlined" style={{ textTransform: 'capitalize' }}/>
                            ))}
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <SectionTitle variant="h5">Abilities:</SectionTitle>
                        <Box>
                            {pokemon?.abilities && pokemon.abilities.map((ability: Ability) => (
                                <Typography key={ability.ability.name} variant="body1" style={{ textTransform: 'capitalize' }}>
                                    {ability.ability.name}
                                </Typography>
                            ))}
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <SectionTitle variant="h5">Stats:</SectionTitle>
                        <Grid container spacing={2}>
                            {pokemon?.stats && pokemon.stats.map((stat: Stat) => (
                                <Grid item xs={12} md={6} key={stat.stat.name}>
                                    <StatPaper style={{ display: 'flex', flexDirection: 'row', columnGap: '0.5em'}}>
                                        <Typography variant="subtitle1" style={{ textTransform: 'capitalize', fontWeight: 'bolder'}}>
                                            {stat.stat.name}:
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            {stat.base_stat}
                                        </Typography>
                                    </StatPaper>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                        <Button component={Link} to="/" variant="contained" style={{ textTransform: 'capitalize' }}>
                            Back to Home
                        </Button>
                    </Grid>
                </Grid>
            </StyledCardContent>
        </StyledCard>
    );
};

export default PokemonDetail;
