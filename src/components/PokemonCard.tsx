import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, IconButton, Tooltip, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Pokemon } from '../types/pokemon';
import { useFavoritesStore } from '../store/favoritesStore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface PokemonCardProps {
    pokemon: Pokemon;
}

// Custom styled components for better aesthetics
const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: theme.spacing(2), // Rounded corners
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)', // Subtle shadow
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
        transform: 'scale(1.03)',
    },
}));

const StyledCardMedia = styled(CardMedia)({
    height: 200, // Increased height for better visibility
    objectFit: 'contain',
    backgroundColor: '#f5f5f5', // Light background for contrast
});

const StyledCardContent = styled(CardContent)(({ theme }) => ({
    padding: theme.spacing(3),
}));

const TypeBox = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(1),
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
}));

const TypeTypography = styled(Typography)(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(0.5, 1),
    borderRadius: theme.spacing(1),
    fontSize: '0.75rem',
}));

const FavoriteIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.error.main,
}));

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
    const pokemonId = pokemon.url?.split('/').slice(-2, -1)[0] || pokemon.id?.toString() || '0';
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
    const isFavorite = useFavoritesStore((state) => state.isFavorite(pokemon.name));
    const addFavorite = useFavoritesStore((state) => state.addFavorite);
    const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

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
