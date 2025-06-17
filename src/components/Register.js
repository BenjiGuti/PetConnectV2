import React, { useState } from 'react';
import '../App.css';

function Register({ onSwitchToLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!username || !email || !password || !confirmPassword) {
      setError('Todos los campos son requeridos');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Error al registrar');
      }
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      alert('¡Registro exitoso! Por favor inicia sesión.');
      if (typeof onSwitchToLogin === 'function') onSwitchToLogin();
    } catch (err) {
      setError(err.message || 'Error al registrar. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="auth-container">
      <h1>PetConnect 🐾</h1>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="registerUsername">Nombre de usuario</label>
          <input
            type="text"
            id="registerUsername"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="registerEmail">Email</label>
          <input
            type="email"
            id="registerEmail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="registerPassword">Contraseña</label>
          <input
            type="password"
            id="registerPassword"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrarse</button>
        <div className="switch-form">
          ¿Ya tienes cuenta? <span className="link" onClick={onSwitchToLogin} style={{ color: "#4cd964", cursor: "pointer", textDecoration: "underline", fontWeight: "bold" }}>Inicia Sesión</span>
        </div>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default Register;
