import React, { useState } from 'react';
import { useTodos } from '../context/TodoContext';
import './Settings.css';

const Settings = ({ isOpen, onClose }) => {
  const { settings, categories, priorities } = useTodos();
  const [localSettings, setLocalSettings] = useState(settings);
  const [newCategory, setNewCategory] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);

  const handleSettingChange = (key, value) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    // Aquí se guardarían las configuraciones
    localStorage.setItem('jaky-settings', JSON.stringify(localSettings));
    onClose();
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      // Aquí se agregaría la nueva categoría
      setNewCategory('');
      setShowAddCategory(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="settings-overlay">
      <div className="settings-container">
        <div className="settings-header">
          <h2>Configuración</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="settings-content">
          <div className="settings-section">
            <h3>Preferencias Generales</h3>
            <div className="setting-item">
              <label className="setting-label">
                <input
                  type="checkbox"
                  checked={localSettings.autoSave}
                  onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
                  className="setting-checkbox"
                />
                <span className="setting-text">Guardado automático</span>
              </label>
              <p className="setting-description">
                Guarda automáticamente los cambios en el navegador
              </p>
            </div>

            <div className="setting-item">
              <label className="setting-label">
                <input
                  type="checkbox"
                  checked={localSettings.notifications}
                  onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                  className="setting-checkbox"
                />
                <span className="setting-text">Notificaciones</span>
              </label>
              <p className="setting-description">
                Recibe notificaciones para tareas vencidas
              </p>
            </div>

            <div className="setting-item">
              <label className="setting-label">
                <input
                  type="checkbox"
                  checked={localSettings.animations}
                  onChange={(e) => handleSettingChange('animations', e.target.checked)}
                  className="setting-checkbox"
                />
                <span className="setting-text">Animaciones</span>
              </label>
              <p className="setting-description">
                Habilita animaciones y transiciones suaves
              </p>
            </div>

            <div className="setting-item">
              <label className="setting-label">
                <input
                  type="checkbox"
                  checked={localSettings.compactMode}
                  onChange={(e) => handleSettingChange('compactMode', e.target.checked)}
                  className="setting-checkbox"
                />
                <span className="setting-text">Modo compacto</span>
              </label>
              <p className="setting-description">
                Reduce el espaciado para mostrar más contenido
              </p>
            </div>
          </div>

          <div className="settings-section">
            <h3>Gestión de Datos</h3>
            <div className="data-actions">
              <button className="action-button export-button">
                📤 Exportar datos
              </button>
              <button className="action-button import-button">
                📥 Importar datos
              </button>
              <button className="action-button clear-button">
                🗑️ Limpiar todos los datos
              </button>
            </div>
          </div>

          <div className="settings-section">
            <h3>Categorías</h3>
            <div className="categories-list">
              {categories.map(category => (
                <div key={category} className="category-item">
                  <span className="category-name">{category}</span>
                  <button className="remove-category">✕</button>
                </div>
              ))}
            </div>
            
            {showAddCategory ? (
              <div className="add-category-form">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Nombre de la categoría"
                  className="category-input"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                />
                <button 
                  className="add-category-button"
                  onClick={handleAddCategory}
                >
                  Agregar
                </button>
                <button 
                  className="cancel-category-button"
                  onClick={() => {
                    setNewCategory('');
                    setShowAddCategory(false);
                  }}
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <button 
                className="add-category-trigger"
                onClick={() => setShowAddCategory(true)}
              >
                + Agregar categoría
              </button>
            )}
          </div>

          <div className="settings-section">
            <h3>Información de la Aplicación</h3>
            <div className="app-info">
              <div className="info-item">
                <span className="info-label">Versión:</span>
                <span className="info-value">2.0.0</span>
              </div>
              <div className="info-item">
                <span className="info-label">Desarrollado por:</span>
                <span className="info-value">Equipo JAKY</span>
              </div>
              <div className="info-item">
                <span className="info-label">Programa:</span>
                <span className="info-value">Generación T - Stream BE</span>
              </div>
            </div>
          </div>
        </div>

        <div className="settings-footer">
          <button className="cancel-button" onClick={onClose}>
            Cancelar
          </button>
          <button className="save-button" onClick={handleSave}>
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
