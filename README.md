# CoffeePK - Full-Stack Coffee Commerce Platform

CoffeePK is a full-stack coffee commerce platform built with React, Node.js, Express.js, and PostgreSQL. It includes customer shopping workflows, authentication, product browsing, cart management, checkout, transaction history, promotions, admin operations, and role-based access control.

The project is structured as a complete full-stack portfolio application with separate frontend and backend folders, clean documentation, environment examples, screenshots, database schema, and API testing support.

---

## Project Overview

CoffeePK demonstrates a practical e-commerce workflow for a coffee business. The frontend provides a responsive customer interface, while the backend manages authentication, protected routes, PostgreSQL database operations, product data, promotions, carts, profiles, and transaction records.

This project is designed for internship, recruiter, and portfolio review. It highlights full-stack development, API integration, database design, authentication, authorization, and clean GitHub documentation.

---

## Tech Stack

### Frontend

- React
- JavaScript
- React Router
- Redux Toolkit
- Redux Persist
- Axios
- Tailwind CSS
- DaisyUI
- React Hot Toast
- CSS

### Backend

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

### Customer Features

- User registration
- User login
- Product browsing
- Product details page
- Cart management
- Checkout/order flow
- Transaction history
- Profile-related features
- Responsive user interface

### Backend and Admin Features

- REST API architecture
- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Admin-protected routes
- Product management
- Promotion management
- Cart and checkout support
- Transaction and order tracking
- PostgreSQL database integration
- Cloudinary image upload support
- Postman API testing collection

---

## Project Structure

```txt
CoffeePK-FullStack-Commerce-Platform/
├── frontend/
│   ├── public/
│   ├── screenshots/
│   ├── src/
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
│
├── backend/
│   ├── public/
│   ├── src/
│   ├── ddl.sql
│   ├── index.js
│   ├── postman.json
│   ├── vercel.json
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
│
├── .gitignore
└── README.md
```

---

## Screenshots

### Home Page

![Home Page](frontend/screenshots/01-home-page.png)

### Products Page

![Products Page](frontend/screenshots/04-products-page.png)

### Product Details Page

![Product Details Page](frontend/screenshots/05-product-details-page.png)

### Cart Page

![Cart Page](frontend/screenshots/06-cart-page.png)

### Transaction History Page

![Transaction History Page](frontend/screenshots/07-transaction-history-page.png)

---

## Environment Setup

Both `frontend/` and `backend/` include `.env.example` files.

Create real `.env` files locally using those examples.

Do not commit real `.env` files to GitHub.

### Frontend `.env`

```env
REACT_APP_API_BASE_URL=http://localhost:8080
```

### Backend `.env`

```env
APP_NAME=CoffeePK
APP_PORT=8080

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=your_database_password
DB_NAME=jokopi_db

JWT_SECRET_KEY=your_jwt_secret_key

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
```

---

## Run Locally

### 1. Backend Setup

```bash
cd backend
npm install
npm start
```

Backend runs at:

```txt
http://localhost:8080
```

### 2. Frontend Setup

Open a second terminal:

```bash
cd frontend
npm install
npm start
```

Frontend usually runs at:

```txt
http://localhost:3000
```

---

## Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE jokopi_db;
```

Then run:

```txt
backend/ddl.sql
```

The schema creates the required tables for users, roles, products, categories, carts, promotions, transactions, payments, deliveries, status tracking, password reset, and user profiles.

---

## API Testing

The backend includes a Postman collection:

```txt
backend/postman.json
```

Import it into Postman to test authentication, products, carts, profiles, transactions, promotions, and admin-protected routes.

---

## Security Notes

- Real `.env` files are ignored by Git.
- Do not push database passwords, JWT secrets, or Cloudinary credentials.
- Use `.env.example` files for safe public configuration examples.
- Regenerate any credential that has ever been exposed publicly.

---

## Portfolio Value

This project demonstrates:

- Full-stack web development
- React frontend engineering
- Node.js and Express backend development
- PostgreSQL database integration
- REST API design
- Authentication and authorization
- Role-based access control
- Commerce workflow implementation
- Cart and checkout handling
- Transaction management
- Clean GitHub documentation
- Recruiter-friendly project structure

---

## Repository Sections

- `frontend/` contains the React customer interface.
- `backend/` contains the Express and PostgreSQL API.
- `backend/ddl.sql` contains the database schema.
- `backend/postman.json` contains API testing collection.
- `frontend/screenshots/` contains project screenshots.

---

## Author

**Shahzaib Safdar**  
BS Computer Science  
Air University, Islamabad  

GitHub: [Shahzaib891](https://github.com/Shahzaib891)