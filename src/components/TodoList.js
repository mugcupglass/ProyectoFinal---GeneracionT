import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import TodoStats from './TodoStats';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  // Cargar tareas desde localStorage al inicializar
  useEffect(() => {
    const savedTodos = localStorage.getItem('jaky-todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Guardar tareas en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('jaky-todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    if (text.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTodos([newTodo, ...todos]);
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    if (newText.trim() !== '') {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      ));
    }
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  // Filtrar tareas según el filtro seleccionado
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <div className="todo-list">
      <TodoForm addTodo={addTodo} />
      
      <TodoStats 
        total={todos.length}
        active={activeCount}
        completed={completedCount}
        filter={filter}
        setFilter={setFilter}
        clearCompleted={clearCompleted}
      />

      <div className="todos-container">
        {filteredTodos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No hay tareas</h3>
            <p>
              {filter === 'active' ? '¡No tienes tareas pendientes!' :
               filter === 'completed' ? 'No has completado ninguna tarea aún.' :
               'Agrega tu primera tarea para comenzar.'}
            </p>
          </div>
        ) : (
          <div className="todos-list">
            {filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
