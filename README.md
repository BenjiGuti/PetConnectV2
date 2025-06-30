Clone the repository
git clone (https://github.com/BenjiGuti/PetConnectV2.git) cd petconnect-frontend

Install dependencies
Frontend:

cd ../petconnect-frontend npm install

Backend:

cd ../petconnect-simple/backend npm install

Configure environment variables
Create a .env file in the backend folder with your database and JWT settings, for example:

PGUSER=postgres PGPASSWORD=your_password PGDATABASE=petconnect PGHOST=localhost PGPORT=5432 JWT_SECRET=your_jwt_secret

Initialize the database
Make sure PostgreSQL is running and create the database petconnect. Run the SQL script in petconnect-simple/database/init.sql to create the required tables.

Start the servers
Backend:

cd ../petconnect-simple/backend node app.js

Frontend:

cd ../petconnect-frontend npm start

Access the app Login/Registration: http://localhost:3001
User Profile: Accessible after login in the frontend

Dog Tinder (Swipe): Navigate to the Tinder section after logging in

Notes for the three-layer migration The backend is a standalone Express API, only serving data (not static HTML). The frontend is a React SPA, communicating with the backend via REST API. CORS is properly configured to allow requests from the frontend to the backend. All sensitive configuration is managed via environment variables. Database schema is managed in init.sql c:\Users\benji\Desktop\U.N.S.T.A\Desarrollo Web\petconnect-simple\database\init.sql and can be adapted as needed.
