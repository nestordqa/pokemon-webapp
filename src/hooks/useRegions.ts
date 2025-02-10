import { useState, useEffect, useCallback } from 'react';
import { getAllRegions } from '../services/pokeApi';
import { Region } from '../types/pokemon';

const useRegions = () => {
    const [regions, setRegions] = useState<Region[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRegions = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const regionData = await getAllRegions();
            setRegions(regionData);
            setLoading(false);
        } catch (e: any) {
            setError(e.message || 'Failed to load regions.');
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRegions();
    }, [fetchRegions]);

    return { regions, loading, error };
};

export default useRegions;
