import React, { useState } from 'react';
import { useTodos } from '../context/TodoContext';
import './SettingsPage.css';

const SettingsPage = () => {
  const { settings, categories, addCategory, updateSettings } = useTodos();
  const [localSettings, setLocalSettings] = useState(settings);
  const [newCategory, setNewCategory] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  // Sincronizar localSettings con settings del contexto cuando cambien
  React.useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleSettingChange = (key, value) => {
    const updatedSettings = {
      ...localSettings,
      [key]: value
    };
    setLocalSettings(updatedSettings);
  };

  const handleSave = () => {
    updateSettings(localSettings);
    localStorage.setItem('jaky-settings', JSON.stringify(localSettings));
    alert('Configuración guardada exitosamente');
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      addCategory(newCategory.trim());
      setNewCategory('');
      setShowAddCategory(false);
      alert('Categoría agregada exitosamente');
    } else if (categories.includes(newCategory.trim())) {
      alert('Esta categoría ya existe');
    }
  };

  const tabs = [
    { id: 'general', name: 'General', icon: '⚙️' },
    { id: 'data', name: 'Datos', icon: '💾' },
    { id: 'about', name: 'Acerca de', icon: 'ℹ️' }
  ];

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>⚙️ Configuración</h1>
        <p>Personaliza tu experiencia con JAKY</p>
      </div>

      <div className="settings-container">
        <div className="settings-sidebar">
          <nav className="settings-nav">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-name">{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="settings-content">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="settings-section">
              <h2>Configuración General</h2>
              
              <div className="setting-group">
                <h3>Preferencias</h3>
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
              </div>
            </div>
          )}

          {/* Data Settings */}
          {activeTab === 'data' && (
            <div className="settings-section">
              <h2>Gestión de Datos</h2>
              
              <div className="setting-group">
                <h3>Categorías</h3>
                <div className="categories-list">
                  {categories.map(category => (
                    <div key={category} className="category-item">
                      <span className="category-name">{category}</span>
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
                    <button className="add-category-button" onClick={handleAddCategory}>
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

              <div className="setting-group danger-zone">
                <h3>Zona de Peligro</h3>
                <p>Esta acción es irreversible</p>
                <button 
                  className="danger-button" 
                  onClick={() => {
                    if (window.confirm('¿Estás seguro de que quieres eliminar todos los datos? Esta acción no se puede deshacer.')) {
                      localStorage.removeItem('jaky-todos-advanced');
                      localStorage.removeItem('jaky-settings');
                      alert('Datos eliminados exitosamente');
                      window.location.reload();
                    }
                  }}
                >
                  🗑️ Eliminar todos los datos
                </button>
              </div>
            </div>
          )}

          {/* About Settings */}
          {activeTab === 'about' && (
            <div className="settings-section">
              <h2>Acerca de JAKY</h2>
              
              <div className="about-content">
                <div className="app-info">
                  <div className="app-logo">
                    <span className="logo-icon">📝</span>
                    <span className="logo-text">JAKY</span>
                  </div>
                  <div className="app-details">
                    <h3>JAKY Tasks</h3>
                    <p>Versión 2.0.0</p>
                    <p>Gestión Inteligente de Tareas</p>
                  </div>
                </div>

                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Desarrollado por:</span>
                    <span className="info-value">Equipo JAKY</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Institución:</span>
                    <span className="info-value">E.E.T. N°24 "Simón de Iriondo"</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Ubicación:</span>
                    <span className="info-value">Resistencia, Chaco</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Programa:</span>
                    <span className="info-value">Generación T</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Año:</span>
                    <span className="info-value">2024</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Tecnologías:</span>
                    <span className="info-value">React, JavaScript, CSS3</span>
                  </div>
                </div>

                <div className="team-info">
                  <h4>Equipo de Desarrollo:</h4>
                  <div className="team-grid">
                    <div className="team-member">
                      <span className="member-initial">J</span>
                      <span className="member-name">Joaquín</span>
                    </div>
                    <div className="team-member">
                      <span className="member-initial">A</span>
                      <span className="member-name">Augusto</span>
                    </div>
                    <div className="team-member">
                      <span className="member-initial">K</span>
                      <span className="member-name">Kevin</span>
                    </div>
                    <div className="team-member">
                      <span className="member-initial">Y</span>
                      <span className="member-name">Yamil</span>
                    </div>
                  </div>
                </div>

                <div className="features-list">
                  <h4>Características principales:</h4>
                  <ul>
                    <li>✅ Gestión avanzada de tareas</li>
                    <li>📊 Dashboard con estadísticas</li>
                    <li>📅 Vista de calendario</li>
                    <li>📈 Análisis de productividad</li>
                    <li>⚙️ Configuración personalizable</li>
                    <li>📱 Diseño responsivo</li>
                    <li>💾 Persistencia local</li>
                    <li>🎨 Interfaz moderna</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="settings-footer">
            <button className="save-button" onClick={handleSave}>
              💾 Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
