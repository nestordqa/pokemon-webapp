import { useState, useEffect, useCallback } from 'react';
import { getPokemonDetails } from '../services/pokeApi';
import { Pokemon } from '../types/pokemon';

const usePokemonDetails = (name: string) => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPokemonDetails = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getPokemonDetails(name);
            setPokemon(data);
            setLoading(false);
        } catch (e: any) {
            setError(e.message || 'Failed to load Pokémon details.');
            setLoading(false);
        }
    }, [name]);

    useEffect(() => {
        if (name) {
            fetchPokemonDetails();
        }
    }, [name, fetchPokemonDetails]);

    return { pokemon, loading, error };
};

export default usePokemonDetails;
