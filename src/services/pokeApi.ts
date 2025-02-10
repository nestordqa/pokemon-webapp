import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const pokeApi = axios.create({
    baseURL: BASE_URL,
});

export const getAllRegions = async () => {
    try {
        const response = await pokeApi.get('/region');
        return response.data.results;
    } catch (error) {
        console.error("Error fetching regions:", error);
        throw error;
    }
};

export const getPokemonList = async (limit: number, offset: number, regionName?: string) => {
    try {
        const url = `/pokemon-species?limit=${limit}&offset=${offset}`;
        if (regionName) {
            // Fetch the region to get its ID
            const regionResponse = await pokeApi.get(`/region/${regionName}`);
            const region = regionResponse.data;

            // Fetch the pokedexes in the region and find the main one (usually the first)
            const mainPokedex = region.pokedexes[0];
            const pokedexUrl = mainPokedex.url;

            // Fetch the main pokedex
            const pokedexResponse = await axios.get(pokedexUrl);
            const pokemonEntries = pokedexResponse.data.pokemon_entries;

            //@ts-ignore
            const results = pokemonEntries.map((entry: any) => ({
                name: entry.pokemon_species.name,
                url: entry.pokemon_species.url
            }));

            return {
                count: pokemonEntries.length,
                results: results
            };
        }

        const response = await pokeApi.get(url);
        const results = response.data.results;

        return {
            count: response.data.count,
            results: results
        };
    } catch (error) {
        console.error(`Error fetching Pokémon list:`, error);
        throw error;
    }
};

export const getPokemonDetails = async (name: string) => {
    try {
        const response = await pokeApi.get(`/pokemon/${name}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching Pokémon details for ${name}:`, error);
        throw error;
    }
};

export const getPokemonTypes = async () => {
    try {
        const response = await pokeApi.get('/type');
        return response.data.results;
    } catch (error) {
        console.error("Error fetching Pokémon types:", error);
        throw error;
    }
};

export const getPokemonByType = async (type: string, limit: number, offset: number, regionName?: string) => {
    try {
        const response = await pokeApi.get(`/type/${type}`);

        //@ts-ignore
        let pokemonList = response.data.pokemon.map((item: any) => ({
            name: item.pokemon.name,
            url: item.pokemon.url
        }));

        if (regionName) {
            // Fetch the region to get its ID
            const regionResponse = await pokeApi.get(`/region/${regionName}`);
            const region = regionResponse.data;

            // Fetch the pokedexes in the region and find the main one (usually the first)
            const mainPokedex = region.pokedexes[0];
            const pokedexUrl = mainPokedex.url;

            // Fetch the main pokedex
            const pokedexResponse = await axios.get(pokedexUrl);
            const pokemonEntries = pokedexResponse.data.pokemon_entries;

            //@ts-ignore
            pokemonList = pokemonList.filter((pokemon: any) => {
                //@ts-ignore
                return pokemonEntries.some((entry: any) => entry.pokemon_species.name === pokemon.name);
            });
        }

        const paginatedList = pokemonList.slice(offset, offset + limit);

        return {
            count: pokemonList.length,
            results: paginatedList
        };
    } catch (error) {
        console.error(`Error fetching Pokémon by type ${type}:`, error);
        throw error;
    }
};

export const getPokemonsByRegion = async (regionName: string) => {
    try {
        const response = await pokeApi.get(`/region/${regionName}`);
        const region = response.data;

        // Fetch the pokedexes in the region and find the main one (usually the first)
        const mainPokedex = region.pokedexes[0];
        const pokedexUrl = mainPokedex.url;

        // Fetch the main pokedex
        const pokedexResponse = await axios.get(pokedexUrl);
        const pokemonEntries = pokedexResponse.data.pokemon_entries;

        // Extract the names of the Pokémon in the region
        //@ts-ignore
        const regionPokemonNames = pokemonEntries.map((entry: any) => entry.pokemon_species.name);
        return regionPokemonNames;
    } catch (error) {
        console.error("Error fetching regions:", error);
        throw error;
    }
};
