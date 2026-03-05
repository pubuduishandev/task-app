# 🚀 NestTask: Full-Stack Task Management

A simple Task Management ecosystem built with a focus on **Security**, **Scalability**, and **Developer Experience**. This project features a robust NestJS backend with JWT-protected REST APIs and a modern, high-performance React frontend.

---

## 📸 Preview

<div align="center">
  <img src="screenshots/Login.png" alt="Login Page" />
  <p><i>Figure 1 - User Login Page</i></p>

  <img src="screenshots/Register.png" alt="Register Page" />
  <p><i>Figure 2 - User Onboarding Page</i></p>

  <img src="screenshots/Tasks.png" alt="Tasks Dashboard" />
  <p><i>Figure 3 -Tasks Dashboard</i></p>
</div>

---

## ✨ Advanced Features

### **Security & Identity**

* **JWT Authentication:** Secure stateless authentication using JSON Web Tokens.
* **Encrypted Passwords:** Industry-standard hashing using `bcrypt`.
* **Data Isolation:** Multi-user support where users can only access their own data via verified Token payloads.

### **Backend Excellence (NestJS)**

* **Automated API Docs:** Interactive **Swagger/OpenAPI** documentation available at `/api`.
* **Unified Response Envelope:** All API responses (Success/Error) follow a standardized JSON structure via Global Interceptors and Exception Filters.
* **Type-Safe ORM:** Prisma v6 with PostgreSQL for predictable and fast database operations.

### **Frontend Experience (React)**

* **Glassmorphism UI:** A sleek, modern dark-themed interface built with Ant Design.
* **Dynamic UX:** Real-time feedback using AntD messages and **Skeleton Loading** for perceived performance.
* **Stateful Navigation:** Automatic login persistence and profile management.
* **Service Layer:** Fully decoupled Axios service architecture for clean API communication.

---

## 🛠️ Tech Stack

### **Backend (`/task-app-backend`)**

* **Framework:** [NestJS](https://nestjs.com/)
* **Auth:** Passport.js & JWT
* **Documentation:** Swagger UI
* **Database:** PostgreSQL
* **ORM:** Prisma v6
* **Tools:** class-validator, bcrypt

### **Frontend (`/task-app-frontend`)**

* **Framework:** React 18 (Vite)
* **UI System:** Ant Design (antd)
* **Animation:** CSS Keyframes & Glassmorphism
* **State:** React Hooks (useState/useEffect)
* **HTTP:** Axios with Interceptors

---

## 📂 Project Structure

```text
task-app/
├── task-app-backend/         
│   ├── src/common/           # Global Interceptors & Exception Filters
│   ├── src/auth/             # JWT Strategy & Passport Logic
│   ├── src/tasks/            # Task CRUD with User Ownership logic
│   └── prisma/               # Database Schema & Migrations
└── task-app-frontend/        
    ├── src/api/              # Centralized Axios Client
    ├── src/services/         # Business logic services (Auth/Task)
    ├── src/pages/            # View components (Login/Register/Tasks)
    └── src/types/            # Unified TypeScript Interfaces

```

---

## 🚀 Installation & Setup

### 1. Backend Setup

```bash
cd task-app-backend
npm install

# Setup environment variables (.env)
DATABASE_URL="postgresql://user:pass@localhost:5432/task_manager"
JWT_SECRET="your_ultra_secure_secret"

# Sync database
npx prisma generate
npx prisma db push

# Start API (Documentation at http://localhost:3000/api)
npm run start:dev

```

### 2. Frontend Setup

```bash
cd task-app-frontend
npm install
npm run dev

```

---

## 👨‍💻 Author

**Pubudu Ishan Wickrama Arachchi** <br />
*Software Engineer* <br />
*GitHub: [@pubuduishandev](https://github.com/pubuduishandev)* <br />
*LinkedIn: [@pubuduishandigital](https://www.linkedin.com/in/pubuduishandigital/)*
