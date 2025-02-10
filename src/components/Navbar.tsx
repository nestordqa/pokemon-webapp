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
    Button,
    Box, // Import Box
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import useRegions from '../hooks/useRegions';

interface NavbarProps {
    onSearch: (searchTerm: string) => void;
    onRegionChange: (region: string) => void;
}

// Styled components for better aesthetics
const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: '#303f9f',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    paddingTop: '15px',
}));

const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 16px',
});

const LogoTypography = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    fontSize: '1.75rem', // Increased font size
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
}));

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

const RegionSelect = styled(FormControl)(({ theme }) => ({
    minWidth: '120px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    marginRight: theme.spacing(2),
    width: '100%',
}));

const NavButton = styled(Button)({
    color: '#fff',
    fontWeight: 600,
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
});

const Navbar: React.FC<NavbarProps> = ({ onSearch, onRegionChange }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedRegion, setSelectedRegion] = useState<string>('');
    const navigate = useNavigate();
    const { regions } = useRegions();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        if (event.target.value.length === 0) {
            handleClearSearch();
        }
    }, [setSearchTerm]);

    const handleSearchSubmit = useCallback(() => {
        onSearch(searchTerm);
        navigate(`/?search=${searchTerm}&region=${selectedRegion}`);
    }, [searchTerm, selectedRegion, onSearch, navigate]);

    const handleClearSearch = useCallback(() => {
        setSearchTerm('');
        onSearch('');
        navigate('/');
    }, [onSearch, navigate]);

    const handleRegionChange = (event: SelectChangeEvent<string>) => {
        const newRegion = event.target.value;
        setSelectedRegion(newRegion);
        onRegionChange(newRegion);
    };

    return (
        <StyledAppBar position="static" style={{ justifySelf: 'end' }}>
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
                        <RegionSelect variant="outlined" size="small">
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
                        </RegionSelect>
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
