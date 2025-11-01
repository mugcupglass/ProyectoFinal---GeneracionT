import React, { useState } from 'react';
import { useTodos } from '../context/TodoContext';
import './Profile.css';

const Profile = () => {
  const { getStats, todos } = useTodos();
  const [activeTab, setActiveTab] = useState('overview');
  const stats = getStats();

  const getUserStats = () => {
    const totalTimeSpent = todos.reduce((acc, todo) => acc + (todo.timeSpent || 0), 0);
    const averageCompletionTime = stats.completed > 0 ? totalTimeSpent / stats.completed : 0;
    
    return {
      totalTimeSpent,
      averageCompletionTime,
      longestStreak: 7, // Placeholder
      currentStreak: 3, // Placeholder
      favoriteCategory: getFavoriteCategory(),
      mostProductiveDay: getMostProductiveDay()
    };
  };

  const getFavoriteCategory = () => {
    const categories = {};
    todos.forEach(todo => {
      if (todo.completed) {
        categories[todo.category] = (categories[todo.category] || 0) + 1;
      }
    });
    
    return Object.entries(categories).reduce((a, b) => 
      categories[a[0]] > categories[b[0]] ? a : b, ['Personal', 0]
    )[0];
  };

  const getMostProductiveDay = () => {
    const days = {};
    todos.forEach(todo => {
      if (todo.completedAt) {
        const day = new Date(todo.completedAt).toLocaleDateString('es-ES', { weekday: 'long' });
        days[day] = (days[day] || 0) + 1;
      }
    });
    
    return Object.entries(days).reduce((a, b) => 
      days[a[0]] > days[b[0]] ? a : b, ['Lunes', 0]
    )[0];
  };

  const getRecentAchievements = () => {
    const achievements = [];
    
    if (stats.completed >= 10) {
      achievements.push({
        title: 'Primeros Pasos',
        description: 'Completaste 10 tareas',
        icon: '🎯',
        unlocked: true
      });
    }
    
    if (stats.completed >= 50) {
      achievements.push({
        title: 'Productivo',
        description: 'Completaste 50 tareas',
        icon: '🚀',
        unlocked: true
      });
    }
    
    if (stats.completionRate >= 80) {
      achievements.push({
        title: 'Eficiente',
        description: 'Mantienes una tasa de completado del 80%',
        icon: '⭐',
        unlocked: true
      });
    }
    
    if (stats.total >= 100) {
      achievements.push({
        title: 'Organizado',
        description: 'Creaste 100 tareas',
        icon: '📝',
        unlocked: true
      });
    }
    
    return achievements;
  };

  const getProductivityInsights = () => {
    const insights = [];
    
    if (stats.completionRate > 80) {
      insights.push({
        type: 'positive',
        title: '¡Excelente trabajo!',
        message: 'Tu tasa de completado es muy alta. ¡Sigue así!',
        icon: '🎉'
      });
    }
    
    if (stats.overdue > 0) {
      insights.push({
        type: 'warning',
        title: 'Tareas vencidas',
        message: `Tienes ${stats.overdue} tareas vencidas. ¡Ponete al día!`,
        icon: '⚠️'
      });
    }
    
    if (stats.active > 20) {
      insights.push({
        type: 'info',
        title: 'Muchas tareas pendientes',
        message: 'Considera priorizar tus tareas para mantener el enfoque.',
        icon: '📝'
      });
    }
    
    return insights;
  };

  const userStats = getUserStats();
  const achievements = getRecentAchievements();
  const insights = getProductivityInsights();

  const tabs = [
    { id: 'overview', name: 'Resumen', icon: '📊' },
    { id: 'achievements', name: 'Logros', icon: '🏆' },
    { id: 'insights', name: 'Insights', icon: '💡' },
    { id: 'preferences', name: 'Preferencias', icon: '⚙️' }
  ];

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-circle">
            <span className="avatar-text">UJ</span>
          </div>
        </div>
        <div className="profile-info">
          <h1>Usuario JAKY</h1>
          <p>Miembro de Generación T - Stream BE</p>
          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-number">{stats.total}</span>
              <span className="stat-label">Tareas</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.completed}</span>
              <span className="stat-label">Completadas</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.completionRate}%</span>
              <span className="stat-label">Eficiencia</span>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`profile-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-name">{tab.name}</span>
            </button>
          ))}
        </div>

        <div className="profile-tab-content">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="overview-content">
              <div className="overview-grid">
                <div className="overview-card">
                  <h3>📈 Estadísticas Generales</h3>
                  <div className="stats-list">
                    <div className="stat-row">
                      <span className="stat-label">Tiempo total invertido:</span>
                      <span className="stat-value">{Math.round(userStats.totalTimeSpent / 60)} horas</span>
                    </div>
                    <div className="stat-row">
                      <span className="stat-label">Tiempo promedio por tarea:</span>
                      <span className="stat-value">{Math.round(userStats.averageCompletionTime)} min</span>
                    </div>
                    <div className="stat-row">
                      <span className="stat-label">Categoría favorita:</span>
                      <span className="stat-value">{userStats.favoriteCategory}</span>
                    </div>
                    <div className="stat-row">
                      <span className="stat-label">Día más productivo:</span>
                      <span className="stat-value">{userStats.mostProductiveDay}</span>
                    </div>
                  </div>
                </div>

                <div className="overview-card">
                  <h3>🎯 Objetivos</h3>
                  <div className="goals-list">
                    <div className="goal-item">
                      <div className="goal-progress">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill"
                            style={{ width: `${Math.min((stats.completed / 100) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <span className="progress-text">{stats.completed}/100</span>
                      </div>
                      <span className="goal-label">Completar 100 tareas</span>
                    </div>
                    <div className="goal-item">
                      <div className="goal-progress">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill"
                            style={{ width: `${Math.min((stats.completionRate / 90) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <span className="progress-text">{stats.completionRate}%/90%</span>
                      </div>
                      <span className="goal-label">Mantener 90% de eficiencia</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div className="achievements-content">
              <h3>🏆 Logros Desbloqueados</h3>
              <div className="achievements-grid">
                {achievements.map((achievement, index) => (
                  <div key={index} className="achievement-card">
                    <div className="achievement-icon">{achievement.icon}</div>
                    <div className="achievement-content">
                      <h4>{achievement.title}</h4>
                      <p>{achievement.description}</p>
                    </div>
                    <div className="achievement-status">
                      {achievement.unlocked ? '✅' : '🔒'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Insights Tab */}
          {activeTab === 'insights' && (
            <div className="insights-content">
              <h3>💡 Insights de Productividad</h3>
              <div className="insights-list">
                {insights.map((insight, index) => (
                  <div key={index} className={`insight-card ${insight.type}`}>
                    <div className="insight-icon">{insight.icon}</div>
                    <div className="insight-content">
                      <h4>{insight.title}</h4>
                      <p>{insight.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="preferences-content">
              <h3>⚙️ Preferencias Personales</h3>
              <div className="preferences-grid">
                <div className="preference-card">
                  <h4>🎨 Tema</h4>
                  <div className="theme-options">
                    <label className="theme-option">
                      <input type="radio" name="theme" value="light" defaultChecked />
                      <span>Claro</span>
                    </label>
                    <label className="theme-option">
                      <input type="radio" name="theme" value="dark" />
                      <span>Oscuro</span>
                    </label>
                  </div>
                </div>

                <div className="preference-card">
                  <h4>🔔 Notificaciones</h4>
                  <div className="notification-options">
                    <label className="notification-option">
                      <input type="checkbox" defaultChecked />
                      <span>Recordatorios de tareas</span>
                    </label>
                    <label className="notification-option">
                      <input type="checkbox" />
                      <span>Resumen diario</span>
                    </label>
                    <label className="notification-option">
                      <input type="checkbox" />
                      <span>Logros desbloqueados</span>
                    </label>
                  </div>
                </div>

                <div className="preference-card">
                  <h4>📊 Dashboard</h4>
                  <div className="dashboard-options">
                    <label className="dashboard-option">
                      <input type="checkbox" defaultChecked />
                      <span>Mostrar estadísticas</span>
                    </label>
                    <label className="dashboard-option">
                      <input type="checkbox" defaultChecked />
                      <span>Mostrar gráficos</span>
                    </label>
                    <label className="dashboard-option">
                      <input type="checkbox" />
                      <span>Modo compacto</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
