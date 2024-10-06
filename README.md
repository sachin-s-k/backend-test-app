# Event Management Backend

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

The Event Management Backend is built using Node.js and Express. It utilizes MongoDB for storing data and provides a RESTful API for interacting with the system. The backend supports creating events, registering participants, managing event status, and providing user authentication and authorization.

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
