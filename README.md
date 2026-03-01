# Enterprise Task Manager 🚀

A full-stack, enterprise-grade Task Management application built with a modern TypeScript ecosystem. This project demonstrates a clean, decoupled architecture using a NestJS REST API and a React frontend, managed as a monorepo.



## 🛠️ Tech Stack

### **Backend (`/task-app-backend`)**
* **Framework:** [NestJS](https://nestjs.com/) (Node.js)
* **Database:** [PostgreSQL](https://www.postgresql.org/)
* **ORM:** [Prisma v6](https://www.prisma.io/)
* **Architecture:** Controller-Service-Provider Pattern with Dependency Injection.
* **Language:** TypeScript

### **Frontend (`/task-app-frontend`)**
* **Framework:** [React](https://react.dev/) (Vite)
* **UI Library:** [Ant Design (antd)](https://ant.design/)
* **Icons:** @ant-design/icons
* **HTTP Client:** [Axios](https://axios-http.com/) (with centralized service layer)
* **Language:** TypeScript

---

## 📂 Project Structure

This project is structured as a monorepo to keep the frontend and backend synchronized.

```text
task-app/
├── task-app-backend/     # NestJS API, Prisma Schema, and DB logic
└── task-app-frontend/    # React SPA, Ant Design UI, and API Services

```

---

## 🚀 Getting Started

To run this project locally, ensure you have **Node.js**, **pnpm**, and **PostgreSQL** installed.

### 1. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd task-app-backend
pnpm install

```

**Database Configuration:**
Create a `.env` file in the `task-app-backend` folder and add your PostgreSQL connection string:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/task_manager?schema=public"

```

**Sync Database & Start Server:**

```bash
# Push the schema to your local PostgreSQL instance
pnpm dlx prisma db push

# Generate the local Prisma Client
pnpm prisma generate

# Start the NestJS server (runs on http://localhost:3000)
pnpm run start:dev

```

### 2. Frontend Setup

Open a new terminal window, navigate to the frontend directory:

```bash
cd task-app-frontend
pnpm install

# Start the Vite development server (runs on http://localhost:5173)
pnpm run dev

```

---

## ✨ Key Features Implemented

* **Full CRUD Operations:** Create, Read, Update, and Delete tasks.
* **Persistent Storage:** Data is stored in a local PostgreSQL database via Prisma ORM.
* **Clean API Service Layer:** Frontend uses a centralized Axios client and dedicated service files for better maintainability.
* **Strict Typing:** Shared TypeScript interfaces between the frontend and backend logic.
* **Enterprise UI:** Professional look and feel using Ant Design components.
* **CORS Enabled:** Secured communication between different local origins.

---

## 👨‍💻 Author

**Pubudu Ishan**

* **GitHub:** [@pubuduishandev](https://github.com/pubuduishandev)
* **Role:** Software Engineer

```

### How to push this to GitHub now:
1. Open your terminal in the root `task-app` folder.
2. Run these commands:
```bash
git add README.md
git commit -m "docs: add full-stack documentation"
git push

```
