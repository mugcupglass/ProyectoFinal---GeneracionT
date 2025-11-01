import React from 'react';
import { useTodos } from '../context/TodoContext';
import AdvancedDashboard from '../components/AdvancedDashboard';
import MotivationalWidget from '../components/MotivationalWidget';
import './Dashboard.css';

const Dashboard = () => {
  const { getStats, getFilteredTodos } = useTodos();
  const stats = getStats();
  const todos = getFilteredTodos();

  const getRecentTodos = () => {
    return todos
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  };

  const getUpcomingTodos = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return todos
      .filter(todo => 
        !todo.completed && 
        todo.dueDate && 
        new Date(todo.dueDate) >= today && 
        new Date(todo.dueDate) <= nextWeek
      )
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 5);
  };

  const getOverdueTodos = () => {
    const now = new Date();
    return todos.filter(todo => 
      !todo.completed && 
      todo.dueDate && 
      new Date(todo.dueDate) < now
    );
  };

  const getTodayTodos = () => {
    const today = new Date().toDateString();
    return todos.filter(todo => 
      todo.dueDate && 
      new Date(todo.dueDate).toDateString() === today
    );
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Bienvenido a tu centro de control de tareas</p>
      </div>

      {/* Widget Motivacional */}
      <MotivationalWidget 
        completedTasks={stats.completed}
        totalTasks={stats.total}
      />

      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total Tareas</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <div className="stat-number">{stats.active}</div>
            <div className="stat-label">Pendientes</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-number">{stats.completed}</div>
            <div className="stat-label">Completadas</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⚠️</div>
          <div className="stat-content">
            <div className="stat-number">{getOverdueTodos().length}</div>
            <div className="stat-label">Vencidas</div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Recent Todos */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>📝 Tareas Recientes</h3>
            <span className="card-count">{getRecentTodos().length}</span>
          </div>
          <div className="card-content">
            {getRecentTodos().length === 0 ? (
              <div className="empty-state">
                <p>No hay tareas recientes</p>
              </div>
            ) : (
              <div className="todo-list">
                {getRecentTodos().map(todo => (
                  <div key={todo.id} className="todo-item">
                    <div className="todo-content">
                      <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                        {todo.text}
                      </span>
                      <div className="todo-meta">
                        <span className="todo-category">{todo.category}</span>
                        <span className={`todo-priority priority-${todo.priority.toLowerCase()}`}>
                          {todo.priority}
                        </span>
                      </div>
                    </div>
                    <div className="todo-status">
                      {todo.completed ? '✅' : '⏳'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Todos */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>📅 Próximas Tareas</h3>
            <span className="card-count">{getUpcomingTodos().length}</span>
          </div>
          <div className="card-content">
            {getUpcomingTodos().length === 0 ? (
              <div className="empty-state">
                <p>No hay tareas próximas</p>
              </div>
            ) : (
              <div className="todo-list">
                {getUpcomingTodos().map(todo => (
                  <div key={todo.id} className="todo-item">
                    <div className="todo-content">
                      <span className="todo-text">{todo.text}</span>
                      <div className="todo-meta">
                        <span className="todo-due-date">
                          📅 {new Date(todo.dueDate).toLocaleDateString('es-ES')}
                        </span>
                        <span className={`todo-priority priority-${todo.priority.toLowerCase()}`}>
                          {todo.priority}
                        </span>
                      </div>
                    </div>
                    <div className="todo-status">
                      ⏳
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Today's Todos */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>📅 Tareas de Hoy</h3>
            <span className="card-count">{getTodayTodos().length}</span>
          </div>
          <div className="card-content">
            {getTodayTodos().length === 0 ? (
              <div className="empty-state">
                <p>No hay tareas para hoy</p>
              </div>
            ) : (
              <div className="todo-list">
                {getTodayTodos().map(todo => (
                  <div key={todo.id} className="todo-item">
                    <div className="todo-content">
                      <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                        {todo.text}
                      </span>
                      <div className="todo-meta">
                        <span className="todo-category">{todo.category}</span>
                        <span className={`todo-priority priority-${todo.priority.toLowerCase()}`}>
                          {todo.priority}
                        </span>
                      </div>
                    </div>
                    <div className="todo-status">
                      {todo.completed ? '✅' : '⏳'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Overdue Todos */}
        {getOverdueTodos().length > 0 && (
          <div className="dashboard-card overdue-card">
            <div className="card-header">
              <h3>⚠️ Tareas Vencidas</h3>
              <span className="card-count">{getOverdueTodos().length}</span>
            </div>
            <div className="card-content">
              <div className="todo-list">
                {getOverdueTodos().slice(0, 3).map(todo => (
                  <div key={todo.id} className="todo-item overdue">
                    <div className="todo-content">
                      <span className="todo-text">{todo.text}</span>
                      <div className="todo-meta">
                        <span className="todo-due-date overdue">
                          📅 {new Date(todo.dueDate).toLocaleDateString('es-ES')}
                        </span>
                        <span className={`todo-priority priority-${todo.priority.toLowerCase()}`}>
                          {todo.priority}
                        </span>
                      </div>
                    </div>
                    <div className="todo-status">
                      ⚠️
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
