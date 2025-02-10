import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, IconButton, Tooltip, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Pokemon } from '../../types/pokemon';
import { useFavoritesStore } from '../../store/favoritesStore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

/**
 * @description Interface defining the props for the PokemonCard component.
 * @property {Pokemon} pokemon - The Pokémon object to display in the card.
 */
interface PokemonCardProps {
    pokemon: Pokemon;
}

/**
 * @description A styled Card component with custom styling for the Pokemon card.
 */
const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: theme.spacing(2),
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
        transform: 'scale(1.03)',
    },
}));

/**
 * @description A styled CardMedia component for displaying the Pokémon image.
 */
const StyledCardMedia = styled(CardMedia)({
    height: 200,
    objectFit: 'contain',
    backgroundColor: '#f5f5f5',
});

/**
 * @description A styled CardContent component for the content of the card.
 */
const StyledCardContent = styled(CardContent)(({ theme }) => ({
    padding: theme.spacing(3),
}));

/**
 * @description A styled IconButton component for the favorite button.
 */
const FavoriteIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.error.main,
}));

/**
 * @description PokemonCard Component: A card displaying Pokémon information and a favorite button.
 *
 * This component displays a Pokémon's image, name, and ID, with a button to add or remove
 * the Pokémon from the user's favorites. Clicking the card navigates the user to the
 * Pokémon's detail page.
 *
 * @component
 * @param {PokemonCardProps} props - The props for the PokemonCard component.
 * @returns {JSX.Element} - The PokemonCard component.
 */
const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
    /**
     * @description Extracts the Pokémon ID from the URL or uses the provided ID.
     */
    const pokemonId = pokemon.url?.split('/').slice(-2, -1)[0] || pokemon.id?.toString() || '0';

    /**
     * @description Constructs the image URL for the Pokémon.
     */
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

    /**
     * @description Hook to access the favorites store and related functions.
     */
    const isFavorite = useFavoritesStore((state) => state.isFavorite(pokemon.name));
    const addFavorite = useFavoritesStore((state) => state.addFavorite);
    const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

    /**
     * @description Handles the click event for the favorite button.
     * @function handleFavoriteClick
     * @param {React.MouseEvent} event - The click event.
     */
    const handleFavoriteClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();

        if (isFavorite) {
            removeFavorite(pokemon.name);
        } else {
            addFavorite(pokemon);
        }
    };

    return (
        <StyledCard>
            <Tooltip title="Click to view details">
                <CardActionArea component={Link} to={`/pokemon/${pokemon.name}`}>
                    <StyledCardMedia
                        component="img"
                        image={imageUrl}
                        alt={pokemon.name}
                    />
                    <StyledCardContent>
                        <Typography variant="h6" component="div">
                            {pokemon.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            #{pokemonId}
                        </Typography>
                    </StyledCardContent>
                </CardActionArea>
            </Tooltip>
            <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Tooltip title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
                    <FavoriteIconButton aria-label="add to favorites" onClick={handleFavoriteClick}>
                        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </FavoriteIconButton>
                </Tooltip>
            </Box>
        </StyledCard>
    );
};

export default PokemonCard;
