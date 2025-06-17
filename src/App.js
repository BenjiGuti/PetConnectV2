import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import PetForm from './components/PetForm';
import Tinder from './components/Tinder';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginWithRedirect />} />
          <Route path="/login" element={<LoginWithRedirect />} />
          <Route path="/register" element={<RegisterWithRedirect />} />
          <Route path="/petform" element={<PetForm />} />
          <Route path="/tinder" element={<Tinder />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

// Envolvemos Login y Register para usar navigate en vez de window.location.href
function LoginWithRedirect() {
  const navigate = useNavigate();
  return <Login onSwitchToRegister={() => navigate('/register')} onLoginSuccess={() => navigate('/petform')} />;
}
function RegisterWithRedirect() {
  const navigate = useNavigate();
  return <Register onSwitchToLogin={() => navigate('/login')} />;
}

export default App;
