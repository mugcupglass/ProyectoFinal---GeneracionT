import React, { useState } from 'react';
import { useTodos } from '../context/TodoContext';
import './AdvancedTodoItem.css';

const AdvancedTodoItem = ({ todo, onEdit, onDelete }) => {
  const { toggleTodo, setPriority, setDueDate, editTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    text: todo.text,
    category: todo.category,
    priority: todo.priority,
    dueDate: todo.dueDate || '',
    notes: todo.notes || ''
  });
  const [showDetails, setShowDetails] = useState(false);

  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  const handleEdit = () => {
    if (isEditing) {
      editTodo(todo.id, editData);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setEditData({
      text: todo.text,
      category: todo.category,
      priority: todo.priority,
      dueDate: todo.dueDate || '',
      notes: todo.notes || ''
    });
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleEdit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'Baja': '#48bb78',
      'Media': '#ed8936',
      'Alta': '#e53e3e',
      'Urgente': '#9f7aea'
    };
    return colors[priority] || '#718096';
  };

  const getPriorityIcon = (priority) => {
    const icons = {
      'Baja': '🟢',
      'Media': '🟡',
      'Alta': '🟠',
      'Urgente': '🔴'
    };
    return icons[priority] || '⚪';
  };

  const isOverdue = () => {
    return todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;
  };

  const isDueToday = () => {
    if (!todo.dueDate) return false;
    const today = new Date().toDateString();
    const dueDate = new Date(todo.dueDate).toDateString();
    return today === dueDate;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Mañana';
    if (diffDays <= 7) return `En ${diffDays} días`;
    
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  const getTimeSpent = () => {
    if (todo.timeSpent === 0) return null;
    const hours = Math.floor(todo.timeSpent / 60);
    const minutes = todo.timeSpent % 60;
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  return (
    <div className={`advanced-todo-item ${todo.completed ? 'completed' : ''} ${isOverdue() ? 'overdue' : ''} ${isDueToday() ? 'due-today' : ''}`}>
      <div className="todo-main-content">
        <div className="todo-header">
          <button
            className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}
            onClick={handleToggle}
            aria-label={todo.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
          >
            {todo.completed && <span className="checkmark">✓</span>}
          </button>

          <div className="todo-info">
            <div className="todo-meta">
              <span className={`priority-badge priority-${todo.priority.toLowerCase()}`}>
                {getPriorityIcon(todo.priority)} {todo.priority}
              </span>
              <span className="category-badge">
                📁 {todo.category}
              </span>
              {todo.dueDate && (
                <span className={`due-date-badge ${isOverdue() ? 'overdue' : isDueToday() ? 'due-today' : ''}`}>
                  📅 {formatDate(todo.dueDate)}
                </span>
              )}
            </div>

            <div className="todo-text-container">
              {isEditing ? (
                <input
                  type="text"
                  value={editData.text}
                  onChange={(e) => setEditData(prev => ({ ...prev, text: e.target.value }))}
                  onKeyPress={handleKeyPress}
                  onBlur={handleEdit}
                  className="edit-input"
                  autoFocus
                  maxLength={200}
                />
              ) : (
                <span className={`todo-text ${todo.completed ? 'completed-text' : ''}`}>
                  {todo.text}
                </span>
              )}
            </div>

            {todo.tags && todo.tags.length > 0 && (
              <div className="todo-tags">
                {todo.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="todo-actions">
          <button
            className="action-button details-button"
            onClick={() => setShowDetails(!showDetails)}
            aria-label="Ver detalles"
          >
            {showDetails ? '👁️‍🗨️' : '👁️'}
          </button>
          {!isEditing && (
            <>
              <button
                className="action-button edit-button"
                onClick={handleEdit}
                aria-label="Editar tarea"
              >
                ✏️
              </button>
              <button
                className="action-button delete-button"
                onClick={() => onDelete(todo.id)}
                aria-label="Eliminar tarea"
              >
                🗑️
              </button>
            </>
          )}
          {isEditing && (
            <>
              <button
                className="action-button save-button"
                onClick={handleEdit}
                aria-label="Guardar cambios"
              >
                ✓
              </button>
              <button
                className="action-button cancel-button"
                onClick={handleCancel}
                aria-label="Cancelar edición"
              >
                ✕
              </button>
            </>
          )}
        </div>
      </div>

      {showDetails && (
        <div className="todo-details">
          <div className="details-section">
            <h4>Información adicional</h4>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Creada:</span>
                <span className="detail-value">
                  {new Date(todo.createdAt).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              
              {todo.updatedAt !== todo.createdAt && (
                <div className="detail-item">
                  <span className="detail-label">Actualizada:</span>
                  <span className="detail-value">
                    {new Date(todo.updatedAt).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              )}

              {todo.completedAt && (
                <div className="detail-item">
                  <span className="detail-label">Completada:</span>
                  <span className="detail-value">
                    {new Date(todo.completedAt).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              )}

              {todo.estimatedTime && (
                <div className="detail-item">
                  <span className="detail-label">Tiempo estimado:</span>
                  <span className="detail-value">
                    {todo.estimatedTime} minutos
                  </span>
                </div>
              )}

              {getTimeSpent() && (
                <div className="detail-item">
                  <span className="detail-label">Tiempo invertido:</span>
                  <span className="detail-value">
                    {getTimeSpent()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {todo.notes && (
            <div className="details-section">
              <h4>Notas</h4>
              <p className="todo-notes">{todo.notes}</p>
            </div>
          )}

          {isEditing && (
            <div className="edit-details">
              <div className="edit-row">
                <div className="edit-group">
                  <label>Categoría:</label>
                  <select
                    value={editData.category}
                    onChange={(e) => setEditData(prev => ({ ...prev, category: e.target.value }))}
                    className="edit-select"
                  >
                    <option value="Personal">Personal</option>
                    <option value="Trabajo">Trabajo</option>
                    <option value="Estudio">Estudio</option>
                    <option value="Salud">Salud</option>
                    <option value="Hogar">Hogar</option>
                  </select>
                </div>
                <div className="edit-group">
                  <label>Prioridad:</label>
                  <select
                    value={editData.priority}
                    onChange={(e) => setEditData(prev => ({ ...prev, priority: e.target.value }))}
                    className="edit-select"
                  >
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                    <option value="Urgente">Urgente</option>
                  </select>
                </div>
              </div>
              <div className="edit-row">
                <div className="edit-group">
                  <label>Fecha límite:</label>
                  <input
                    type="datetime-local"
                    value={editData.dueDate}
                    onChange={(e) => setEditData(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="edit-input"
                  />
                </div>
              </div>
              <div className="edit-group">
                <label>Notas:</label>
                <textarea
                  value={editData.notes}
                  onChange={(e) => setEditData(prev => ({ ...prev, notes: e.target.value }))}
                  className="edit-textarea"
                  rows={3}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedTodoItem;
