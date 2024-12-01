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
- [Live Link](#live-link)
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

`Alternatively, for development mode with live reloading, use npm run dev.`

## Environment-Variables

1. Set up environment variables in a `.env` file:

```env
MONGODB_URL=mongodb://localhost:27017/assignment-2
PORT=3000
```

- Environment Variables
  The following environment variables are required for the application to run:
  - PORT: The port the server will run on (default is 3000).
  - MONGODB_URL: The URL for your MongoDB instance.

## API Documentation

### Car-Routes (/api/cars)

1.  Create a new car

    - Endpoint: (POST) /api/cars
           - Request Body:
      
      ```json
      
             {
      "brand": "Toyota",
      "model": "Camry",
      "year": 2024,
      "price": 25000,
      "category": "Sedan",
      "description": "A reliable family sedan with modern features.",
      "quantity": 100,
      "inStock": false
      }
    
      ```
      - Response:
      ```json
           {
              "message": "Car created Successfully",
              "success": true,
              "data": {
                "brand": "Toyota",
                "model": "Camry",
                "year": 2024,
                "price": 25000,
                "category": "Sedan",
                "description": "A reliable family sedan with modern features.",
                "quantity": 0,
                "inStock": false,
                "_id": "6749829e7b85c724cfb23c67",
                "createdAt": "2024-11-29T09:00:14.876Z",
                "updatedAt": "2024-11-29T09:00:14.876Z",
                "__v": 0
              }
            }

      ```

2.  Get all cars

    - Endpoint: GET /api/cars

      - Response:

      ```json
      {
        "message": "Cars retrieved successfully",
        "success": true,
        "data": [
          {
            "_id": "6748599ca6a54826b7d696b5",
            "brand": "Toyota",
            "model": "Camry",
            "year": 2024,
            "price": 25000,
            "category": "Sedan",
            "description": "A reliable family sedan with modern features.",
            "quantity": 50,
            "inStock": true,
            "createdAt": "2024-11-28T11:53:00.573Z",
            "updatedAt": "2024-11-28T11:53:00.573Z",
            "__v": 0
          }
        ]
      }
      ```

3.  Get a single car by ID

   - Endpoint: GET /api/cars/:carId
       - Response:

         ```json
              {
                "message": "Car retrieved successfully",
                "success": true,
                "data": {
                    "_id": "6748599ca6a54826b7d696b5",
                    "brand": "Toyota",
                    "model": "Camry",
                    "year": 2024,
                    "price": 25000,
                    "category": "Sedan",
                    "description": "A reliable family sedan with modern features.",
                    "quantity": 50,
                    "inStock": true,
                    "createdAt": "2024-11-28T11:53:00.573Z",
                    "updatedAt": "2024-11-28T11:53:00.573Z",
                    "__v": 0
                }
    
                }
    
          ```

4.  Update a car by ID

    - Endpoint: PUT /api/cars/:carId

      - Request Body:

        ```json
        {
          "make": "Toyota",
          "model": "Corolla",
          "year": 2021,
          "price": 22000
        }
        ```

      - Response:
        ```json
        {
          "message": "Car updated successfully",
          "success": true,
          "data": {
            "_id": "6748599ca6a54826b7d696b5",
            "brand": "Toyota",
            "model": "Camry",
            "year": 2024,
            "price": 27000,
            "category": "Sedan",
            "description": "A reliable family sedan with modern features.",
            "quantity": 30,
            "inStock": true,
            "createdAt": "2024-11-28T11:53:00.573Z",
            "updatedAt": "2024-11-29T09:05:43.641Z",
            "__v": 0
          }
        }
        ```

5.  Delete a car by ID
    - Endpoint: DELETE /api/cars/:carId
      - Response
      ```json
      {
        "message": "Car deleted successfully",
        "success": true,
        "data": {}
      }
      ```

### Order-Routes (/api/orders)

1.  Make an order

    - Endpoint: POST /api/orders

      - Request Body:

        ```json
        {
          "email": "customer@example.com",
          "car": "67485990a6a54826b7d696b1",
          "quantity": 2
        }
        ```

      - Response:

        ```json
        {
          "message": "Order created successfully",
          "success": true,
          "data": {
            "email": "customer@example.com",
            "car": "674984c07b85c724cfb23c73",
            "quantity": 1,
            "totalPrice": 25000,
            "_id": "674984c87b85c724cfb23c76",
            "createdAt": "2024-11-29T09:09:28.929Z",
            "updatedAt": "2024-11-29T09:09:28.929Z",
            "__v": 0
          }
        }
        ```

2.  Get total revenue

    - Endpoint: GET /api/orders/revenue
      - Response:
        ```json
        {
          "message": "Total revenue fetched successfully",
          "success": true,
          "data": {
            "totalRevenue": 225000
          }
        }
        ```

## Live-Link

- ### Live - [Live Link](https://batch-4-assignmnet-2.vercel.app)

- ### Live-Vide-Explanation - [Live Video Explanation](https://drive.google.com/file/d/1zPquRqDYmQCY2yo9x6xZLvoZrmxnAcuu/view?usp=sharing)


## Technologies

- Node.js: JavaScript runtime for building the application.
- Express.js: Web framework for building the RESTful API.
- TypeScript: Superset of JavaScript for static typing.
- MongoDB: NoSQL database for storing car and order information.
- ts-node-dev: Development tool for running TypeScript code with live reloading.
