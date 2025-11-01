import React from 'react';
import './TodoStats.css';

const TodoStats = ({ total, active, completed, filter, setFilter, clearCompleted }) => {
  const filters = [
    { key: 'all', label: 'Todas', count: total },
    { key: 'active', label: 'Pendientes', count: active },
    { key: 'completed', label: 'Completadas', count: completed }
  ];

  return (
    <div className="todo-stats">
      <div className="stats-info">
        <div className="stat-item">
          <span className="stat-number">{total}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{active}</span>
          <span className="stat-label">Pendientes</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{completed}</span>
          <span className="stat-label">Completadas</span>
        </div>
      </div>

      <div className="filters">
        {filters.map(({ key, label, count }) => (
          <button
            key={key}
            className={`filter-button ${filter === key ? 'active' : ''}`}
            onClick={() => setFilter(key)}
          >
            {label}
            {count > 0 && <span className="filter-count">({count})</span>}
          </button>
        ))}
      </div>

      {completed > 0 && (
        <button
          className="clear-completed"
          onClick={clearCompleted}
        >
          🗑️ Limpiar completadas
        </button>
      )}
    </div>
  );
};

export default TodoStats;
