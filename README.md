# TaskForge

A **full-stack Task Management Web Application** built with **Next.js (TypeScript)**, **Node.js (TypeScript)**, and **PostgreSQL**.  
Users can register, log in, and manage their personal tasks with full CRUD functionality, search, filtering, pagination, and JWT-based authentication.

---

## 🌟 Features

- **User Authentication**: Register, Login, Logout  
- **JWT Security**: Access Token + Refresh Token  
- **Password Hashing**: Using Bcrypt for secure storage  
- **Task Management (CRUD)**: Add, Edit, Delete, Toggle status  
- **Search & Filtering**: By title and status  
- **Pagination**: Load tasks in batches (10 per page by default)  
- **Responsive UI**: Works on mobile, tablet, and desktop  
- **Notifications**: Toast messages for success/error  
- **Persistent Login**: JWT token stored in localStorage  

---

 
## 📦 Tech Stack

**Frontend:**  
- Next.js (App Router) + TypeScript  
- Tailwind CSS  
- React Toastify  

**Backend:**  
- Node.js + TypeScript  
- Express.js  
- JWT (Access & Refresh Tokens)  
- Bcrypt (password hashing)  
- Prisma ORM / PostgreSQL  

**Database:**  
- PostgreSQL  

---

## 🏗 Folder Structure

``` bash

TaskForge/
├─ backend/ # Node.js + Express + Prisma
│ ├─ src/
│ │ ├─ controllers/
│ │ ├─ routes/
│ │ ├─ middlewares/
│ │ └─ index.ts
├─ frontend/ # Next.js + TypeScript + Tailwind
│ ├─ app/
│ │ ├─ dashboard/
│ │ ├─ login/
│ │ └─ register/
│ ├─ components/
│ │ └─ TaskForm.tsx
│ ├─ context/
│ │ └─ AuthContext.tsx
│ └─ lib/
│ └─ api.ts
└─ tailwind.config.js

```
---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash

git clone https://github.com/nixen-rohit/TaskForge.git
cd task-management

```

## Install dependencies

# Backend
cd backend
npm install
npm run dev

# Frontend
cd ../frontend
npm install
npm run dev


# Configure Environment Variables

## .env

```bash
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME"
JWT_SECRET="your_jwt_secret"
ACCESS_TOKEN_EXPIRY="15m"
REFRESH_TOKEN_EXPIRY="7d"
```

# Run Database Migrations (Prisma)

``` bash

cd backend
npx prisma migrate dev --name init

```


# Frontend: 

http://localhost:3000

# Backend: 

http://localhost:5000
