import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    My Pokedex
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button color="inherit" component={Link} to="/">
                        Regions
                    </Button>
                    <Button color="inherit" component={Link} to="/favorites">
                        Favorites
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
