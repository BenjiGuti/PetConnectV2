-- Active: 1749749127171@@127.0.0.1@5432@petconnect
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS dog_profiles (
  id SERIAL PRIMARY KEY,
  owner_id INTEGER REFERENCES users(id),
  name VARCHAR(50) NOT NULL,
  breed VARCHAR(50),
  age INTEGER,
  size VARCHAR(20),
  sex VARCHAR(10),
  description TEXT,
  pedigree BOOLEAN,
  interests TEXT,
  profile_picture VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);