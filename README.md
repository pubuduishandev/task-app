# Enterprise Task Manager 🚀

A full-stack, enterprise-grade Task Management application built with a modern TypeScript ecosystem. This project demonstrates a decoupled architecture using a NestJS REST API and a React frontend, managed as a monorepo.

## 🛠️ Tech Stack

**Backend (`/task-app-backend`)**
* **Framework:** NestJS
* **Database:** PostgreSQL
* **ORM:** Prisma (v6)
* **Language:** TypeScript

**Frontend (`/task-app-frontend`)**
* **Framework:** React (Vite)
* **UI Library:** Ant Design
* **HTTP Client:** Axios
* **Language:** TypeScript

---

## 📂 Project Structure

This project is structured as a monorepo containing two separate applications:

```text
task-app/
├── task-app-backend/     # NestJS API & Prisma Database Layer
└── task-app-frontend/    # React SPA & Ant Design UI
