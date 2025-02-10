
export interface Stat {
    base_stat: number;
    stat: {
        name: string;
        url: string;
    };
}

export interface PokemonType {
    slot: number,
    type: {
        name: string;
        url: string;
    }
}

export interface Ability {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
}
export interface Pokemon {
    name: string;
    url: string;
    types?: PokemonType[] | string[];
    id?: number;
    sprites?: {
        front_default: string;
    };
    abilities?: Ability[],
    stats?: Stat[],
    base_experience?: number,

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
    abilities: Ability[];
    stats: Stat[];
}
  
export interface Region {
    name: string;
    url: string;
}

  