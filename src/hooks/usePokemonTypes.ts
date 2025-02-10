import { useState, useEffect, useCallback } from 'react';
import { getPokemonTypes } from '../services/pokeApi';

const usePokemonTypes = () => {
    const [types, setTypes] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTypes = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const typeData = await getPokemonTypes();
            setTypes(typeData);
            setLoading(false);
        } catch (e: any) {
            setError(e.message || 'Failed to load Pokémon types.');
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTypes();
    }, [fetchTypes]);

    return { types, loading, error };
};

export default usePokemonTypes;
