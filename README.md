# 2gether Backend

Welcome to the backend repository of 2gether, a platform aimed at facilitating fundraising campaigns. This README provides an overview of the backend structure, integrations, and APIs used.

## Table of Contents

- [Introduction](#introduction)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [Integration with Public Information Portal](#integration-with-public-information-portal)
- [Image Upload with Cloudinary](#image-upload-with-cloudinary)
- [User Management with JWT and Local Storage](#user-management-with-jwt-and-local-storage)
- [API Documentation](#api-documentation)
- [Postman Collection](#postman-collection)

## Introduction

2gether is a platform designed to streamline fundraising campaigns by providing tools for managing users, campaigns, donations, and integration with third-party services like Stripe for payment processing. The backend is structured around entities such as user, campaign, donation, and Stripe entities, each with its own controller, router, and repository for managing CRUD operations.

## Folder Structure

The backend repository follows a modular structure with separate folders for each entity:

- `controllers`: Contains controller logic for each entity.
- `models`: Defines the data models for each entity.
- `repositories`: Implements data access methods for each entity.
- `routes`: Defines the API routes for each entity.
- `services`: Contains business logic and integrations with external services.

## Technologies Used

The backend of 2gether utilizes the following technologies:

- Node.js: JavaScript runtime environment
- Express.js: Web application framework for Node.js
- MongoDB: NoSQL database for storing application data
- Mongoose: MongoDB object modeling tool
- Stripe: API for processing payments
- Cloudinary: Cloud-based image and video management service
- JWT (JSON Web Tokens): For user authentication and authorization

## Integration with Public Information Portal

2gether is integrated with the Public Information Portal, a service that provides organization information to the system. This integration allows users to access relevant information about organizations participating in fundraising campaigns.

## Image Upload with Cloudinary

The backend utilizes Cloudinary for image upload functionality. Cloudinary offers a robust platform for managing and serving images efficiently. Images uploaded by users are stored securely on Cloudinary servers.

## User Management with JWT and Local Storage

User management in 2gether is implemented using JWT for authentication and local storage for storing user session information. JWT tokens are generated upon user login and used to authenticate subsequent API requests.

## API Documentation

The API endpoints and their functionalities are documented using Swagger. The API documentation provides detailed information about each endpoint, including request parameters, response formats, and example requests/responses.

## Postman Collection

For developers and testers, a Postman collection is provided to facilitate testing and exploration of the API endpoints. The collection includes pre-configured requests for each API endpoint along with example payloads.

### Postman Collection Links:
- [2gether API Collection](https://documenter.getpostman.com/view/32069376/2sA3BgAFPf)
- [2gether Stripe API Collection](https://documenter.getpostman.com/view/32069376/2sA3BgAFU8)
- [2gether Public Information Portal API Collection](https://documenter.getpostman.com/view/32069376/2sA3BgAFUA)

