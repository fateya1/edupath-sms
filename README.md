# edupath-sms

A comprehensive School Management System for the CBC curriculum (STEM, Social Sciences, Arts & Sports), with student/parent/teacher workflows, role-based access, and extensible modules (e.g., M-Pesa integrations and Islamic education support).

---

## ✨ Key Features

- ✅ Role-based authentication (Admin / Teacher / Parent / Student)
- ✅ Student management (CRUD)
- ✅ Protected routes (frontend) + auth context
- ✅ REST API backend (NestJS) + Prisma migrations
- ✅ Vite + React + TypeScript frontend
- ✅ Vercel-ready SPA deployment (React Router rewrites)

---

## 🧱 Tech Stack

**Frontend**
- React + TypeScript
- Vite
- React Router
- Context API (Auth + Students)

**Backend**
- NestJS
- Prisma
- PostgreSQL (recommended)

---

## 📁 Monorepo Structure

```txt
edupath-sms/
├── backend/                # NestJS API
│   ├── src/
│   ├── prisma/
│   ├── package.json
│   └── tsconfig.json
├── frontend/               # React (Vite) client
│   ├── public/
│   ├── src/
│   ├── vercel.json         # SPA rewrites for React Router
│   ├── package.json
│   └── vite.config.ts
└── README.md               # (You are here)
