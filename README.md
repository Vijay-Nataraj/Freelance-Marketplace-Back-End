# Freelance Marketplace Backend

This project is the backend for a freelance marketplace where freelancers can offer their services and clients can post job listings. The platform includes features for user authentication, payment processing, and reviews to facilitate seamless interactions between freelancers and clients.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Documentation URL](#documentation-url)

## Technologies Used

- **Node.js**: Runtime environment
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **JWT**: JSON Web Tokens for authentication
- **Razorpay**: Payment gateway integration

## Installation

1. **Clone the repository**:

   ```bash
    git clone https://github.com/Vijay-Nataraj/Freelance-Marketplace-Back-End.git


   ```

2. **Navigate to the project directory**:

   ```bash

       cd Freelance-Marketplace-Back-End

   ```

3. **Install the dependencies**:

   ```bash

       npm install

   ```

4. **Set up environment variables**:

   - Create a .env file in the root directory.
   - Add the following variables:

   ```bash

        MONGO_URI=<your-mongodb-uri>
        JWT_SECRET=<your-jwt-secret>
        RAZORPAY_KEY_ID=<your-razorpay-key-id>
        RAZORPAY_KEY_SECRET=<your-razorpay-key-secret>

   ```

5. **Start the server**:

   ```bash

        npm run dev

   ```

## Features

### User Authentication

- **Registration and Login**:
  - Users (freelancers and clients) can register and log in using their email or social media accounts.
  - Role-based authentication to distinguish between freelancers and clients.
- **Profile Management**:
  - Users can create and update their profiles, including personal information, skills, and portfolio for freelancers, and business details for clients.
- **Password Management**:
  - Users can reset and change their passwords.

### Freelancer Features

- **Service Listings**:
  - Freelancers can create and manage service listings, including descriptions, pricing, and categories.
  - Options for uploading work samples and setting availability.
- **Search and Filter**:
  - Clients can find freelancers based on skills, location, rating, and budget.
- **Profile and Portfolio**:
  - Freelancers can showcase their portfolios and client reviews on their profiles.
- **Contract Management**:
  - Freelancers can view and manage contracts, including proposals, agreements, and project milestones.
- **Payment Processing**:
  - Secure transactions with payment gateway integration. Freelancers receive payments upon completion of work or milestones.
- **Reviews and Ratings**:
  - Clients can leave reviews and ratings for freelancers upon project completion. Freelancers can respond to reviews.

### Client Features

- **Job Listings**:
  - Clients can post job listings with details such as job description, budget, and deadlines.
  - Options to manage and update job listings.
- **Search and Filter**:
  - Clients can find suitable freelancers based on skills, ratings, and budget.
- **Contract Management**:
  - Clients can create, review, and manage contracts with freelancers. Track project progress and communicate with freelancers.
- **Payment Processing**:
  - Secure transactions with payment gateway integration. Clients make payments for completed work or escrow payments for ongoing projects.
- **Reviews and Ratings**:
  - Clients can rate and review freelancers after project completion. Clients can view ratings and reviews of freelancers before hiring.

### Payment Processing

- **Payment Integration**:
  - Secure financial transactions with payment gateways such as Stripe, PayPal, or Razorpay.
- **Payment Scheduling**:
  - Scheduled payments, including milestone-based payments and immediate payments upon project completion.
- **Transaction History**:
  - Users have access to their payment and transaction history for transparency and record-keeping.

### Reviews and Ratings

- **Review System**:
  - Clients can rate and review freelancers based on their work experience.
- **Rating Metrics**:
  - Freelancer ratings and reviews displayed on profiles and job listings to assist clients in making informed decisions.
- **Feedback Response**:
  - Freelancers can respond to reviews and feedback, fostering a transparent and communicative environment.

### Additional Features

- **Notifications**:
  - Alert users about job postings, contract updates, payment statuses, and new reviews.
- **Search and Filter**:
  - Advanced search and filtering options for both freelancers and clients to streamline the discovery of services and job listings.
- **Dashboard**:
  - Dashboards for both freelancers and clients to manage their activities, contracts, payments, and notifications.

## API Endpoints

### User Authentication

- `POST` `/api/v1/auth/register` - Register a new user

- `POST` `/api/v1/auth/login` - User login

- `POST` `/api/v1/auth/reset-password` - Reset password

- `POST` `/api/v1/auth/change-password` - Change password

### Freelancer Features

- `POST` `/api/v1/freelancers/service` - Add a new service

- `GET` `/api/v1/freelancers/service` - Get all services

- `PUT` `/api/v1/freelancers/service/:id` - Update a service by ID

- `GET` `/api/v1/freelancers/profile` - Get freelancer profile

- `PUT` `/api/v1/freelancers/profile` - Update freelancer profile

### Client Features

- `POST` `/api/v1/clients/job` - Post a new job

- `GET` `/api/v1/clients/job` - Get all jobs

- `PUT` `/api/v1/clients/job/:id` - Update a job by ID

- `GET` `/api/v1/clients/profile` - Get client profile

- `PUT` `/api/v1/clients/profile` - Update client profile

### Payment Processing

- `POST` `/api/v1/payments/transaction` - Process a new transaction

- `GET` `/api/v1/payments/transaction-history` - Get transaction history

### Reviews and Ratings

- `POST` `/api/v1/reviews` - Post a review

- `GET` `/api/v1/reviews/:freelancerId` - Get reviews for a specific freelancer

## Documentation URL

[POSTMAN API Documentation URL: ]()
