import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTodos } from '../context/TodoContext';
import './Layout.css';

const Layout = ({ children, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { settings, updateSettings } = useTodos();
  const location = useLocation();
  const darkMode = settings.theme === 'dark';

  const toggleDarkMode = () => {
    const newTheme = darkMode ? 'light' : 'dark';
    updateSettings({ theme: newTheme });
  };

  const menuItems = [
    {
      path: '/',
      name: 'Dashboard',
      icon: '📊',
      description: 'Vista general de tareas'
    },
    {
      path: '/todos',
      name: 'Mis Tareas',
      icon: '📝',
      description: 'Gestionar todas las tareas'
    },
    {
      path: '/analytics',
      name: 'Analytics',
      icon: '📈',
      description: 'Estadísticas y reportes'
    },
    {
      path: '/calendar',
      name: 'Calendario',
      icon: '📅',
      description: 'Vista de calendario'
    },
    {
      path: '/settings',
      name: 'Configuración',
      icon: '⚙️',
      description: 'Ajustes y preferencias'
    },
    {
      path: '/profile',
      name: 'Perfil',
      icon: '👤',
      description: 'Información personal'
    }
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className={`layout ${darkMode ? 'dark-mode' : ''}`}>
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-icon">📝</span>
            <span className="logo-text">JAKY</span>
          </div>
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? '✕' : '☰'}
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              <div className="nav-content">
                <span className="nav-name">{item.name}</span>
                <span className="nav-description">{item.description}</span>
              </div>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">👤</div>
            <div className="user-details">
              <span className="user-name">Usuario JAKY</span>
              <span className="user-role">Generación T</span>
            </div>
          </div>
          <button className="logout-button" onClick={onLogout}>
            🚪 Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Bar */}
        <header className="top-bar">
          <div className="top-bar-left">
            <button 
              className="mobile-menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
            <h1 className="page-title">
              {menuItems.find(item => isActive(item.path))?.name || 'Dashboard'}
            </h1>
          </div>
          <div className="top-bar-right">
            <div className="top-bar-actions">
              <button 
                className="action-button theme-button"
                onClick={toggleDarkMode}
                title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="page-content">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
