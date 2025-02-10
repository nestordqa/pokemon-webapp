import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import './styles/globals.css';
import Navbar from './components/common/Navbar';
import PokemonList from './components/pokemon/PokemonList';
import PokemonDetail from './components/pokemon/PokemonDetail';
import Favorites from './components/favorites/Favorites';
import { usePokemonStore } from './store/pokemonStore';

/**
 * @description The main application component that sets up routing and global state.
 *
 * This component serves as the entry point for the application. It sets up the React Router,
 * defines the routes, and manages global state such as the search term and selected region.
 *
 * @component
 * @returns {JSX.Element} - The App component.
 */
const App: React.FC = () => {
    /**
     * @typedef {Object} AppState
     * @property {string} globalSearchTerm - The global search term used to filter Pokémon lists.
     * @property {string} selectedRegion - The currently selected region to filter Pokémon by.
     */

    /**
     * @type {[string, Function]}
     * @description State variable to store the global search term.
     */
    const [globalSearchTerm, setGlobalSearchTerm] = useState<string>('');

    /**
     * @type {[string, Function]}
     * @description State variable to store the selected region.
     */
    const [selectedRegion, setSelectedRegion] = useState<string>('');

    const [selectedType, setSelectedType] = useState<string>('');

    /**
     * @description Accesses the actions from the Zustand store to fetch regions, Pokémon types, and all Pokémon.
     */
    const fetchRegions = usePokemonStore((state) => state.fetchRegions);
    const fetchPokemonTypes = usePokemonStore((state) => state.fetchPokemonTypes);
    const fetchAllPokemon = usePokemonStore((state) => state.fetchAllPokemon);

    /**
     * @description Handles the search by updating the global search term state.
     * @function handleSearch
     * @param {string} term - The search term entered by the user.
     */
    const handleSearch = useCallback((term: string) => {
        setGlobalSearchTerm(term);
    }, []);

    /**
     * @description Handles region changes by updating the selected region state.
     * @function handleRegionChange
     * @param {string} region - The selected region.
     */
    const handleRegionChange = useCallback((region: string) => {
        setSelectedRegion(region);
    }, []);

    const handleTypeChange = useCallback((type: string) => {
        setSelectedType(type);
    }, []);

    /**
     * @description useEffect hook to fetch regions, Pokémon types, and all Pokémon when the component mounts.
     */
    useEffect(() => {
        fetchRegions();
        fetchPokemonTypes();
        fetchAllPokemon();
    }, [fetchRegions, fetchPokemonTypes, fetchAllPokemon]);

    return (
        <Router>
            {/* Navigation bar with search and region selection */}
            <Navbar
                onSearch={handleSearch}
                onRegionChange={handleRegionChange}
                onTypeChange={handleTypeChange}
            />
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                {/* Define the routes for the application */}
                <Routes>
                    <Route path="/" element={<PokemonList regionName={selectedRegion} searchTerm={globalSearchTerm} type={selectedType}/>} />
                    <Route path="/pokemon/:name" element={<PokemonDetail />} />
                    <Route path="/favorites" element={<Favorites />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;
