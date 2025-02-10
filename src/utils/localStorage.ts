/**
 * @description Key used to store the favorites data in local storage.
 */
const FAVORITES_KEY = 'favorites';

/**
 * @description Retrieves the list of favorite Pokémon names from local storage.
 *
 * This function retrieves the list of favorite Pokémon names from local storage. If the list
 * exists, it parses the JSON string into an array. If the list does not exist, it returns
 * an empty array.
 *
 * @function getFavorites
 * @returns {string[]} - An array of Pokémon names that are marked as favorites.
 */
export const getFavorites = (): string[] => {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
};

/**
 * @description Saves the list of favorite Pokémon names to local storage.
 *
 * This function saves the provided list of favorite Pokémon names to local storage. It converts
 * the array into a JSON string before storing it.
 *
 * @function saveFavorites
 * @param {string[]} favorites - An array of Pokémon names to save as favorites.
 */
export const saveFavorites = (favorites: string[]) => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};
