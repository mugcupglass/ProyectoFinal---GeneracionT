import React, { useState } from 'react';
import './Header.css';
import Settings from './Settings';

const Header = () => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-main">
          <h1 className="header-title">
            <span className="header-icon">📝</span>
            JAKY To-Do List
          </h1>
          <p className="header-subtitle">
            Organiza tus tareas de manera eficiente
          </p>
        </div>
        
        <div className="header-actions">
          <div className="header-badge">
            <span>Generación T - Stream BE</span>
          </div>
          <button 
            className="settings-button"
            onClick={() => setShowSettings(true)}
            aria-label="Configuración"
          >
            ⚙️
          </button>
        </div>
      </div>

      {showSettings && (
        <Settings 
          isOpen={showSettings} 
          onClose={() => setShowSettings(false)} 
        />
      )}
    </header>
  );
};

export default Header;
