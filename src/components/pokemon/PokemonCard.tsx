import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, IconButton, Tooltip, CardActionArea, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Pokemon } from '../../types/pokemon';
import { useFavoritesStore } from '../../store/favoritesStore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { motion, useAnimation } from 'framer-motion';
import ShareIcon from '@mui/icons-material/Share';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

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
    const pokemonId = pokemon.url?.split('/').slice(-2, -1)[0] || pokemon.id?.toString() || '0';
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

    const isFavorite = useFavoritesStore((state) => state.isFavorite(pokemon.name));
    const addFavorite = useFavoritesStore((state) => state.addFavorite);
    const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

    // Animación del botón de favoritos
    const controls = useAnimation();

    const handleFavoriteClick = async (event: React.MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();

        if (isFavorite) {
            removeFavorite(pokemon.name);
        } else {
            addFavorite(pokemon);
        }

        // Animación de rebote al hacer clic
        await controls.start({ scale: 1.2 });
        controls.start({ scale: 1 });
    };

    // Menú de compartir
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleShareClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleShareClose = () => {
        setAnchorEl(null);
    };

    // Función para compartir en redes sociales
    const shareOnSocialMedia = (platform: string) => {
        const detailUrl = `${window.location.origin}/pokemon/${pokemon.name}`; // URL dinámica
        const shareText = `Check out this Pokémon: ${pokemon.name}!`;

        let url = '';
        switch (platform) {
            case 'whatsapp':
                url = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${detailUrl}`)}`;
                break;
            case 'instagram':
                // Instagram no tiene una API directa, asi que redirigimos a la aplicación con un mensaje
                url = `https://www.instagram.com/?url=${encodeURIComponent(detailUrl)}`;
                break;
            default:
                break;
        }

        window.open(url, '_blank');
        handleShareClose();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }} // Animación inicial: deslizar desde abajo
            animate={{ opacity: 1, y: 0 }} // Animación al cargar
            transition={{ type: 'spring', stiffness: 100, damping: 10 }} // Efecto de rebote
            whileHover={{ scale: 1.05, rotate: 2 }} // Animación al hover: levantar y rotar
        >
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
                <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1 }}>
                    {/* Botón de compartir con menú desplegable */}
                    <Tooltip title="Share">
                        <IconButton
                            aria-label="share"
                            onClick={handleShareClick}
                            component={motion.div}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ShareIcon />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleShareClose}
                    >
                        <MenuItem onClick={() => shareOnSocialMedia('whatsapp')}>
                            <WhatsAppIcon sx={{ mr: 1 }} /> WhatsApp
                        </MenuItem>
                        <MenuItem onClick={() => shareOnSocialMedia('instagram')}>
                            <InstagramIcon sx={{ mr: 1 }} /> Instagram
                        </MenuItem>
                    </Menu>

                    {/* Botón de favoritos */}
                    <Tooltip title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
                        <FavoriteIconButton
                            aria-label="add to favorites"
                            onClick={handleFavoriteClick}
                            component={motion.div} // Usar motion.div para animar el botón
                            animate={controls} // Controlar la animación
                            whileTap={{ scale: 0.9 }} // Animación al hacer clic
                        >
                            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </FavoriteIconButton>
                    </Tooltip>
                </Box>
            </StyledCard>
        </motion.div>
    );
};

export default PokemonCard;