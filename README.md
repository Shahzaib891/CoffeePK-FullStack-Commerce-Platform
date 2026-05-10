\# CoffeePK - Full-Stack Coffee Commerce Platform



CoffeePK is a full-stack coffee commerce platform built with React, Node.js, Express.js, and PostgreSQL. The system supports customer shopping workflows, authentication, product browsing, cart management, checkout, transaction history, admin operations, promotions, and role-based access control.



\---



\## Project Overview



CoffeePK demonstrates a complete full-stack commerce workflow. The frontend provides a responsive customer interface, while the backend handles authentication, database operations, protected routes, product data, promotions, and transaction management.



This project is structured for portfolio, internship, and recruiter review, with separate frontend and backend documentation, clean environment configuration, screenshots, and setup instructions.



\---



\## Tech Stack



\### Frontend



\- React

\- JavaScript

\- React Router

\- Redux Toolkit

\- Redux Persist

\- Axios

\- Tailwind CSS

\- DaisyUI

\- React Hot Toast



\### Backend



\- Node.js

\- Express.js

\- PostgreSQL

\- JWT Authentication

\- bcrypt

\- pg

\- CORS

\- Morgan

\- Multer

\- Cloudinary

\- Nodemailer



\---



\## Key Features



\### Customer Features



\- User registration and login

\- Product browsing

\- Product details view

\- Cart management

\- Checkout/order flow

\- Transaction history

\- Profile-related features

\- Responsive user interface



\### Backend and Admin Features



\- REST API architecture

\- JWT-based authentication

\- Role-based access control

\- Admin-protected routes

\- Product management

\- Promotion management

\- Transaction and order tracking

\- PostgreSQL database integration

\- Cloudinary image upload support



\---



\## Project Structure



```txt

CoffeePK-FullStack-Commerce-Platform/

├── frontend/

│   ├── public/

│   ├── screenshots/

│   ├── src/

│   ├── .env.example

│   ├── package.json

│   └── README.md

│

├── backend/

│   ├── public/

│   ├── src/

│   ├── ddl.sql

│   ├── index.js

│   ├── postman.json

│   ├── .env.example

│   ├── package.json

│   └── README.md

│

├── .gitignore

└── README.md

```



\---



\## Screenshots



\### Home Page



!\[Home Page](frontend/screenshots/01-home-page.png)



\### Products Page



!\[Products Page](frontend/screenshots/04-products-page.png)



\### Product Details Page



!\[Product Details Page](frontend/screenshots/05-product-details-page.png)



\### Cart Page



!\[Cart Page](frontend/screenshots/06-cart-page.png)



\### Transaction History Page



!\[Transaction History Page](frontend/screenshots/07-transaction-history-page.png)



\---



\## Environment Setup



Both frontend and backend include `.env.example` files.



Create real `.env` files locally using those examples.



Do not commit real `.env` files.



\---



\## Run Locally



\### 1. Backend Setup



```bash

cd backend

npm install

npm start

```



Backend runs at:



```txt

http://localhost:8080

```



\### 2. Frontend Setup



```bash

cd frontend

npm install

npm start

```



Frontend usually runs at:



```txt

http://localhost:3000

```



\---



\## Database Setup



Create a PostgreSQL database:



```sql

CREATE DATABASE jokopi\_db;

```



Then run:



```txt

backend/ddl.sql

```



This creates the required database tables for the application.



\---



\## API Testing



The backend includes a Postman collection:



```txt

backend/postman.json

```



Import it into Postman to test backend APIs.



\---



\## Portfolio Value



This project demonstrates:



\- Full-stack web development

\- React frontend engineering

\- Node.js and Express backend development

\- PostgreSQL database integration

\- Authentication and authorization

\- Role-based access control

\- REST API design

\- Cart and checkout workflows

\- Transaction management

\- Clean GitHub documentation

\- Recruiter-friendly project structure



\---



\## Author



\*\*Shahzaib Safdar\*\*  

BS Computer Science  

Air University, Islamabad  



GitHub: \[Shahzaib891](https://github.com/Shahzaib891)

