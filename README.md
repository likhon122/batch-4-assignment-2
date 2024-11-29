# Car Web API (Assignment 2)

This is a car management and order processing web API built using TypeScript, Express.js, and MongoDB. It provides functionality for managing cars and processing orders. The API follows a RESTful architecture with routes prefixed `/api`.

## Features

- CRUD operations for managing cars
- Ability to make orders and track revenue
- Built using TypeScript, Express, and MongoDB

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
  - [Car Routes](#car-routes)
  - [Order Routes](#order-routes)
- [Running the Application](#running-the-application)
- [Technologies](#technologies)

## Installation

1. Clone the repository.
2. Navigate into the project directory `cd batch-4-assignment-2`
3. Install the required dependencies using `npm install`.

4. Run Locally

```bash
npm run dev
```

5. Build Project

```bash
npm run build
```

Alternatively, for development mode with live reloading, use npm run dev.

## Environment-Variables

1. Set up environment variables in a `.env` file:

```env
PORT=3000
MONGODB_URL=mongodb://localhost:27017/assignment-2
```

- Environment Variables
  The following environment variables are required for the application to run:
  - PORT: The port the server will run on (default is 3000).
  - MONGODB_URL: The URL for your MongoDB instance.

## API Documentation

### Car Routes (/api/cars)

1. Create a new car
   - Endpoint: POST /api/cars
  Request Body:

```json
{
  "make": "Toyota",
  "model": "Corolla",
  "year": 2020,
  "price": 20000
}
```

Get all cars
Endpoint: GET /api/cars
Response:
json
Copy code
[
{
"id": "12345",
"make": "Toyota",
"model": "Corolla",
"year": 2020,
"price": 20000
},
...
]
Get a single car by ID
Endpoint: GET /api/cars/:carId
Response:
json
Copy code
{
"id": "12345",
"make": "Toyota",
"model": "Corolla",
"year": 2020,
"price": 20000
}
Update a car by ID
Endpoint: PUT /api/cars/:carId
Request Body:
json
Copy code
{
"make": "Toyota",
"model": "Corolla",
"year": 2021,
"price": 22000
}
Delete a car by ID
Endpoint: DELETE /api/cars/:carId
Order Routes (/api/orders)
Make an order
Endpoint: POST /api/orders
Request Body:
json
Copy code
{
"carId": "12345",
"quantity": 1,
"totalPrice": 20000
}
Get total revenue
Endpoint: GET /api/orders/revenue
Response:
json
Copy code
{
"revenue": 50000
}
Running the Application
After setting up the project and environment variables, you can run the application using the following commands:

Development mode (with live reloading):

bash
Copy code
npm run dev
Production mode:

bash
Copy code
npm start
The API will be available at http://localhost:3000.

Technologies
Node.js: JavaScript runtime for building the application.
Express.js: Web framework for building the RESTful API.
TypeScript: Superset of JavaScript for static typing.
MongoDB: NoSQL database for storing car and order information.
ts-node-dev: Development tool for running TypeScript code with live reloading.
TypeORM: ORM for interacting with the MongoDB database.
License
This project is licensed under the MIT License - see the LICENSE file for details.

vbnet
Copy code

This is your full `README.md` file containing all the required sections and information. Let me know i
