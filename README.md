#  Flatmate Conflict Management System

This is a full-stack **Flatmate Conflict Management System** to help roommates handle complaints, resolve conflicts, and build a healthy living environment — with gamified karma points.

Built with:
-  **MERN Stack**: MongoDB, Express, React, Node.js
-  **JWT Auth** stored in secure **cookies**
-  **Redux Toolkit** for clean state management
-  **Axios** with `withCredentials` for cookie-based auth
-  **Protected Routes** for members

---

## 🚀 Features

-  Register & Login (JWT stored in cookie)
-  File complaints
-  Upvote / Downvote complaints
-  Resolve complaints and earn karma points
-  Leaderboard of best flatmates
-  Protected member routes (auto redirect to `/login` if not authenticated)

---

## ⚙️ **Tech Stack**

| Layer       | Tech                 |
|-------------|----------------------|
| Frontend    | React + Vite + Redux |
| Backend     | Node.js + Express    |
| Database    | MongoDB Atlas/local  |
| Auth        | JWT in HttpOnly cookie |

---



## 🔑 **Environment Variables**

### ✅ **Backend (`/server/.env`)**

Create a `.env` file in your **server** folder:
- `MONGO_URL`: Your MongoDB URI (local or Atlas)
- `JWT_SECRET_KEY`: A strong random secret (e.g. from `openssl rand -hex 32`)

---

### ✅ **Frontend (`/client/.env`)**

Create a `.env` file in your **client** folder:
- `VITE_API_URL` → must match your backend base URL  
- Your `axiosInstance` picks this up automatically.



