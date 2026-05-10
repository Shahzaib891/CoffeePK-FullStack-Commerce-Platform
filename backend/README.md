\# CoffeePK Backend



CoffeePK Backend is the Node.js, Express.js, and PostgreSQL API layer for the CoffeePK full-stack coffee commerce platform. It handles authentication, role-based access control, product operations, promotions, cart workflows, profile data, and transaction management.



\---



\## Tech Stack



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

\- dotenv



\---



\## Features



\- User registration and login

\- JWT-based authentication

\- Role-based access control

\- Admin-protected routes

\- Product management

\- Promotion management

\- Cart and checkout support

\- Transaction and order tracking

\- User profile support

\- PostgreSQL database integration

\- Cloudinary image upload support

\- Postman collection for API testing



\---



\## Folder Structure



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



\---



\## Environment Variables



Create a `.env` file in the backend root directory.



Use `.env.example` as a reference:



```env

APP\_NAME=CoffeePK

APP\_PORT=8080



DB\_HOST=localhost

DB\_PORT=5432

DB\_USER=postgres

DB\_PASS=your\_database\_password

DB\_NAME=jokopi\_db



JWT\_SECRET\_KEY=your\_jwt\_secret\_key



CLOUDINARY\_NAME=your\_cloudinary\_name

CLOUDINARY\_KEY=your\_cloudinary\_key

CLOUDINARY\_SECRET=your\_cloudinary\_secret

```



The real `.env` file should not be committed to GitHub.



\---



\## Database Setup



Create a PostgreSQL database:



```sql

CREATE DATABASE jokopi\_db;

```



Then run the SQL script:



```txt

ddl.sql

```



This script creates the required database tables for users, roles, products, categories, carts, promotions, transactions, payments, delivery, status, and user profiles.



\---



\## Installation and Setup



Install dependencies:



```bash

npm install

```



Start the backend:



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



\---



\## API Testing



A Postman collection is included:



```txt

postman.json

```



Import this file into Postman to test authentication, products, transactions, and admin routes.



\---



\## Security Notes



The real `.env` file is ignored by Git and must not be pushed to GitHub. Use `.env.example` only to show required environment variable names without exposing private credentials.



\---



\## Author



\*\*Shahzaib Safdar\*\*  

BS Computer Science  

Air University, Islamabad  



GitHub: \[Shahzaib891](https://github.com/Shahzaib891)

