# CoffeePK Backend

CoffeePK Backend is the Node.js, Express.js, and PostgreSQL API layer for the CoffeePK full-stack coffee commerce platform. It manages authentication, role-based access control, product operations, promotions, user profiles, cart workflows, checkout, and transaction management.

This backend is designed to work with the CoffeePK React frontend.

---

## Overview

The backend provides REST API endpoints for the CoffeePK commerce system. It connects with a PostgreSQL database, handles secure user authentication using JWT, protects admin routes through role-based authorization, and manages business workflows such as products, promotions, carts, transactions, and user profiles.

It also includes database schema setup through `ddl.sql` and a Postman collection for API testing.

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- bcrypt
- pg
- CORS
- Morgan
- Multer
- Cloudinary
- Nodemailer
- dotenv

---

## Key Features

### Authentication and Authorization

- User registration
- User login
- Password hashing with bcrypt
- JWT-based authentication
- Protected routes
- Role-based access control
- Admin-only route protection

### Commerce and Business Features

- Product management
- Promotion management
- Cart workflow support
- Checkout and transaction handling
- User profile management
- Transaction status tracking
- PostgreSQL-backed data persistence

### Developer Features

- Modular backend structure
- Environment-based configuration
- PostgreSQL schema file included
- Postman collection included for API testing
- API logging with Morgan
- Cloudinary support for image uploads

---

## Folder Structure

```txt
backend/
├── public/
├── src/
├── ddl.sql
├── index.js
├── postman.json
├── vercel.json
├── package.json
├── package-lock.json
├── .env.example
└── README.md
```

---

## Environment Variables

Create a `.env` file in the backend root directory.

Use `.env.example` as a reference:

```env
APP_NAME=CoffeePK
APP_PORT=8080

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=your_database_password
DB_NAME=jokopi_db

MONGODB_HOST=
MONGODB_USER=
MONGODB_PASS=
MONGODB_NAME=

JWT_SECRET_KEY=your_jwt_secret_key

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret

GOOGLE_APPLICATION_CREDENTIALS=
```

The real `.env` file must not be pushed to GitHub.

---

## Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE jokopi_db;
```

Then run the SQL script:

```txt
ddl.sql
```

The schema creates tables for users, roles, products, categories, carts, promotions, transactions, payments, deliveries, status tracking, password reset, and user profiles.

---

## Installation and Setup

### 1. Navigate to Backend Folder

```bash
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment File

Create a `.env` file using `.env.example` as a reference.

### 4. Start Backend Server

```bash
npm start
```

For development with nodemon:

```bash
npm run dev
```

The backend runs at:

```txt
http://localhost:8080
```

---

## API Testing

A Postman collection is included:

```txt
postman.json
```

Import this file into Postman to test authentication, product routes, profile routes, cart workflows, transaction APIs, and admin-protected endpoints.

---

## Security Notes

- Real `.env` files are ignored by Git.
- Database passwords, JWT secrets, and Cloudinary credentials should never be committed.
- Use `.env.example` only to show required variable names.
- Regenerate any credential that has been accidentally exposed.

---

## Related Frontend

This backend works with the CoffeePK React frontend located in:

```txt
../frontend
```

Expected frontend URL during local development:

```txt
http://localhost:3000
```

---

## Author

**Shahzaib Safdar**  
BS Computer Science  
Air University, Islamabad  

GitHub: [Shahzaib891](https://github.com/Shahzaib891)