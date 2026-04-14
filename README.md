# 📝 Modern Blog Platform

A fully functional, aesthetic, and responsive full-stack blog platform built with the MERN stack (MongoDB, Express, React, Node.js). 

This application allows users to create accounts, log in securely with JWT authentication, and create, edit, and delete their own blog posts. It features a premium, dynamic glassmorphism-inspired UI.

## ✨ Features
* **Robust Authentication:** Secure user registration and login flows using JSON Web Tokens (JWT) and Bcrypt password hashing.
* **CRUD Operations:** Users can create, read, update, and delete their blog posts intuitively.
* **Premium Dashboard:** A state-of-the-art dashboard to manage your publications.
* **Rich UI/UX:** Responsive design, dark mode theme by default, modern gradients, and smooth component transitions.
* **Protected Routes:** Both client-side React Router protections and server-side Express middlewares to secure user endpoints.

## 💻 Tech Stack
* **Frontend:** React.js, React Router v6, Axios, Vanilla CSS (Modern aesthetic guidelines)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose ORM)
* **Security:** JWT, BcryptJS, CORS

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) installed
* A MongoDB connection URI (Atlas or Local)

### 1. Backend Setup
Navigate to the server directory:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory and add your variables:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

Start the backend:
```bash
npm run dev
```
*(Runs on exactly `http://localhost:5000`)*

### 2. Frontend Setup
Open a new terminal and navigate to the client directory:
```bash
cd client
npm install
```

Start the React app:
```bash
npm start
```
*(Runs on `http://localhost:3000`)*

---
*Built with passion, powered by JavaScript.*
