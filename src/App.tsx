import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import './styles/globals.css';
import Navbar from './components/common/Navbar';
import PokemonList from './components/pokemon/PokemonList';
import PokemonDetail from './components/pokemon/PokemonDetail';
import Favorites from './components/favorites/Favorites';
import { usePokemonStore } from './store/pokemonStore';

const App: React.FC = () => {
    const [globalSearchTerm, setGlobalSearchTerm] = useState<string>('');
    const [selectedRegion, setSelectedRegion] = useState<string>('');

    const fetchRegions = usePokemonStore((state) => state.fetchRegions);
    const fetchPokemonTypes = usePokemonStore((state) => state.fetchPokemonTypes);
    const fetchAllPokemon = usePokemonStore((state) => state.fetchAllPokemon);

    const handleSearch = useCallback((term: string) => {
        setGlobalSearchTerm(term);
    }, []);

    const handleRegionChange = useCallback((region: string) => {
        setSelectedRegion(region);
    }, []);

    useEffect(() => {
        fetchRegions();
        fetchPokemonTypes();
        fetchAllPokemon();
    }, [fetchRegions, fetchPokemonTypes, fetchAllPokemon]);

    return (
        <Router>
            <Navbar 
                onSearch={handleSearch} 
                onRegionChange={handleRegionChange} 
            />
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Routes>
                    <Route path="/" element={<PokemonList regionName={selectedRegion} searchTerm={globalSearchTerm} />} />
                    <Route path="/pokemon/:name" element={<PokemonDetail />} />
                    <Route path="/favorites" element={<Favorites />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;
