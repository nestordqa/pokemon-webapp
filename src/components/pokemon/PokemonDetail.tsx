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
import { motion, useAnimation } from 'framer-motion';

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
    const { name } = useParams<{ name: string }>();
    const { pokemon, loading, error } = usePokemonDetails(name || '');

    const addFavorite = useFavoritesStore((state) => state.addFavorite);
    const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
    const isFavorite = useFavoritesStore((state) => state.isFavorite);

    const [isCurrentlyFavorite, setIsCurrentlyFavorite] = useState<boolean>(false);

    // Animación del botón de favoritos
    const controls = useAnimation();

    useEffect(() => {
        setIsCurrentlyFavorite(isFavorite(name || ''));
    }, [name, isFavorite]);

    const handleFavoriteClick = useCallback(async () => {
        if (isCurrentlyFavorite) {
            removeFavorite(name || '');
        } else {
            if (pokemon) {
                addFavorite(pokemon);
            }
        }

        // Animación de rebote al hacer clic
        await controls.start({ scale: 1.2 });
        controls.start({ scale: 1 });

        setIsCurrentlyFavorite(!isCurrentlyFavorite);
    }, [name, isCurrentlyFavorite, addFavorite, removeFavorite, pokemon, controls]);

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
        <motion.div
            initial={{ opacity: 0, y: 50 }} // Animación inicial: deslizar desde abajo
            animate={{ opacity: 1, y: 0 }} // Animación al cargar
            transition={{ type: 'spring', stiffness: 100, damping: 10 }} // Efecto de rebote
        >
            <StyledCard>
                <StyledCardMedia
                    image={pokemon?.sprites?.front_default}
                />
                <StyledCardContent>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant="h3" component="div" gutterBottom style={{ textTransform: 'capitalize' }}>
                                {pokemon.name}
                            </Typography>
                            <motion.div
                                whileHover={{ scale: 1.05 }} // Animación al hover
                                whileTap={{ scale: 0.95 }} // Animación al hacer clic
                            >
                                <Button
                                    variant="contained"
                                    color={isCurrentlyFavorite ? 'error' : 'primary'}
                                    onClick={handleFavoriteClick}
                                    style={{ textTransform: 'capitalize' }}
                                    startIcon={
                                        <motion.div
                                            animate={controls} // Controlar la animación del ícono
                                        >
                                            {isCurrentlyFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                        </motion.div>
                                    }
                                >
                                    {isCurrentlyFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                                </Button>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <SectionTitle variant="h5">Types:</SectionTitle>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {/* @ts-ignore */}
                                {pokemon?.types && pokemon.types.map((type: PokemonType) => (
                                    <motion.div
                                        key={type.type.name}
                                        initial={{ opacity: 0, y: 20 }} // Animación inicial
                                        animate={{ opacity: 1, y: 0 }} // Animación al cargar
                                        transition={{ delay: 0.2 }} // Retraso para un efecto escalonado
                                    >
                                        <Chip label={type.type.name} variant="outlined" style={{ textTransform: 'capitalize' }} />
                                    </motion.div>
                                ))}
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <SectionTitle variant="h5">Abilities:</SectionTitle>
                            <Box>
                                {pokemon?.abilities && pokemon.abilities.map((ability: Ability) => (
                                    <motion.div
                                        key={ability.ability.name}
                                        initial={{ opacity: 0, y: 20 }} // Animación inicial
                                        animate={{ opacity: 1, y: 0 }} // Animación al cargar
                                        transition={{ delay: 0.3 }} // Retraso para un efecto escalonado
                                    >
                                        <Typography variant="body1" style={{ textTransform: 'capitalize' }}>
                                            {ability.ability.name}
                                        </Typography>
                                    </motion.div>
                                ))}
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <SectionTitle variant="h5">Stats:</SectionTitle>
                            <Grid container spacing={2}>
                                {pokemon?.stats && pokemon.stats.map((stat: Stat) => (
                                    <Grid item xs={12} md={6} key={stat.stat.name}>
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }} // Animación inicial
                                            animate={{ opacity: 1, y: 0 }} // Animación al cargar
                                            transition={{ delay: 0.4 }} // Retraso para un efecto escalonado
                                        >
                                            <StatPaper style={{ display: 'flex', flexDirection: 'row', columnGap: '0.5em' }}>
                                                <Typography variant="subtitle1" style={{ textTransform: 'capitalize', fontWeight: 'bolder' }}>
                                                    {stat.stat.name}:
                                                </Typography>
                                                <Typography variant="subtitle1">
                                                    {stat.base_stat}
                                                </Typography>
                                            </StatPaper>
                                        </motion.div>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                            <motion.div
                                whileHover={{ scale: 1.05 }} // Animación al hover
                                whileTap={{ scale: 0.95 }} // Animación al hacer clic
                            >
                                <Button component={Link} to="/" variant="contained" style={{ textTransform: 'capitalize' }}>
                                    Back to Home
                                </Button>
                            </motion.div>
                        </Grid>
                    </Grid>
                </StyledCardContent>
            </StyledCard>
        </motion.div>
    );
};

export default PokemonDetail;