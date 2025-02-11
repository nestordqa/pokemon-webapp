# My Pokedex Web App 🚀

[![React](https://img.shields.io/badge/React-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![Material UI](https://img.shields.io/badge/Material%20UI-%23007FFF.svg?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Jest](https://img.shields.io/badge/jest-%23C21325.svg?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)

A modern and responsive web application built with React, Material UI, and TypeScript, providing a comprehensive Pokémon experience.  Browse, search, favorite, and share your favorite Pokémon!

[https://pokemon-webapp-ke2l.vercel.app/](https://pokemon-webapp-ke2l.vercel.app/)

## Table of Contents

*   [Features](#features)
*   [Technologies Used](#technologies-used)
*   [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
    *   [Running the App](#running-the-app)
    *   [Running Tests](#running-tests)
*   [Technical Achievements](#technical-achievements)
*   [Optional Bonuses](#optional-bonuses)
*   [Contributing](#contributing)
*   [License](#license)

## Features ✨

*   **Pokémon Browsing:** Explore a paginated list of Pokémon (15 per page).
*   **Region Filtering:** Filter Pokémon by region using a dropdown in the navigation bar.
*   **Favorites:** Add Pokémon to your favorites from their individual cards and view them in the "Favorites" section.
*   **Pokémon Details:** Click on a Pokémon card to view detailed information, with options to add/remove from favorites.
*   **Responsive Design:** Enjoy a seamless experience on both desktop and mobile devices.
*   **Combined Filtering:** Filter Pokémon by name and region simultaneously.
*   **Animated UI:** Subtle animations throughout the app, improving user engagement.
*   **Social Sharing:** Share Pokémon details on social media platforms like Instagram and WhatsApp.

## Technologies Used 🛠️

*   [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
*   [Material UI (MUI)](https://mui.com/) - A popular React UI framework for responsive and accessible design.
*   [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript for enhanced code quality.
*   [Zustand](https://github.com/pmndrs/zustand) -  Small, fast and scalable bearbones state-management solution.
*   [Jest](https://jestjs.io/) -  Delightful JavaScript Testing.
*   [React Router](https://reactrouter.com/) - For dynamic, client-side routing
*   [Axios](https://axios-http.com/) - For making HTTP requests to the PokeAPI

## Getting Started 🚀

Follow these steps to get the project up and running on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

*   [Node.js](https://nodejs.org/) (version 16 or higher)
*   [npm](https://www.npmjs.com/) (or [Yarn](https://yarnpkg.com/))

### Installation

1.  **Clone the repository:**

    ```
    git clone https://github.com/nestordqa/pokemon-webapp
    cd pokemon-webapp
    ```

2.  **Install dependencies:**

    ```
    npm install
    ```

3.  **Set up Environment Variables:**

    Create a `.env` file in the root of your project and add the following:

    ```
    REACT_APP_BASE_URL=https://pokeapi.co/api/v2
    ```

    *Make sure to replace `REACT_APP_BASE_URL` with the correct URL

### Running the App

Start the development server:

```
npm run dev
```

This will start the app on `http://localhost:3000`.

### Running Tests

To run the Jest tests, use the following command:

```
npm test
```

This will execute the test suite, checking the functionality of the `Favorites` and `Navbar` components.

## Technical Achievements 🏆

This technical test showcases proficiency in modern web development practices and technologies:

1.  **Regions List Page:** Renders a paginated list of Pokémon (15 per page).
2.  **Pokémon List by Region:** Implements a select dropdown in the navbar to filter Pokémon by region.
3.  **Favorites:** Allows users to add Pokémon to favorites from their cards, viewable in the Favorites section.
4.  **Pokémon Details Page:** Provides a dedicated page with detailed information for each Pokémon, including an option to manage favorites.
5.  **Responsive Design:**  Ensures a consistent and user-friendly experience across desktop and mobile devices.
6.  **State Management:**  Utilizes Zustand for efficient and scalable state management.
7.  **Error Handling:** Implements error handling to gracefully display error messages on-screen when issues occur.
8.  **Code Quality:** Demonstrates clean, well-factored, and scalable code with detailed comments, documentation, and TypeScript usage.
9.  **Testing:** Includes Jest tests for the `Favorites` and `Navbar` components.

## Optional Bonuses 🎁

The following optional bonuses were successfully implemented:

1.  **Allows you to filter by name, pokemon type and region combined.**
2.  **Animations:** Adds subtle animations to enhance user engagement.
3.  **Social Sharing:** Enables users to share Pokémon details on Instagram and WhatsApp.

## Contributing 🤝

Contributions are welcome! If you have any ideas or suggestions, please submit a pull request or create an issue.
