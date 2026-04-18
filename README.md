# WanderLust
A dynamic E platform for booking hotels, property &amp; many more... 
=======

> A full-stack Airbnb-inspired listing platform built with React, Express, MongoDB, and image uploads that make every property feel alive.

![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Build-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/API-Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/UI-Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

## Why It Stands Out

WanderLust is more than a CRUD project. It is a polished property-listing experience where users can browse stays, open detailed listing pages, leave reviews, and manage their own listings through protected routes. The latest version also supports real image-file uploads for both creating and editing listings.

## Highlights

- Beautiful Airbnb-style listing experience
- Full authentication flow with signup, login, logout, and protected pages
- Create, edit, and delete listings
- Real image upload flow using `multipart/form-data`
- Image previews while adding or editing a listing
- Listing detail page with gallery-style image switching
- Review system for user feedback
- JWT-based auth using cookies
- Responsive UI built with React, Tailwind CSS, and Material UI
- Toast-based feedback for actions and errors

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Tailwind CSS
- Material UI
- React Hot Toast
- Lucide React

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- JWT Authentication
- Multer for file uploads
- Sharp for image processing
- Joi for request validation

## Project Structure

```text
AIR-BNB/
├── Client/     # React frontend
├── Server/     # Express backend
└── README.md
```

## Core Features

### Authentication

- Users can sign up and log in
- Auth state is protected with JWT stored in cookies
- Protected routes prevent unauthorized listing management

### Listings

- Browse all available listings from the homepage
- Open a dedicated page for each property
- Owners can edit or delete their own listings
- Shared add/edit form keeps the creation flow consistent

### Images

- Upload multiple listing images from your device
- Preview images before submitting
- Keep or remove existing images while editing
- Images are resized on the backend before being stored

### Reviews

- Logged-in users can post reviews on listings
- Reviews are connected to listings and rendered on the details page

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd AIR-BNB
```

### 2. Install dependencies

```bash
cd Client
npm install

cd ../Server
npm install
```

### 3. Configure environment variables

Create a `.env` file inside `Server/` and add:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_cloud_api_key
CLOUD_API_SECRET=your_cloud_api_secret
```

Note: the current upload flow serves processed images locally from the `Uploads/` folder. Cloudinary config is present in the backend for future or alternate media hosting.

### 4. Run the app

In one terminal:

```bash
cd Server
npm run dev
```

In another terminal:

```bash
cd Client
npm run dev
```

Frontend runs on `http://localhost:5173`  
Backend runs on `http://localhost:8080`

## Routes Overview

### Frontend Routes

- `/` - Home page
- `/signup` - Create account
- `/login` - Log in
- `/listing/:id` - View single listing
- `/listing/new` - Add new listing
- `/listing/edit/:id` - Edit existing listing

### API Routes

- `GET /api/listing` - Get all listings
- `GET /api/listing/:id` - Get one listing
- `POST /api/listing/newlisting` - Create a new listing
- `PUT /api/listing/edit/:id` - Update a listing
- `DELETE /api/listing/delete/:id` - Delete a listing
- `POST /api/listing/:id/reviews` - Add a review
- `POST /api/user/signup` - Register user
- `POST /api/user/login` - Log in user

## What I Focused On

- Clean user flow from browsing to ownership actions
- A more realistic full-stack architecture than basic demo apps
- Backend validation and protected access for sensitive routes
- Media handling that moves beyond plain image URLs

## Future Improvements

- Cloudinary-based persistent media hosting
- Search and filtering
- Booking flow and availability calendar
- Favorites or wishlist support
- Map-based discovery
- Better dashboard for hosts

## Screenshots

Add your best screenshots here for maximum impact on GitHub:

```md
![Home](./screenshots/home.png)
![Listing](./screenshots/listing.png)
![Edit Listing](./screenshots/edit-listing.png)
```

## Author

Built by Gyaansh.

If you want, I can also turn this into a more premium README style next:

- with centered hero section
- animated GIF/demo section
- custom badges
- feature cards
- deployment links
>>>>>>> ea50c6b (Feature: Added files system and replaced URLs, refactored the code, Improved readme.md)
