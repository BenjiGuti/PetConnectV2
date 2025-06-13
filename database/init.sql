-- Active: 1749696429063@@127.0.0.1@5432@petconnect

CREATE TABLE Usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Mascotas (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    breed VARCHAR(50),
    age INTEGER,
    description TEXT,
    owner_id INTEGER REFERENCES Usuarios(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Comentarios (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Usuarios(id),
    pet_id INTEGER REFERENCES Mascotas(id),
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
