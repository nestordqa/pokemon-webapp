import React, { useState, useCallback } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    TextField,
    InputAdornment,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    styled,
    Grid,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import useRegions from '../../hooks/useRegions';
import usePokemonTypes from '../../hooks/usePokemonTypes';
import NavButton from './NavButton';
import { motion } from 'framer-motion';

/**
 * @description Interface defining the props for the Navbar component.
 * @property {Function} onSearch - Callback function to handle search input.
 * @property {Function} onRegionChange - Callback function to handle region selection.
 */
interface NavbarProps {
    onSearch: (searchTerm: string) => void;
    onTypeChange: (type: string) => void;
    onRegionChange: (region: string) => void;
}

/**
 * @description A styled AppBar component for consistent styling across the app.
 */
const StyledAppBar = styled(AppBar)(() => ({
    backgroundColor: '#1a237e', // Cambio de color a un azul más oscuro
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)', // Sombra más pronunciada
    paddingTop: '15px',
}));

/**
 * @description A styled Toolbar component for consistent styling across the app.
 */
const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 16px',
});

/**
 * @description A styled Typography component for the logo, hidden on small screens.
 */
const LogoTypography = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    fontSize: '1.75rem',
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
}));

/**
 * @description A styled TextField component for the search input.
 */
const SearchTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        backgroundColor: '#fff',
        borderRadius: '25px', // Bordes más redondeados
        '& fieldset': {
            borderColor: theme.palette.primary.main,
        },
        '&:hover fieldset': {
            borderColor: theme.palette.secondary.main,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.secondary.dark,
        },
    },
    width: '100%',
    marginRight: theme.spacing(2),
}));

/**
 * @description A styled FormControl component for the region select.
 */
const Selecter = styled(FormControl)(({ theme }) => ({
    minWidth: '120px',
    backgroundColor: '#fff',
    borderRadius: '25px', // Bordes más redondeados
    marginRight: theme.spacing(2),
    width: '100%',
}));

/**
 * @description Navbar Component: A responsive navigation bar that handles search, region selection, and navigation.
 *
 * This component displays a navigation bar with a search input, region selection dropdown,
 * and navigation buttons. It adapts its layout based on the screen size, displaying
 * different elements on mobile and desktop devices.
 *
 * @component
 * @param {NavbarProps} props - The props for the Navbar component.
 * @returns {JSX.Element} - The Navbar component.
 */
