# Event Backend Test App

This project is a backend service for managing event registrations and participant data. It provides endpoints for creating events, handling registrations, and managing users (admin and participants). This service supports role-based access control and integrates with a MongoDB database for data persistence.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Overview

The **Event Test Backend** is built using Node.js, Express, and TypeScript, following the Clean Architecture principles with Dependency Injection.

### Why TypeScript?

1. **Type Safety**: TypeScript enables static typing, providing better type-checking during development, reducing runtime errors, and making refactoring easier.
2. **Improved Developer Experience**: Autocompletion, type inference, and IntelliSense support in IDEs enhance code quality and developer productivity.
3. **Maintainability and Readability**: Explicit typing and interfaces make code more understandable and maintainable, especially in large-scale applications.
4. **Early Error Detection**: Errors are caught at compile time, reducing the number of bugs in production.

### Why Clean Architecture with Dependency Injection?

1. **Separation of Concerns**: Clean Architecture separates business logic, application logic, and infrastructure, promoting a modular codebase that is easier to maintain and test.
2. **Scalability and Flexibility**: Changes in one module (e.g., switching databases) don't affect other modules, making the codebase more adaptable to changes.
3. **Testability**: Business logic is isolated, allowing for more granular unit and integration testing without the need for complex mocks or test setups.
4. **Dependency Management**: Dependency Injection decouples modules, allowing each component to work independently, reducing the chances of tight coupling and improving reusability.
5. **Ease of Refactoring**: The architecture enables easy swapping of different layers (e.g., replacing a data source or external service) without affecting the core business logic.

The backend supports creating events, registering participants, managing event status, and providing user authentication and authorization.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: v14 or higher
- **npm**: v6 or higher
- **MongoDB**: v4 or higher (can be local or a remote instance)

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/event-management-backend.git
   cd event-management-backend
   ```

2. **move to:**

   ```bash
   cd backend-test-app
   ```

3. **Install depenencies:**

   ```bash
   npm install
   ```

4. **To start:**

   ```bash
   npm run dev
   ```
