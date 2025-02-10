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
import useRegions from '../hooks/useRegions';

const RegionList: React.FC = () => {
    const { regions, loading, error } = useRegions();

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                <CircularProgress />
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

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Pokémon Regions
            </Typography>
            <List>
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
