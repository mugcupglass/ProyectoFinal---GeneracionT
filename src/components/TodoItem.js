import React, { useState } from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    } else {
      setIsEditing(true);
      setEditText(todo.text);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return 'Hoy';
    } else if (diffDays === 2) {
      return 'Ayer';
    } else if (diffDays <= 7) {
      return `Hace ${diffDays - 1} días`;
    } else {
      return date.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short'
      });
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <button
          className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}
          onClick={() => onToggle(todo.id)}
          aria-label={todo.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
        >
          {todo.completed && <span className="checkmark">✓</span>}
        </button>

        <div className="todo-text-container">
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={handleEdit}
              className="edit-input"
              autoFocus
              maxLength={100}
            />
          ) : (
            <span className={`todo-text ${todo.completed ? 'completed-text' : ''}`}>
              {todo.text}
            </span>
          )}
          <div className="todo-meta">
            <span className="todo-date">
              {formatDate(todo.createdAt)}
            </span>
          </div>
        </div>
      </div>

      <div className="todo-actions">
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
  );
};

export default TodoItem;
