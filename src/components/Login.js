import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (credentials.username === 'jaky' && credentials.password === 'chacoviejonomas') {
      localStorage.setItem('jaky-logged-in', 'true');
      onLogin();
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <span className="logo-icon">📝</span>
            <span className="logo-text">JAKY</span>
          </div>
          <h1>Iniciar Sesión</h1>
          <p>Gestión Inteligente de Tareas</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Ingresa tu usuario"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>

        <div className="login-info">
          <p><strong>Credenciales de prueba:</strong></p>
          <p>Usuario: <code>jaky</code></p>
          <p>Contraseña: <code>chacoviejonomas</code></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
