export interface Pokemon {
    name: string;
    url: string;
    types?: string[];
    id?: number;
    sprites?: {
        front_default: string;
    };
}
  
export interface PokemonDetails {
    id: number;
    name: string;
    sprites: {
        front_default: string;
    };
    types: {
        type: {
            name: string;
        };
    }[];
    abilities: {
        ability: {
            name: string;
        };
    }[];
    stats: {
        base_stat: number;
        stat: {
            name: string;
        };
    }[];
}
  
export interface Region {
    name: string;
    url: string;
}
  