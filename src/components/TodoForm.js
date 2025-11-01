import React, { useState } from 'react';
import './TodoForm.css';

const TodoForm = ({ addTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      addTodo(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="¿Qué necesitas hacer hoy?"
          className="todo-input"
          maxLength={100}
        />
        <button 
          type="submit" 
          className="add-button"
          disabled={inputValue.trim() === ''}
        >
          <span className="add-icon">+</span>
          Agregar
        </button>
      </div>
      <div className="input-hint">
        Presiona Enter o haz clic en "Agregar" para añadir la tarea
      </div>
    </form>
  );
};

export default TodoForm;
