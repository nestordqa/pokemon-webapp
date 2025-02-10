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
    backgroundColor: '#303f9f',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
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
        borderRadius: '4px',
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
    borderRadius: '4px',
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
        console.log('cambiando', newType)
    };


    /**
     * @typedef {Object} NavbarState
     * @property {string} searchTerm - The current search term.
     * @property {string} selectedRegion - The currently selected region.
     */

    /**
     * @type {[NavbarState, Function]}
     * @description State variables for the search term and selected region.
     */
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedRegion, setSelectedRegion] = useState<string>('');

    /**
     * @description Hook to manage navigation.
     */
    const navigate = useNavigate();

    /**
     * @description Hook to fetch the list of available regions.
     */
    const { regions } = useRegions();

    /**
     * @description Hook to access the theme for responsive styling.
     */
    const theme = useTheme();

    /**
     * @description Hook to determine if the screen is a mobile device.
     */
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    /**
     * @description Handles the submission of the search form.
     * @function handleSearchSubmit
     */
    const handleSearchSubmit = useCallback(() => {
        onSearch(searchTerm);
        navigate(`/?search=${searchTerm}&region=${selectedRegion}&type=${selectedType}`);
    }, [searchTerm, selectedRegion, selectedType, onSearch, navigate]);

    /**
     * @description Clears the search input and navigates to the home page.
     * @function handleClearSearch
     */
    const handleClearSearch = useCallback(() => {
        setSearchTerm('');
        onSearch('');
        setSelectedType('');
        navigate('/');
    }, [onSearch, navigate]);

    /**
     * @description Handles changes to the region select.
     * @function handleRegionChange
     * @param {SelectChangeEvent<string>} event - The change event.
     */
    const handleRegionChange = (event: SelectChangeEvent<string>) => {
        const newRegion = event.target.value;
        setSelectedRegion(newRegion);
        onRegionChange(newRegion);
    };

    /**
     * @description Handles changes to the search input.
     * @function handleSearchChange
     * @param {React.ChangeEvent<HTMLInputElement>} event - The change event.
     */
    const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        if (event.target.value.length === 0) {
            handleClearSearch();
        }
    }, [setSearchTerm, handleClearSearch]);

    return (
        <StyledAppBar position="static">
            <StyledToolbar>
                <LogoTypography variant="h6" width={'20%'}>
                    My Pokedex
                </LogoTypography>
                <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
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
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
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
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <Selecter variant="outlined" size="small">
                            <InputLabel id="region-select-label">Type</InputLabel>
                            <Select
                                labelId="region-select-label"
                                id="region-select"
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
                    </Grid>
                    {isMobile ? ( // Render the Favorite Icon and Home Icon on mobile
                        <Grid item xs={12} sm={6} md={2} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                            <IconButton color="inherit" component={Link} to="/" aria-label="home">
                                <HomeIcon />
                            </IconButton>
                            <IconButton color="inherit" component={Link} to="/favorites" aria-label="favorites">
                                <FavoriteIcon />
                            </IconButton>
                        </Grid>
                    ) : ( // Render the NavButtons on larger screens
                        <Grid item xs={12} sm={6} md={5} lg={4} xl={3} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                            <NavButton color="inherit" component={Link} to="/">
                                Home
                            </NavButton>
                            <NavButton color="inherit" component={Link} to="/favorites">
                                Favorites
                            </NavButton>
                        </Grid>
                    )}
                </Grid>
            </StyledToolbar>
        </StyledAppBar>
    );
};

export default Navbar;
