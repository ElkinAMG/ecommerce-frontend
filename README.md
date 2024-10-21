---

# Ecommerce Project

Welcome to the Ecommerce project! This README will guide you through the steps to clone the repository and run the project locally. 

## Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (version 14 or higher)
- **Yarn** (as the package manager)

## Technologies Used

This project utilizes the following technologies:

- **SvelteKit**: A framework for building fast, modern web applications using Svelte.
- **Yarn**: A package manager that helps manage dependencies.
- **Supabase**: An open-source Firebase alternative that provides a backend as a service, enabling user management and database functionalities.
- **Zod**: A TypeScript-first schema declaration and validation library, used for input validation and type safety.
- **Vite**: A fast build tool and development server.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **ESLint & Prettier**: Tools for linting and formatting code, ensuring consistency across the codebase.

## Getting Started

Follow these steps to get the project up and running on your local machine.

### 1. Clone the Repository

Open your terminal and run the following command:

```bash
git clone https://github.com/ElkinAMG/ecommerce-frontend.git ecommerce/frontend
```

### 2. Navigate to the Project Directory

Change into the project directory:

```bash
cd ecommerce/frontend
```

### 3. Install Dependencies

Use Yarn to install the project dependencies:

```bash
yarn install
```

### 4. Start the Development Server

Once the dependencies are installed, you can start the development server:

```bash
yarn dev
```

This will start the server, and you should see output indicating that the application is running. You can view it in your browser at `http://localhost:5173` (or whichever port is specified).

### 5. Explore the Project

You can now explore the basic functionality of the Ecommerce project, which includes:

- Creating and managing orders
- Basic CRUD operations with products
- User management features

### 6. Other Useful Commands

Here are some additional commands you may find helpful:

- **Build the Project**:
  ```bash
  yarn build
  ```
  This will create an optimized production build.

- **Preview the Build**:
  ```bash
  yarn preview
  ```
  This will allow you to preview the production build locally.

- **Run Type Checking**:
  ```bash
  yarn check
  ```

- **Run Linter**:
  ```bash
  yarn lint
  ```

- **Format Code**:
  ```bash
  yarn format
  ```

### 7. Contributions

If you would like to contribute to the project, feel free to fork the repository, make your changes, and submit a pull request.

### 8. License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Acknowledgements

Thanks for checking out the Ecommerce project! If you have any questions, feel free to open an issue in the repository.

---