import React, { useState } from 'react';
import { useTodos } from '../context/TodoContext';
import AdvancedDashboard from '../components/AdvancedDashboard';
import AdvancedTodoForm from '../components/AdvancedTodoForm';
import AdvancedTodoItem from '../components/AdvancedTodoItem';
import './Todos.css';

const Todos = () => {
  const { getFilteredTodos, deleteTodo } = useTodos();
  const [showAdvancedForm, setShowAdvancedForm] = useState(false);
  const filteredTodos = getFilteredTodos();

  return (
    <div className="todos-page">
      <div className="todos-header">
        <div className="todos-header-content">
          <h1>📝 Mis Tareas</h1>
          <p>Gestiona todas tus tareas en un solo lugar</p>
        </div>
        <button 
          className="add-todo-button"
          onClick={() => setShowAdvancedForm(true)}
        >
          <span className="button-icon">+</span>
          Nueva Tarea
        </button>
      </div>

      <div className="todos-content">
        <AdvancedDashboard />
        
        <div className="todos-section">
          <div className="todos-list">
            {filteredTodos.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📋</div>
                <h3>No hay tareas</h3>
                <p>Agrega tu primera tarea para comenzar a organizarte</p>
                <button 
                  className="create-first-todo"
                  onClick={() => setShowAdvancedForm(true)}
                >
                  Crear mi primera tarea
                </button>
              </div>
            ) : (
              filteredTodos.map(todo => (
                <AdvancedTodoItem
                  key={todo.id}
                  todo={todo}
                  onDelete={deleteTodo}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {showAdvancedForm && (
        <AdvancedTodoForm onClose={() => setShowAdvancedForm(false)} />
      )}
    </div>
  );
};

export default Todos;
