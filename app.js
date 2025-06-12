const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

const users = [];
const pets = [];

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
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }
    
    if (users.some(u => u.email === email)) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = {
      id: users.length + 1,
      email,
      password: hashedPassword
    };
    
    users.push(user);
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
    
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    const token = jwt.sign({ id: user.id, email: user.email }, 'secreto_seguro', { expiresIn: '1h' });
    
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