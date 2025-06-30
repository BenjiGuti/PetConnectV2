const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();
const { Pool } = require('pg');
const app = express();
const PORT = 3000;
const cors = require('cors');

// Permitir solicitudes desde el frontend (ajusta el puerto si es necesario)
app.use(cors({
  origin: 'http://localhost:3001', // o el puerto donde corre tu React
  credentials: true // si usas cookies/sesiones
}));

app.use(express.json());
app.use(express.static('../frontend/public'));

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, 'secreto_seguro', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email y contraseña son requeridos' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id',
      [username, email, hashedPassword]
    );
    res.status(201).json({ id: result.rows[0].id });
  } catch (err) {
    console.error('Error en /api/register:', err);
    if (err.code === '23505') {
      res.status(400).json({ error: 'El email ya está registrado' });
    } else {
      res.status(500).json({ error: 'Error en el servidor' });
    }
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    if (!user.rows[0] || !(await bcrypt.compare(password, user.rows[0].password))) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const dbUser = user.rows[0];
    const token = jwt.sign({ id: dbUser.id, email: dbUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

app.get('/api/profile', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});


app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});