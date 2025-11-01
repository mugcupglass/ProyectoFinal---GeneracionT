import React, { useState, useEffect } from 'react';
import { useTodos } from '../context/TodoContext';
import MotivationalWidget from '../components/MotivationalWidget';
import './Calendar.css';

const Calendar = () => {
  const { todos, addTodo, updateTodo, deleteTodo } = useTodos();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // month, week, day
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);
  const [newTodo, setNewTodo] = useState({
    text: '',
    category: 'Personal',
    priority: 'media',
    dueDate: '',
    notes: ''
  });

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getTodosForDate = (date) => {
    if (!date) return [];
    
    const dateString = date.toDateString();
    return todos.filter(todo => {
      if (!todo.dueDate) return false;
      return new Date(todo.dueDate).toDateString() === dateString;
    });
  };

  const getTodosForToday = () => {
    const today = new Date().toDateString();
    return todos.filter(todo => {
      if (!todo.dueDate) return false;
      return new Date(todo.dueDate).toDateString() === today;
    });
  };

  const getTodosForWeek = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    return todos.filter(todo => {
      if (!todo.dueDate) return false;
      const todoDate = new Date(todo.dueDate);
      return todoDate >= startOfWeek && todoDate <= endOfWeek;
    });
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isPastDate = (date) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDays.push(day);
    }
    return weekDays;
  };

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  // Funciones para manejar eventos
  const handleDateClick = (date) => {
    if (date) {
      setSelectedDate(date);
      setNewTodo({
        ...newTodo,
        dueDate: date.toISOString().split('T')[0]
      });
      setShowAddForm(true);
    }
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.text.trim()) {
      addTodo({
        ...newTodo,
        dueDate: selectedDate ? selectedDate.toISOString() : new Date().toISOString()
      });
      setNewTodo({
        text: '',
        category: 'Personal',
        priority: 'media',
        dueDate: '',
        notes: ''
      });
      setShowAddForm(false);
      setSelectedDate(null);
    }
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setNewTodo({
      text: todo.text,
      category: todo.category,
      priority: todo.priority,
      dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : '',
      notes: todo.notes || ''
    });
    setShowAddForm(true);
  };

  const handleUpdateTodo = (e) => {
    e.preventDefault();
    if (newTodo.text.trim() && editingTodo) {
      updateTodo(editingTodo.id, {
        ...editingTodo,
        ...newTodo,
        dueDate: newTodo.dueDate ? new Date(newTodo.dueDate).toISOString() : editingTodo.dueDate
      });
      setEditingTodo(null);
      setNewTodo({
        text: '',
        category: 'Personal',
        priority: 'media',
        dueDate: '',
        notes: ''
      });
      setShowAddForm(false);
    }
  };

  const handleDeleteTodo = (todoId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      deleteTodo(todoId);
    }
  };

  const handleToggleComplete = (todo) => {
    updateTodo(todo.id, { ...todo, completed: !todo.completed });
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = getWeekDays();
  const todayTodos = getTodosForToday();
  const weekTodos = getTodosForWeek();

  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <h1>📅 Calendario</h1>
        <p>Gestiona tus tareas por fechas - Haz clic en cualquier día para añadir eventos</p>
      </div>

      {/* Widget Motivacional */}
      <MotivationalWidget 
        completedTasks={todos.filter(todo => todo.completed).length}
        totalTasks={todos.length}
      />

      {/* Calendar Controls */}
      <div className="calendar-controls">
        <div className="date-navigation">
          <button 
            className="nav-button"
            onClick={() => navigateMonth(-1)}
          >
            ←
          </button>
          <h2 className="current-month">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button 
            className="nav-button"
            onClick={() => navigateMonth(1)}
          >
            →
          </button>
        </div>
        
        <div className="view-controls">
          <button 
            className={`view-button ${view === 'month' ? 'active' : ''}`}
            onClick={() => setView('month')}
          >
            Mes
          </button>
          <button 
            className={`view-button ${view === 'week' ? 'active' : ''}`}
            onClick={() => setView('week')}
          >
            Semana
          </button>
          <button 
            className={`view-button ${view === 'day' ? 'active' : ''}`}
            onClick={() => setView('day')}
          >
            Día
          </button>
        </div>
      </div>

      {/* Calendar Content */}
      <div className="calendar-content">
        {view === 'month' && (
          <div className="month-view">
            <div className="calendar-grid">
              {dayNames.map(day => (
                <div key={day} className="day-header">
                  {day}
                </div>
              ))}
              {days.map((day, index) => {
                const dayTodos = getTodosForDate(day);
                return (
                  <div 
                    key={index} 
                    className={`calendar-day ${isToday(day) ? 'today' : ''} ${isPastDate(day) ? 'past' : ''} ${day ? 'clickable' : ''}`}
                    onClick={() => handleDateClick(day)}
                  >
                    {day && (
                      <>
                        <div className="day-number">{day.getDate()}</div>
                        <div className="day-todos">
                          {dayTodos.slice(0, 3).map(todo => (
                            <div 
                              key={todo.id} 
                              className={`todo-dot ${todo.completed ? 'completed' : ''} priority-${todo.priority.toLowerCase()}`}
                              title={todo.text}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditTodo(todo);
                              }}
                            ></div>
                          ))}
                          {dayTodos.length > 3 && (
                            <div className="more-todos">+{dayTodos.length - 3}</div>
                          )}
                        </div>
                        <div className="add-event-hint">+</div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {view === 'week' && (
          <div className="week-view">
            <div className="week-grid">
              {weekDays.map(day => {
                const dayTodos = getTodosForDate(day);
                return (
                  <div key={day.toDateString()} className="week-day">
                    <div className="week-day-header">
                      <div className="week-day-name">{dayNames[day.getDay()]}</div>
                      <div className={`week-day-number ${isToday(day) ? 'today' : ''}`}>
                        {day.getDate()}
                      </div>
                    </div>
                    <div className="week-day-todos">
                      {dayTodos.map(todo => (
                        <div 
                          key={todo.id} 
                          className={`week-todo ${todo.completed ? 'completed' : ''} priority-${todo.priority.toLowerCase()}`}
                        >
                          <div className="todo-time">
                            {todo.dueDate ? new Date(todo.dueDate).toLocaleTimeString('es-ES', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            }) : ''}
                          </div>
                          <div className="todo-text">{todo.text}</div>
                          <div className="todo-category">{todo.category}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {view === 'day' && (
          <div className="day-view">
            <div className="day-header">
              <h3>Hoy - {new Date().toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</h3>
            </div>
            <div className="day-todos">
              {todayTodos.length === 0 ? (
                <div className="empty-day">
                  <p>No hay tareas para hoy</p>
                </div>
              ) : (
                <div className="day-todo-list">
                  {todayTodos.map(todo => (
                    <div 
                      key={todo.id} 
                      className={`day-todo ${todo.completed ? 'completed' : ''} priority-${todo.priority.toLowerCase()}`}
                    >
                      <div className="todo-time">
                        {todo.dueDate ? new Date(todo.dueDate).toLocaleTimeString('es-ES', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        }) : 'Sin hora'}
                      </div>
                      <div className="todo-content">
                        <div className="todo-text">{todo.text}</div>
                        <div className="todo-meta">
                          <span className="todo-category">{todo.category}</span>
                          <span className="todo-priority">{todo.priority}</span>
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
        )}
      </div>

      {/* Formulario para añadir/editar eventos */}
      {showAddForm && (
        <div className="calendar-form-overlay">
          <div className="calendar-form-container">
            <div className="calendar-form-header">
              <h3>{editingTodo ? 'Editar Evento' : 'Nuevo Evento'}</h3>
              <button 
                className="close-form-button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingTodo(null);
                  setSelectedDate(null);
                }}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={editingTodo ? handleUpdateTodo : handleAddTodo} className="calendar-form">
              <div className="form-group">
                <label>Título del evento</label>
                <input
                  type="text"
                  value={newTodo.text}
                  onChange={(e) => setNewTodo({...newTodo, text: e.target.value})}
                  placeholder="¿Qué necesitas hacer?"
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Categoría</label>
                  <select
                    value={newTodo.category}
                    onChange={(e) => setNewTodo({...newTodo, category: e.target.value})}
                  >
                    <option value="Personal">Personal</option>
                    <option value="Trabajo">Trabajo</option>
                    <option value="Estudio">Estudio</option>
                    <option value="Salud">Salud</option>
                    <option value="Hogar">Hogar</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Prioridad</label>
                  <select
                    value={newTodo.priority}
                    onChange={(e) => setNewTodo({...newTodo, priority: e.target.value})}
                  >
                    <option value="baja">Baja</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                    <option value="urgente">Urgente</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Fecha</label>
                <input
                  type="date"
                  value={newTodo.dueDate}
                  onChange={(e) => setNewTodo({...newTodo, dueDate: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Notas (opcional)</label>
                <textarea
                  value={newTodo.notes}
                  onChange={(e) => setNewTodo({...newTodo, notes: e.target.value})}
                  placeholder="Detalles adicionales..."
                  rows="3"
                />
              </div>
              
              <div className="form-actions">
                <button type="button" onClick={() => {
                  setShowAddForm(false);
                  setEditingTodo(null);
                  setSelectedDate(null);
                }}>
                  Cancelar
                </button>
                <button type="submit" className="submit-button">
                  {editingTodo ? 'Actualizar' : 'Crear'} Evento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
