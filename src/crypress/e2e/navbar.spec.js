describe('Navbar Component', () => {
    beforeEach(() => {
        cy.visit('/'); // Asegúrate de que tu aplicación esté corriendo en localhost
    });

    // Prueba 1: Renderiza correctamente el componente
    it('renders the Navbar component', () => {
        cy.contains('My Pokedex').should('exist');
        cy.get('input[placeholder="Search Pokémon..."]').should('exist');
        cy.get('label').contains('Region').should('exist');
    });

    // Prueba 2: Maneja la búsqueda correctamente
    it('handles search input and submission', () => {
        const searchInput = cy.get('input[placeholder="Search Pokémon..."]');
        const searchButton = cy.get('[aria-label="search"]');

        // Simula la entrada de texto
        searchInput.type('Pikachu');
        searchInput.should('have.value', 'Pikachu');

        // Simula la pulsación de Enter
        searchInput.type('{enter}');
        cy.url().should('include', 'search=Pikachu');

        // Simula el clic en el botón de búsqueda
        searchButton.click();
        cy.url().should('include', 'search=Pikachu');
    });

    // Prueba 3: Limpia la búsqueda correctamente
    it('clears the search input', () => {
        const searchInput = cy.get('input[placeholder="Search Pokémon..."]');
        const clearButton = cy.get('[aria-label="clear"]');

        // Simula la entrada de texto
        searchInput.type('Pikachu');
        searchInput.should('have.value', 'Pikachu');

        // Simula el clic en el botón de limpiar
        clearButton.click();
        searchInput.should('have.value', '');
        cy.url().should('not.include', 'search=Pikachu');
    });

    // Prueba 4: Maneja el cambio de región correctamente
    it('handles region change', () => {
        const regionSelect = cy.get('[aria-labelledby="region-select-label"]');

        // Simula el cambio de región
        regionSelect.click();
        cy.contains('Kanto').click();
        cy.url().should('include', 'region=Kanto');
    });

    // Prueba 5: Navega a la página de inicio y favoritos
    it('navigates to home and favorites pages', () => {
        const homeButton = cy.contains('Home');
        const favoritesButton = cy.contains('Favorites');

        // Verifica que los botones estén presentes
        homeButton.should('exist');
        favoritesButton.should('exist');

        // Simula el clic en los botones
        homeButton.click();
        cy.url().should('include', '/');

        favoritesButton.click();
        cy.url().should('include', '/favorites');
    });
});