const Navbar: React.FC<NavbarProps> = ({ onSearch, onRegionChange, onTypeChange }) => {
    const [selectedType, setSelectedType] = useState<string>('');
    const { types: pokemonTypes } = usePokemonTypes();

    const handleTypeChange = (event: SelectChangeEvent<string>) => {
        const newType = event.target.value;
        setSelectedType(newType);
        onTypeChange(newType);
    };

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedRegion, setSelectedRegion] = useState<string>('');

    const navigate = useNavigate();
    const { regions } = useRegions();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleSearchSubmit = useCallback(() => {
        onSearch(searchTerm);
        navigate(`/?search=${searchTerm}&region=${selectedRegion}&type=${selectedType}`);
    }, [searchTerm, selectedRegion, selectedType, onSearch, navigate]);

    const handleClearSearch = useCallback(() => {
        setSearchTerm('');
        onSearch('');
        setSelectedType('');
        navigate('/');
    }, [onSearch, navigate]);

    const handleRegionChange = (event: SelectChangeEvent<string>) => {
        const newRegion = event.target.value;
        setSelectedRegion(newRegion);
        onRegionChange(newRegion);
    };

    const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        if (event.target.value.length === 0) {
            handleClearSearch();
        }
    }, [setSearchTerm, handleClearSearch]);

    return (
        <StyledAppBar position="static">
            <StyledToolbar>
                <motion.div
                    initial={{ opacity: 0, x: -50 }} // Animación inicial: deslizar desde la izquierda
                    animate={{ opacity: 1, x: 0 }} // Animación al cargar
                    transition={{ type: 'spring', stiffness: 100, damping: 10 }} // Efecto de rebote
                    style={{ width: '20%' }}
                >
                    <LogoTypography variant="h6">
                        My Pokedex
                    </LogoTypography>
                </motion.div>
                <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                        <motion.div
                            initial={{ opacity: 0, y: -20 }} // Animación inicial: deslizar desde arriba
                            animate={{ opacity: 1, y: 0 }} // Animación al cargar
                            transition={{ delay: 0.2 }} // Retraso para un efecto escalonado
                        >
                            <SearchTextField
                                size="small"
                                placeholder="Search Pokémon..."
                                variant="outlined"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        handleSearchSubmit();
                                    }
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {searchTerm && (
                                                <IconButton onClick={handleClearSearch} aria-label="clear" sx={{ color: '#757575' }}>
                                                    <ClearIcon />
                                                </IconButton>
                                            )}
                                            <IconButton onClick={handleSearchSubmit} aria-label="search" sx={{ color: '#757575' }}>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <motion.div
                            initial={{ opacity: 0, y: -20 }} // Animación inicial: deslizar desde arriba
                            animate={{ opacity: 1, y: 0 }} // Animación al cargar
                            transition={{ delay: 0.3 }} // Retraso para un efecto escalonado
                        >
                            <Selecter variant="outlined" size="small">
                                <InputLabel id="region-select-label">Region</InputLabel>
                                <Select
                                    labelId="region-select-label"
                                    id="region-select"
                                    value={selectedRegion}
                                    onChange={handleRegionChange}
                                    label="Region"
                                >
                                    <MenuItem value="">
                                        <em>All Regions</em>
                                    </MenuItem>
                                    {regions && regions.map((region) => (
                                        <MenuItem key={region.name} value={region.name}>{region.name}</MenuItem>
                                    ))}
                                </Select>
                            </Selecter>
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <motion.div
                            initial={{ opacity: 0, y: -20 }} // Animación inicial: deslizar desde arriba
                            animate={{ opacity: 1, y: 0 }} // Animación al cargar
                            transition={{ delay: 0.4 }} // Retraso para un efecto escalonado
                        >
                            <Selecter variant="outlined" size="small">
                                <InputLabel id="type-select-label">Type</InputLabel>
                                <Select
                                    labelId="type-select-label"
                                    id="type-select"
                                    value={selectedType}
                                    onChange={handleTypeChange}
                                    label="Type"
                                >
                                    <MenuItem value="">
                                        <em>Type</em>
                                    </MenuItem>
                                    {pokemonTypes && pokemonTypes.map((type) => (
                                        <MenuItem key={type.name} value={type.name}>{type.name}</MenuItem>
                                    ))}
                                </Select>
                            </Selecter>
                        </motion.div>
                    </Grid>
                    {isMobile ? (
                        <Grid item xs={12} sm={6} md={2} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                            <motion.div
                                whileHover={{ scale: 1.1 }} // Animación al hover
                                whileTap={{ scale: 0.9 }} // Animación al hacer clic
                            >
                                <IconButton color="inherit" component={Link} to="/" aria-label="home">
                                    <HomeIcon />
                                </IconButton>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.1 }} // Animación al hover
                                whileTap={{ scale: 0.9 }} // Animación al hacer clic
                            >
                                <IconButton color="inherit" component={Link} to="/favorites" aria-label="favorites">
                                    <FavoriteIcon />
                                </IconButton>
                            </motion.div>
                        </Grid>
                    ) : (
                        <Grid item xs={12} sm={6} md={5} lg={4} xl={3} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                            <motion.div
                                whileHover={{ scale: 1.05 }} // Animación al hover
                                whileTap={{ scale: 0.95 }} // Animación al hacer clic
                            >
                                <NavButton color="inherit" component={Link} to="/">
                                    Home
                                </NavButton>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05 }} // Animación al hover
                                whileTap={{ scale: 0.95 }} // Animación al hacer clic
                            >
                                <NavButton color="inherit" component={Link} to="/favorites">
                                    Favorites
                                </NavButton>
                            </motion.div>
                        </Grid>
                    )}
                </Grid>
            </StyledToolbar>
        </StyledAppBar>
    );
};

export default Navbar;