import React from 'react';
import { useTodos } from '../context/TodoContext';
import './Analytics.css';

const Analytics = () => {
  const { getStats, todos } = useTodos();
  const stats = getStats();

  const getProductivityData = () => {
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);
    
    const completedLast30Days = todos.filter(todo => 
      todo.completed && 
      todo.completedAt && 
      new Date(todo.completedAt) >= last30Days
    ).length;
    
    const createdLast30Days = todos.filter(todo => 
      new Date(todo.createdAt) >= last30Days
    ).length;
    
    return {
      completed: completedLast30Days,
      created: createdLast30Days,
      completionRate: createdLast30Days > 0 ? Math.round((completedLast30Days / createdLast30Days) * 100) : 0
    };
  };

  const getOverdueTasks = () => {
    const now = new Date();
    return todos.filter(todo => 
      !todo.completed && 
      todo.dueDate && 
      new Date(todo.dueDate) < now
    );
  };

  const getTasksWithoutDueDate = () => {
    return todos.filter(todo => !todo.dueDate && !todo.completed);
  };

  const getAverageCompletionTime = () => {
    const completedTasks = todos.filter(todo => todo.completed && todo.completedAt);
    if (completedTasks.length === 0) return 0;
    
    const totalDays = completedTasks.reduce((acc, todo) => {
      const created = new Date(todo.createdAt);
      const completed = new Date(todo.completedAt);
      const diffTime = Math.abs(completed - created);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return acc + diffDays;
    }, 0);
    
    return Math.round(totalDays / completedTasks.length);
  };

  const getMostProductiveDay = () => {
    const dayStats = {};
    todos.forEach(todo => {
      if (todo.completed && todo.completedAt) {
        const day = new Date(todo.completedAt).toLocaleDateString('es-ES', { weekday: 'long' });
        dayStats[day] = (dayStats[day] || 0) + 1;
      }
    });
    
    const mostProductive = Object.entries(dayStats).reduce((a, b) => 
      dayStats[a[0]] > dayStats[b[0]] ? a : b, ['Ninguno', 0]
    );
    
    return mostProductive;
  };

  const getCompletionTrend = () => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);
      
      const completed = todos.filter(todo => 
        todo.completed && 
        todo.completedAt && 
        new Date(todo.completedAt) >= dayStart && 
        new Date(todo.completedAt) < dayEnd
      ).length;
      
      const created = todos.filter(todo => 
        new Date(todo.createdAt) >= dayStart && 
        new Date(todo.createdAt) < dayEnd
      ).length;
      
      last7Days.push({
        date: date.toLocaleDateString('es-ES', { weekday: 'short' }),
        completed,
        created,
        efficiency: created > 0 ? Math.round((completed / created) * 100) : 0
      });
    }
    return last7Days;
  };

  const getCategoryDistribution = () => {
    const categories = {};
    todos.forEach(todo => {
      categories[todo.category] = (categories[todo.category] || 0) + 1;
    });
    return categories;
  };

  const getPriorityDistribution = () => {
    const priorities = {};
    todos.forEach(todo => {
      priorities[todo.priority] = (priorities[todo.priority] || 0) + 1;
    });
    return priorities;
  };

  const productivityData = getProductivityData();
  const overdueTasks = getOverdueTasks();
  const tasksWithoutDueDate = getTasksWithoutDueDate();
  const averageCompletionTime = getAverageCompletionTime();
  const mostProductiveDay = getMostProductiveDay();
  const completionTrend = getCompletionTrend();
  const categoryData = getCategoryDistribution();
  const priorityData = getPriorityDistribution();

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <h1>📈 Análisis de Productividad</h1>
        <p>Insights detallados para mejorar tu rendimiento</p>
      </div>

      {/* Overview Cards */}
      <div className="overview-cards">
        <div className="overview-card">
          <div className="card-icon">📊</div>
          <div className="card-content">
            <div className="card-number">{stats.total}</div>
            <div className="card-label">Total Tareas</div>
          </div>
        </div>
        <div className="overview-card">
          <div className="card-icon">✅</div>
          <div className="card-content">
            <div className="card-number">{stats.completed}</div>
            <div className="card-label">Completadas</div>
          </div>
        </div>
        <div className="overview-card">
          <div className="card-icon">⏳</div>
          <div className="card-content">
            <div className="card-number">{stats.active}</div>
            <div className="card-label">Pendientes</div>
          </div>
        </div>
        <div className="overview-card">
          <div className="card-icon">⚠️</div>
          <div className="card-content">
            <div className="card-number">{overdueTasks.length}</div>
            <div className="card-label">Vencidas</div>
          </div>
        </div>
      </div>

      <div className="analytics-grid">
        {/* Completion Trend */}
        <div className="analytics-card">
          <div className="card-header">
            <h3>📈 Tendencia de Eficiencia</h3>
            <span className="card-subtitle">Últimos 7 días</span>
          </div>
          <div className="card-content">
            <div className="trend-chart">
              {completionTrend.map((day, index) => (
                <div key={index} className="trend-bar">
                  <div 
                    className="bar-fill"
                    style={{ 
                      height: `${Math.max((day.efficiency / 100) * 100, 5)}%` 
                    }}
                  ></div>
                  <div className="bar-label">{day.date}</div>
                  <div className="bar-value">{day.efficiency}%</div>
                  <div className="bar-details">
                    <small>{day.completed}/{day.created}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Productivity Insights */}
        <div className="analytics-card insights-card">
          <div className="card-header">
            <h3>💡 Insights de Productividad</h3>
            <span className="card-subtitle">Recomendaciones personalizadas</span>
          </div>
          <div className="card-content">
            <div className="insights-list">
              {stats.completionRate > 80 && (
                <div className="insight-item positive">
                  <span className="insight-icon">🎉</span>
                  <span className="insight-text">¡Excelente! Tienes una alta tasa de completado ({stats.completionRate}%)</span>
                </div>
              )}
              {overdueTasks.length > 0 && (
                <div className="insight-item warning">
                  <span className="insight-icon">⚠️</span>
                  <span className="insight-text">Tienes {overdueTasks.length} tareas vencidas. ¡Ponete al día!</span>
                </div>
              )}
              {tasksWithoutDueDate.length > 0 && (
                <div className="insight-item info">
                  <span className="insight-icon">📅</span>
                  <span className="insight-text">{tasksWithoutDueDate.length} tareas sin fecha límite. Agregá fechas para mejor organización</span>
                </div>
              )}
              {averageCompletionTime > 0 && (
                <div className="insight-item info">
                  <span className="insight-icon">⏱️</span>
                  <span className="insight-text">Promedio de {averageCompletionTime} días para completar tareas</span>
                </div>
              )}
              {mostProductiveDay[1] > 0 && (
                <div className="insight-item positive">
                  <span className="insight-icon">🚀</span>
                  <span className="insight-text">Tu día más productivo: {mostProductiveDay[0]} ({mostProductiveDay[1]} tareas)</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="analytics-card">
          <div className="card-header">
            <h3>📂 Distribución por Categoría</h3>
            <span className="card-subtitle">Tareas por categoría</span>
          </div>
          <div className="card-content">
            <div className="distribution-list">
              {Object.entries(categoryData).map(([category, count]) => (
                <div key={category} className="distribution-item">
                  <div className="item-label">{category}</div>
                  <div className="item-bar">
                    <div 
                      className="item-fill"
                      style={{ 
                        width: `${(count / stats.total) * 100}%` 
                      }}
                    ></div>
                  </div>
                  <div className="item-value">{count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="analytics-card">
          <div className="card-header">
            <h3>⚡ Distribución por Prioridad</h3>
            <span className="card-subtitle">Tareas por prioridad</span>
          </div>
          <div className="card-content">
            <div className="priority-grid">
              {Object.entries(priorityData).map(([priority, count]) => (
                <div key={priority} className={`priority-item priority-${priority.toLowerCase()}`}>
                  <div className="priority-label">{priority}</div>
                  <div className="priority-count">{count}</div>
                  <div className="priority-percentage">
                    {Math.round((count / stats.total) * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Overdue Tasks */}
        {overdueTasks.length > 0 && (
          <div className="analytics-card overdue-card">
            <div className="card-header">
              <h3>⚠️ Tareas Vencidas</h3>
              <span className="card-subtitle">Requieren atención inmediata</span>
            </div>
            <div className="card-content">
              <div className="overdue-list">
                {overdueTasks.slice(0, 5).map(todo => (
                  <div key={todo.id} className="overdue-item">
                    <div className="overdue-text">{todo.text}</div>
                    <div className="overdue-meta">
                      <span className="overdue-category">{todo.category}</span>
                      <span className="overdue-date">
                        Vencida: {new Date(todo.dueDate).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                  </div>
                ))}
                {overdueTasks.length > 5 && (
                  <div className="overdue-more">
                    +{overdueTasks.length - 5} tareas más vencidas
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
