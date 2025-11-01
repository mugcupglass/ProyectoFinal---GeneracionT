import React, { useState } from 'react';
import { useTodos } from '../context/TodoContext';
import './AdvancedTodoForm.css';

const AdvancedTodoForm = ({ onClose }) => {
  const { addTodo, categories, priorities } = useTodos();
  const [formData, setFormData] = useState({
    text: '',
    category: 'Personal',
    priority: 'Media',
    dueDate: '',
    tags: '',
    notes: '',
    estimatedTime: ''
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación
    const newErrors = {};
    if (!formData.text.trim()) {
      newErrors.text = 'El texto de la tarea es requerido';
    }
    if (formData.text.length > 200) {
      newErrors.text = 'El texto no puede exceder 200 caracteres';
    }
    if (formData.dueDate && new Date(formData.dueDate) < new Date()) {
      newErrors.dueDate = 'La fecha no puede ser en el pasado';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Procesar tags
    const tagsArray = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    // Crear tarea
    const todoData = {
      text: formData.text.trim(),
      category: formData.category,
      priority: formData.priority,
      dueDate: formData.dueDate || null,
      tags: tagsArray,
      notes: formData.notes.trim(),
      estimatedTime: formData.estimatedTime ? parseInt(formData.estimatedTime) : null
    };

    addTodo(todoData);
    onClose();
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
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

  return (
    <div className="advanced-form-overlay">
      <div className="advanced-form-container">
        <div className="advanced-form-header">
          <h2>Nueva Tarea Avanzada</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="advanced-form">
          <div className="form-section">
            <label className="form-label">
              <span className="label-text">Tarea *</span>
              <textarea
                value={formData.text}
                onChange={(e) => handleChange('text', e.target.value)}
                placeholder="Describe tu tarea..."
                className={`form-textarea ${errors.text ? 'error' : ''}`}
                rows={3}
                maxLength={200}
                autoFocus
              />
              {errors.text && <span className="error-message">{errors.text}</span>}
              <div className="character-count">
                {formData.text.length}/200
              </div>
            </label>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                <span className="label-text">Categoría</span>
                <select
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="form-select"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="form-group">
              <label className="form-label">
                <span className="label-text">Prioridad</span>
                <select
                  value={formData.priority}
                  onChange={(e) => handleChange('priority', e.target.value)}
                  className="form-select"
                  style={{ borderColor: getPriorityColor(formData.priority) }}
                >
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                <span className="label-text">Fecha límite</span>
                <input
                  type="datetime-local"
                  value={formData.dueDate}
                  onChange={(e) => handleChange('dueDate', e.target.value)}
                  className={`form-input ${errors.dueDate ? 'error' : ''}`}
                />
                {errors.dueDate && <span className="error-message">{errors.dueDate}</span>}
              </label>
            </div>

            <div className="form-group">
              <label className="form-label">
                <span className="label-text">Tiempo estimado (min)</span>
                <input
                  type="number"
                  value={formData.estimatedTime}
                  onChange={(e) => handleChange('estimatedTime', e.target.value)}
                  placeholder="30"
                  className="form-input"
                  min="1"
                  max="999"
                />
              </label>
            </div>
          </div>

          <div className="form-section">
            <label className="form-label">
              <span className="label-text">Tags (separados por comas)</span>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => handleChange('tags', e.target.value)}
                placeholder="importante, proyecto, reunión..."
                className="form-input"
              />
            </label>
          </div>

          <div className="form-section">
            <label className="form-label">
              <span className="label-text">Notas adicionales</span>
              <textarea
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                placeholder="Detalles adicionales, contexto, recursos..."
                className="form-textarea"
                rows={3}
              />
            </label>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancelar
            </button>
            <button type="submit" className="submit-button">
              <span className="button-icon">+</span>
              Crear Tarea
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdvancedTodoForm;
