import React, { useState } from 'react';
import '../App.css';

function Login({ onSwitchToRegister, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Error al iniciar sesión');
      }
      localStorage.setItem('token', data.token);
      if (typeof onLoginSuccess === 'function') onLoginSuccess();
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión. Por favor, verifica tus credenciales.');
    }
  };

  return (
    <div className="auth-container">
      <h1>PetConnect 🐾</h1>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="loginEmail">Email</label>
          <input
            type="email"
            id="loginEmail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="loginPassword">Contraseña</label>
          <input
            type="password"
            id="loginPassword"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
        <div className="switch-form">
          ¿No tienes cuenta? <span className="link" onClick={onSwitchToRegister} style={{ color: "#4cd964", cursor: "pointer", textDecoration: "underline", fontWeight: "bold" }}>Regístrate</span>
        </div>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default Login;
