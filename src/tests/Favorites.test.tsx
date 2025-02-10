import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useFavoritesStore } from '@/store/favoritesStore';
import Favorites from '@/components/favorites/Favorites';

// Mock del componente PokemonCard
jest.mock('../components/pokemon/PokemonCard', () => jest.fn(() => <div>Mocked PokemonCard</div>));

// Mock del store de Zustand
jest.mock('../store/favoritesStore', () => ({
    useFavoritesStore: jest.fn(),
}));

describe('Favorites Component', () => {
    // Mock de los datos del store
    const mockFavorites = [
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    ];

    const mockClearFavorites = jest.fn();

    beforeEach(() => {
        // Configura el mock del store antes de cada prueba
        (useFavoritesStore as unknown as jest.Mock).mockImplementation((selector) => {
            return selector({
                favorites: mockFavorites,
                clearFavorites: mockClearFavorites,
            });
        });
    });

    afterEach(() => {
        // Limpia los mocks después de cada prueba
        jest.clearAllMocks();
    });

    it('renders the Favorites component', () => {
        render(<Favorites />);

        // Verifica que el título se renderiza correctamente
        expect(screen.getByText('Favorite Pokémon')).toBeInTheDocument();
    });

    it('displays a message when there are no favorite Pokémon', () => {
        // Sobrescribe el mock para simular que no hay favoritos
        (useFavoritesStore as unknown as jest.Mock).mockImplementation((selector) => {
            return selector({
                favorites: [],
                clearFavorites: mockClearFavorites,
            });
        });

        render(<Favorites />);

        // Verifica que se muestra el mensaje de "No favorite Pokémon yet"
        expect(screen.getByText('No favorite Pokémon yet. Add some from the home page!')).toBeInTheDocument();
    });

    it('displays a grid of favorite Pokémon', () => {
        render(<Favorites />);

        // Verifica que se renderizan los Pokémon favoritos
        expect(screen.getAllByText('Mocked PokemonCard')).toHaveLength(mockFavorites.length);
    });

    it('calls clearFavorites when the "Clear All Favorites" button is clicked', () => {
        render(<Favorites />);

        // Encuentra el botón "Clear All Favorites"
        const clearButton = screen.getByText('Clear All Favorites');

        // Simula el clic en el botón
        fireEvent.click(clearButton);

        // Verifica que la función clearFavorites haya sido llamada
        expect(mockClearFavorites).toHaveBeenCalled();
    });
});