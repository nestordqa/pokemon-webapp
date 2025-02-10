export interface PokemonCard {
    name: string,
    url: string
}

/**
 * @description Represents a stat of a Pokémon, including its base value and details about the stat.
 * @typedef {Object} Stat
 * @property {number} base_stat - The base value of the stat.
 * @property {Object} stat - An object containing details about the stat.
 * @property {string} stat.name - The name of the stat.
 * @property {string} stat.url - The URL for more information about the stat.
 */
export interface Stat {
    base_stat: number;
    stat: {
        name: string;
        url: string;
    };
}

/**
 * @description Represents a type of a Pokémon, including its slot and details about the type.
 * @typedef {Object} PokemonType
 * @property {number} slot - The slot number for the type.
 * @property {Object} type - An object containing details about the type.
 * @property {string} type.name - The name of the type.
 * @property {string} type.url - The URL for more information about the type.
 */
export interface PokemonType {
    slot: number,
    type: {
        name: string;
        url: string;
    }
}

/**
 * @description Represents an ability of a Pokémon, including details about the ability and its properties.
 * @typedef {Object} Ability
 * @property {Object} ability - An object containing details about the ability.
 * @property {string} ability.name - The name of the ability.
 * @property {string} ability.url - The URL for more information about the ability.
 * @property {boolean} is_hidden - Indicates whether the ability is hidden.
 * @property {number} slot - The slot number for the ability.
 */
export interface Ability {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
}

/**
 * @description Represents a Pokémon with its basic properties.
 * @typedef {Object} Pokemon
 * @property {string} name - The name of the Pokémon.
 * @property {string} url - The URL for fetching more details about the Pokémon.
 * @property {PokemonType[] | string[]} [types] - An optional array of types the Pokémon belongs to.
 * @property {number} [id] - An optional ID for the Pokémon.
 * @property {Object} [sprites] - An optional object containing image URLs for the Pokémon.
 * @property {string} [sprites.front_default] - An optional URL for the default front sprite of the Pokémon.
 * @property {Ability[]} [abilities] - An optional array of abilities the Pokémon has.
 * @property {Stat[]} [stats] - An optional array of stats for the Pokémon.
 * @property {number} [base_experience] - The base experience of the pokemon
 */
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

/**
 * @description Represents detailed information about a Pokémon.
 * @typedef {Object} PokemonDetails
 * @property {number} id - The ID of the Pokémon.
 * @property {string} name - The name of the Pokémon.
 * @property {Object} sprites - An object containing image URLs for the Pokémon.
 * @property {string} sprites.front_default - The URL for the default front sprite of the Pokémon.
 * @property {Object[]} types - An array of types the Pokémon belongs to.
 * @property {Object} types[].type - An object containing details about the type.
 * @property {string} types[].type.name - The name of the type.
 * @property {Ability[]} abilities - An array of abilities the Pokémon has.
 * @property {Stat[]} stats - An array of stats for the Pokémon.
 */
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

/**
 * @description Represents a region in the Pokémon world.
 * @typedef {Object} Region
 * @property {string} name - The name of the region.
 * @property {string} url - The URL for more information about the region.
 */
export interface Region {
    name: string;
    url: string;
}
