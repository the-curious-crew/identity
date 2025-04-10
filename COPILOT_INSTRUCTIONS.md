# Copilot Instruction File

## Project Overview
This project is a backend service for managing user identities and activities. It is built using Node.js, Express, Sequelize, and Mongoose. The project includes features such as user authentication, activity tracking, and API documentation using Swagger.

## Key Features
- **User Management**: CRUD operations for user data.
- **Activity Tracking**: Logs user activities in both SQL and MongoDB databases.
- **Authentication**: Includes token-based authentication and refresh token management.
- **API Documentation**: Swagger integration for API documentation.
- **Security**: Implements security best practices using Helmet and IP-based access control.

## Project Structure

### 1. `src/`
- **`app.ts`**: Entry point of the application. Configures middleware, routes, and error handling.
- **`controllers/`**: Contains controllers for handling HTTP requests.
  - `auth.controller.ts`: Handles authentication-related requests.
  - `user.controller.ts`: Handles user-related requests.
- **`errors/`**: Custom error classes and error handling logic.
- **`lib/`**: Utility functions and configurations.
- **`middlewares/`**: Middleware for logging and IP restriction.
- **`models/`**: Database models for MongoDB and SQL.
  - `mongodb/`: MongoDB models.
  - `sql/`: Sequelize models.
- **`repositories/`**: Data access layer for MongoDB and SQL.
  - `mongodb/`: MongoDB repositories.
  - `sql/`: Sequelize repositories.
- **`routes/`**: API route definitions.
  - `v1/`: Versioned API routes.
- **`services/`**: Business logic layer.
- **`swagger/`**: Swagger configuration for API documentation.
- **`types/`**: TypeScript type definitions.

### 2. `migrations/`
- Sequelize migration files for managing database schema.

### 3. `seeders/`
- Sequelize seed files for populating the database with initial data.

### 4. `config/`
- Configuration files for the application.

### 5. `bin/`
- Contains the `www` file for starting the server.

### 6. `ecosystem.config.js`
- PM2 configuration for running the application in production.

### 7. `package.json`
- Lists dependencies and scripts for the project.

### 8. `pnpm-lock.yaml`
- Lock file for managing dependencies.

## Development Instructions

### Prerequisites
- Node.js >= 14
- PNPM package manager
- MongoDB and PostgreSQL databases

### Setup
1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Configure environment variables in a `.env` file.
3. Run database migrations:
   ```bash
   npx sequelize-cli db:migrate
   ```
4. Seed the database:
   ```bash
   npx sequelize-cli db:seed:all
   ```

### Running the Application
- Start the application in development mode:
  ```bash
  npm run dev
  ```
- Start the application in production mode:
  ```bash
  npm start
  ```

### Testing
- Add test instructions here if applicable.

## Deployment
- Use `ecosystem.config.js` for deploying with PM2.
- Ensure the `.env` file is configured correctly for the production environment.

## Notes
- The project uses both MongoDB and PostgreSQL for data storage.
- Swagger documentation is available at `/api-docs`.
- Follow security best practices as outlined in the `app.ts` file.