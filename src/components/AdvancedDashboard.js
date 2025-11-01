import React, { useState } from 'react';
import { useTodos } from '../context/TodoContext';
import './AdvancedDashboard.css';

const AdvancedDashboard = () => {
  const { 
    getStats, 
    getFilteredTodos, 
    setFilter, 
    setSort, 
    setSearch, 
    filter, 
    sort, 
    search,
    clearCompleted,
    bulkDelete,
    bulkComplete
  } = useTodos();
  
  const [selectedTodos, setSelectedTodos] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  
  const stats = getStats();
  const filteredTodos = getFilteredTodos();

  const handleSelectTodo = (todoId) => {
    setSelectedTodos(prev => 
      prev.includes(todoId) 
        ? prev.filter(id => id !== todoId)
        : [...prev, todoId]
    );
  };

  const handleSelectAll = () => {
    if (selectedTodos.length === filteredTodos.length) {
      setSelectedTodos([]);
    } else {
      setSelectedTodos(filteredTodos.map(todo => todo.id));
    }
  };

  const handleBulkComplete = () => {
    bulkComplete(selectedTodos);
    setSelectedTodos([]);
    setShowBulkActions(false);
  };

  const handleBulkDelete = () => {
    if (window.confirm(`¿Estás seguro de eliminar ${selectedTodos.length} tareas?`)) {
      bulkDelete(selectedTodos);
      setSelectedTodos([]);
      setShowBulkActions(false);
    }
  };

  const getCompletionRate = () => {
    return stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
  };

  const getTodayCount = () => {
    const today = new Date().toDateString();
    return filteredTodos.filter(todo => 
      todo.dueDate && 
      new Date(todo.dueDate).toDateString() === today
    ).length;
  };

  return (
    <div className="advanced-dashboard">
      {/* Header con búsqueda y acciones */}
      <div className="dashboard-header">
        <div className="search-section">
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Buscar tareas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            {search && (
              <button 
                className="clear-search"
                onClick={() => setSearch('')}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="header-actions">
          <button 
            className="bulk-actions-button"
            onClick={() => setShowBulkActions(!showBulkActions)}
            disabled={filteredTodos.length === 0}
          >
            <span className="button-icon">⚡</span>
            Acciones masivas
            {selectedTodos.length > 0 && (
              <span className="selected-count">({selectedTodos.length})</span>
            )}
          </button>
        </div>
      </div>

      {/* Estadísticas principales */}
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total</div>
          </div>
        </div>

        <div className="stat-card active">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <div className="stat-number">{stats.active}</div>
            <div className="stat-label">Pendientes</div>
          </div>
        </div>

        <div className="stat-card completed">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-number">{stats.completed}</div>
            <div className="stat-label">Completadas</div>
          </div>
        </div>


        <div className="stat-card today">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <div className="stat-number">{getTodayCount()}</div>
            <div className="stat-label">Hoy</div>
          </div>
        </div>

        <div className="stat-card progress">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <div className="stat-number">{getCompletionRate()}%</div>
            <div className="stat-label">Progreso</div>
          </div>
        </div>
      </div>

      {/* Filtros y ordenamiento */}
      <div className="controls-section">
        <div className="filters-row">
          <div className="filter-group">
            <label>Filtrar por:</label>
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">Todas las tareas</option>
              <option value="active">Solo pendientes</option>
              <option value="completed">Solo completadas</option>
              <option value="today">Para hoy</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Ordenar por:</label>
            <select 
              value={sort} 
              onChange={(e) => setSort(e.target.value)}
              className="filter-select"
            >
              <option value="created">Fecha de creación</option>
              <option value="updated">Última actualización</option>
              <option value="priority">Prioridad</option>
              <option value="dueDate">Fecha límite</option>
              <option value="alphabetical">Alfabético</option>
            </select>
          </div>

          <div className="filter-actions">
            <button 
              className="clear-completed-button"
              onClick={clearCompleted}
              disabled={stats.completed === 0}
            >
              🗑️ Limpiar completadas
            </button>
          </div>
        </div>

        {/* Acciones masivas */}
        {showBulkActions && (
          <div className="bulk-actions-panel">
            <div className="bulk-actions-header">
              <div className="bulk-selection">
                <label className="select-all-label">
                  <input
                    type="checkbox"
                    checked={selectedTodos.length === filteredTodos.length && filteredTodos.length > 0}
                    onChange={handleSelectAll}
                    className="select-all-checkbox"
                  />
                  Seleccionar todas ({filteredTodos.length})
                </label>
                <span className="selected-info">
                  {selectedTodos.length} seleccionadas
                </span>
              </div>
            </div>

            <div className="bulk-actions-buttons">
              <button 
                className="bulk-complete-button"
                onClick={handleBulkComplete}
                disabled={selectedTodos.length === 0}
              >
                ✅ Completar seleccionadas
              </button>
              <button 
                className="bulk-delete-button"
                onClick={handleBulkDelete}
                disabled={selectedTodos.length === 0}
              >
                🗑️ Eliminar seleccionadas
              </button>
              <button 
                className="bulk-cancel-button"
                onClick={() => {
                  setSelectedTodos([]);
                  setShowBulkActions(false);
                }}
              >
                ✕ Cancelar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Estadísticas por categoría */}
      <div className="category-stats">
        <h3>Distribución por categoría</h3>
        <div className="category-grid">
          {Object.entries(stats.byCategory).map(([category, count]) => (
            <div key={category} className="category-item">
              <span className="category-name">{category}</span>
              <div className="category-bar">
                <div 
                  className="category-fill"
                  style={{ 
                    width: `${stats.total > 0 ? (count / stats.total) * 100 : 0}%` 
                  }}
                ></div>
              </div>
              <span className="category-count">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Estadísticas por prioridad */}
      <div className="priority-stats">
        <h3>Distribución por prioridad</h3>
        <div className="priority-grid">
          {Object.entries(stats.byPriority).map(([priority, count]) => (
            <div key={priority} className={`priority-item priority-${priority.toLowerCase()}`}>
              <span className="priority-name">{priority}</span>
              <div className="priority-bar">
                <div 
                  className="priority-fill"
                  style={{ 
                    width: `${stats.total > 0 ? (count / stats.total) * 100 : 0}%` 
                  }}
                ></div>
              </div>
              <span className="priority-count">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvancedDashboard;
