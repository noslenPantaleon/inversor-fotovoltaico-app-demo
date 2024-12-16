# Inverter Monitoring App 🚀

A fullstack application for monitoring inverters, fetching real-time sensor data (temperature, voltage, current), and displaying it in an intuitive frontend interface.

This project is part of the web development assignment for the Technician in Embedded Systems and Internet of Things career at [IFTS](https://buenosaires.gob.ar/informe/tecnicatura-superior-en-sistemas-embebidos-e-internet-de-las-cosas).

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [API Documentation](#api-documentation)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Running the Application](#running-the-application)
- [Folder Structure](#folder-structure)

## Project Overview

The Inverter Monitoring App fetches data from a backend API to display sensor information for various inverters. The app allows users to update individual sensor readings dynamically.

## Features

### Frontend

- Developed with Next.js 15 and React
- Displays inverter sensor data (temperature, voltage, current)
- Real-time updates for individual sensors
- Interactive UI with charts and cards

### Backend

- Built with Node.js and Express
- RESTful API for fetching inverter data
- Query endpoints to retrieve specific field values

## Tech Stack

| Layer            | Technology              |
| ---------------- | ----------------------- |
| Frontend         | Next.js 15, React       |
| Backend          | Node.js, Express        |
| Database         | PostgreSQL (Prisma ORM) |
| API Client       | Axios                   |
| State Management | React Query             |

## API Documentation

**Base URL**: `http://localhost:3001`

### Endpoints

#### Fetch All Inverters 📊

- **URL**: `/inverters`
- **Method**: `GET`
- **Description**: Retrieves all inverter records
- **Response Example**:

| Detail          | Value                          |
| --------------- | ------------------------------ |
| **URL**         | `/inverters`                   |
| **Method**      | `GET`                          |
| **Description** | Retrieves all inverter records |

#### Response Example:

Fetch All Inverters

URL: /inverters
Method: GET
Description: Retrieves all inverter records.
Response Example

```
{
[
  {
    "id": 1,
    "name": "Inverter1",
    "temperature": 25,
    "voltage": 220,
    "current": 10,
    "createdAt": "2024-06-14T12:00:00.000Z"
  }
]
}
```

# Fetch Inverter Field by Name

URL: /inverters
Method: GET
Query Parameters:
inverterName (string): Name of the inverter.
field (string): Field to fetch (temperature, voltage, or current).

GET /inverters?inverterName=Inverter1&field=temperature

Response Example:

{
"temperature": 25,
"createdAt": "2024-06-14T12:00:00.000Z",
"name": "Inverter1"
}

Error Responses:

{
"error": "Invalid 'field' query parameter. Allowed values are: temperature, voltage, current"
}

# Frontend Setup

To set up the frontend with Next.js 15:

cd frontend/dashboard-app
yarn install
yarn run dev

Open in Browser Visit http://localhost:3000.

# Backend Setup

To set up the backend with Node.js and Express:

1. Install Dependencies

cd backend
npm install

2. Database Setup

Configure your PostgreSQL connection string in the .env file:

env
Copy code

DATABASE_URL="postgresql://username:password@localhost:5432/inverterdb"

Run Prisma migrations:

npx prisma migrate dev

3. Start the Server

npm start or npm run dev

4. API Runs on:

http://localhost:3001

# Running the Application

1. Start Backend:

cd backend
npm start or npm run dev

2. Start Frontend:

Open another terminal and navigate to the frontend folder.

cd frontend/dashboard-app
yarn run dev

3. Open the app in the browser:

http://localhost:3000

Folder Structure

root/
│
├── backend/ # Node.js + Express Backend
│ ├── src/ # Source code
│ │ ├── routes/ # API Routes
│ │ ├── prisma/ # Prisma models and migrations
│ │ └── server.js # Entry point
│ ├── .env # Environment variables
│ └── package.json # Backend dependencies
│
├── frontend/dashboard-app # Next.js Frontend
│ ├── components/ # React components
│ ├── hooks/ # Custom React hooks
│ ├── services/ # API service functions (Axios)
│ ├── pages/ # Next.js pages
│ ├── public/ # Static assets
│ ├── styles/ # Global styles
│ └── package.json # Frontend dependencies
│
└── README.md # Project documentation

# Conclusion

This app combines a robust Node.js backend with a modern React-based Next.js frontend. You can easily query specific inverter fields, update sensor data, and monitor inverter performance visually. 🚀
