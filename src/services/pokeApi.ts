import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

const pokeApi = axios.create({
    baseURL: BASE_URL,
});

export const getRegions = async () => {
    try {
        const response = await pokeApi.get('/region');
        return response.data.results;
    } catch (error) {
        console.error("Error fetching regions:", error);
        throw error;
    }
};

export const getPokemonList = async (regionName: string, limit: number, offset: number) => {
    try {
        // Fetch the region to get its ID
        const regionResponse = await pokeApi.get(`/region/${regionName}`);
        const region = regionResponse.data;

        // Fetch the pokedexes in the region and find the main one (usually the first)
        const mainPokedex = region.pokedexes[0];
        const pokedexUrl = mainPokedex.url;

        // Fetch the main pokedex
        const pokedexResponse = await axios.get(pokedexUrl);
        const pokemonEntries = pokedexResponse.data.pokemon_entries;

        // Extract the Pokemon species URLs and names from the pokedex entries
        const pokemonSpecies = pokemonEntries.map((entry: any) => ({
            name: entry.pokemon_species.name,
            url: entry.pokemon_species.url
        }));

        // Fetch the details for each Pokemon in the list, but limit the number of requests
        const detailedPokemonList = await Promise.all(
            pokemonSpecies.slice(offset, offset + limit).map(async (pokemon: any) => {
                const pokemonDetailsResponse = await axios.get(pokemon.url);
                const pokemonDetails = pokemonDetailsResponse.data;

                // Fetch the actual Pokemon data using the species data to get the Pokemon's URL
                const pokemonDataResponse = await axios.get(`${BASE_URL}/pokemon/${pokemonDetails.name}`);
                const pokemonData = pokemonDataResponse.data;

                return {
                    name: pokemon.name,
                    id: pokemonData.id,
                    sprites: {
                        front_default: pokemonData.sprites.front_default
                    },
                    types: pokemonData.types.map((type: any) => type.type.name)
                };
            })
        );

        return {
            count: pokemonSpecies.length,
            results: detailedPokemonList
        };
    } catch (error) {
        console.error(`Error fetching Pokémon list for ${regionName}:`, error);
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
