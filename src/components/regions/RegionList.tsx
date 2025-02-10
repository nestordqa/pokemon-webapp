import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Typography,
    Box,
    CircularProgress,
    Alert,
} from '@mui/material';
import { Link } from 'react-router-dom';
import useRegions from '../../hooks/useRegions';

/**
 * @description RegionList Component: Displays a list of Pokémon regions with links to each region's page.
 *
 * This component fetches a list of Pokémon regions and renders them as a list of clickable items.
 * Each item links to a specific region's page, allowing users to navigate and explore different
 * regions within the application.
 *
 * @component
 * @returns {JSX.Element} - The RegionList component.
 */
const RegionList: React.FC = () => {
    /**
     * @description Fetches the list of regions using a custom hook.
     */
    const { regions, loading, error } = useRegions();

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                {/* Display a circular progress indicator while loading */}
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error">
                {/* Display an error message if there's an error */}
                {error}
            </Alert>
        );
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Pokémon Regions
            </Typography>
            <List>
                {/* Map over the regions and render each region as a ListItem */}
                {regions.map((region) => (
                    <ListItem key={region.name} disablePadding>
                        <ListItemButton component={Link} to={`/region/${region.name}`}>
                            <ListItemText primary={region.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default RegionList;
