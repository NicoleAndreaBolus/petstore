# 🐶 PetStore: A Full-Stack Adoption Platform

A functional e-commerce platform built with React, Spring Boot, and PostgreSQL. Instead of a standard shopping cart, this platform utilizes a specialized **Meet & Greet Scheduling System** with a secure Admin Approval Dashboard.

### 👨‍🏫 FOR GRADING / TESTING:
To access the Admin Dashboard to view and approve pending adoptions, please use the following seeded credentials:
* **Email:** `admin@petstore.com`
* **Password:** `admin123`

*(Note: You can also use the "Auto-Fill Professor Login" button on the Sign-In page! Once logged in, navigate to `http://localhost:5173/admin` to view the dashboard).*

## 🛠️ Tech Stack
* **Backend:** Java 17, Spring Boot 3, Spring Data JPA, PostgreSQL, Spring Security (JWT)
* **Frontend:** React (Vite), Material UI (MUI), Context API
* **AI Agent:** Spec-kit

## 🚀 Key Features
1. **Authenticated CRUD:** Secure REST endpoints for creating, reading, updating, and deleting pets.
2. **Product Gallery:** A responsive Material UI grid with multi-step Pet Passport modals.
3. **Checkout Flow:** Users can select preferred dates/times for Meet & Greets.
4. **Admin Dashboard:** A protected route for staff to process intake forms and approve pending adoptions.
5. **Auto-Seeding Database:** Automatically populates the database with pets and an admin user on startup.