# 📦 Profile Management Microservice – LocaTech

The Profile Management microservice is part of the LocaTech project.  
It is responsible for managing user profiles (owners and tenants) by providing endpoints to read, update, and delete personal information.

This service is built in TypeScript using Express, secured by access rights from the Auth microservice, and tested with Jest/Supertest. It is containerized with Docker and deployable on Google Cloud Run.

---

## 🚀 Features

- 🔍 **Get Profile**: Fetch a user profile by ID
- 📋 **List All Profiles**: Retrieve all registered user profiles
- 📝 **Update Profile**: Modify profile data such as name, birthdate, contact info
- 🗑️ **Delete Profile**: Remove a user profile
- 📚 **Swagger Documentation**: API docs available at `/api-docs`
- ✅ **Integration Tests**: With Jest and Supertest
- 🎯 **Linting & Formatting**: Via ESLint and Prettier
- 🐳 **Dockerized**: Ready for deployment on Google Cloud Run

---

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Contributing](#contributing)

---

## 🔧 Installation

### Prerequisites

- Node.js (v20 recommended)
- PostgreSQL
- Google Cloud Platform account (for deployment)
- Docker (optional for containerization)

### Steps

```bash
git clone https://github.com/locaccm/profileManagement.git
cd profileManagement
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Apply DB migrations
npx prisma migrate dev

# Start the development server
npm run dev
```

---

## ⚙️ Configuration

Create a .env file at the root of the project and configure the following:

### PostgreSQL connection
DATABASE_URL=postgresql://user:password@localhost:5432/database

### Port (optional)
PORT=3000


### Environment Variables

| Variable           | Description                                            |
| ------------------ | ------------------------------------------------------ |
| DATABASE\_URL      | Your PostgreSQL connection string                      |
| PORT               | Port the server listens on (default: 3000)             |


---

## Usage

### API Endpoints

| Method | Endpoint        | Description         |
| ------ | --------------- | ------------------- |
| GET    | `/profiles/:id` | Get a profile by ID |
| PUT    | `/profiles/:id` | Update a profile    |
| DELETE | `/profiles/:id` | Delete a profile    |
| GET    | `/profiles`     | List all profiles   |

Authentication is required on all routes using a Bearer token.
Each route is protected by access rights like `getProfile`, `updateProfile`, etc.


---

## 🧪 Installation
```bash
# Run all tests with coverage
npm run test

# ESLINT test
npm run lint

# Prettier test
npm run prettier 
```

---

## API Documentation

Once the server is running, access Swagger at:

```
http://localhost:3000/api-docs
```

This provides a complete overview of all endpoints, parameters, and request/response examples.

---

## Docker Deployment

Example Dockerfile:

```Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Deployable to **Google Cloud Run** using Artifact Registry.

---

## 👤 Author

Maxime Cauwet – LocaTech CCM Master's Project
