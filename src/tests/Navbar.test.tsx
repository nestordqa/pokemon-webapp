import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../components/common/Navbar';
import { MemoryRouter } from 'react-router-dom';

// Mock de las funciones onSearch y onRegionChange
const mockOnSearch = jest.fn();
const mockOnRegionChange = jest.fn();

describe('Navbar Component', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <Navbar onSearch={mockOnSearch} onRegionChange={mockOnRegionChange} />
            </MemoryRouter>
        );
    });

    // Prueba 1: Renderiza correctamente el componente
    it('renders the Navbar component', () => {
        expect(screen.getByText('My Pokedex')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Search Pokémon...')).toBeInTheDocument();
        expect(screen.getByLabelText('Region')).toBeInTheDocument();
    });

    // Prueba 2: Maneja la búsqueda correctamente
    it('handles search input and submission', () => {
        const searchInput = screen.getByPlaceholderText('Search Pokémon...');
        const searchButton = screen.getByLabelText('search');

        // Simula la entrada de texto
        fireEvent.change(searchInput, { target: { value: 'Pikachu' } });
        expect(searchInput).toHaveValue('Pikachu');

        // Simula la pulsación de Enter
        fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
        expect(mockOnSearch).toHaveBeenCalledWith('Pikachu');

        // Simula el clic en el botón de búsqueda
        fireEvent.click(searchButton);
        expect(mockOnSearch).toHaveBeenCalledWith('Pikachu');
    });

    // Prueba 3: Navega a la página de inicio y favoritos
    it('navigates to home and favorites pages', () => {
        const homeButton = screen.getByText('Home');
        const favoritesButton = screen.getByText('Favorites');

        // Verifica que los botones estén presentes
        expect(homeButton).toBeInTheDocument();
        expect(favoritesButton).toBeInTheDocument();

        // Simula el clic en los botones (usando MemoryRouter)
        fireEvent.click(homeButton);
        fireEvent.click(favoritesButton);
    });
});