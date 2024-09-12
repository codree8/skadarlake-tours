# Skadar Lake Tours

**Skadar Lake Tours** is a web-based platform designed for booking tours and exploring the beautiful Skadar Lake in Montenegro. The project consists of two parts: a **frontend** built with React and a **backend** powered by Laravel, both working together to offer a seamless experience for users and administrators.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Usage](#usage)
- [License](#license)

---

## Features

- **User Authentication**: Sign up, log in, and manage profiles.
- **Tour Booking**: Users can browse available tours and book them online.
- **Admin Dashboard**: Manage tours, view bookings, and handle users.
- **Multilingual Support**: English and Serbian languages supported (can add languages as much as you want).
- **Mobile Responsive Design**: Fully responsive for a seamless experience across all devices.

## Technologies Used

- **Frontend**:
  - React.js
  - Chakra UI / Custom CSS and a little bit of bootstrap
  - i18next (for internationalization)
  
- **Backend**:
  - Laravel (PHP Framework)
  - MySQL (Database)
  - Sanctum (API Authentication)

## Setup Instructions

- **Frontend**:
- Navigate to the frontend folder:
- **cd frontend**
- Install dependecies (Make sure you have Node.js installed, then run:
- **npm install**
- Start the frontend server:
- **npm start**
- This will run the frontend on **http://localhost:3000**

- **Backend**:
- Naivgate to the backend folder:
- **cd backend**
- Install dependecies (Make sure you have PHP and Composer installed, then run):
- **composer install**
- Copy the **.env.example** file to **.env**:
- **php artisan key:generate**
- Run migrations:
- **php artisan migrate**
- Start the backend server:
- **php artisan serve**
- This will start the backend on **http://localhost:8000**.

## Usage
Once both the frontend and backend are running, you can:
1. Browse the website on http://localhost:3000
2. Log in or Sign Up to manage your profile and book tours
3. Access the admin dashboard (for admin users) to manage CRUD operations for tours, bookings and users

For a complete list of API endpoints, refer to the backend/routes/api.php file.

