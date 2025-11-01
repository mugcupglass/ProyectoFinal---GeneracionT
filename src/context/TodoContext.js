import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

// Tipos de acciones
const ACTIONS = {
  ADD_TODO: 'ADD_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  DELETE_TODO: 'DELETE_TODO',
  EDIT_TODO: 'EDIT_TODO',
  SET_FILTER: 'SET_FILTER',
  SET_SORT: 'SET_SORT',
  SET_SEARCH: 'SET_SEARCH',
  CLEAR_COMPLETED: 'CLEAR_COMPLETED',
  BULK_ACTIONS: 'BULK_ACTIONS',
  SET_CATEGORY: 'SET_CATEGORY',
  SET_PRIORITY: 'SET_PRIORITY',
  SET_DUE_DATE: 'SET_DUE_DATE',
  LOAD_TODOS: 'LOAD_TODOS',
  EXPORT_TODOS: 'EXPORT_TODOS',
  IMPORT_TODOS: 'IMPORT_TODOS',
  UPDATE_SETTINGS: 'UPDATE_SETTINGS'
};

// Estado inicial
const initialState = {
  todos: [],
  filter: 'all',
  sort: 'created',
  search: '',
  categories: ['Personal', 'Trabajo', 'Estudio'],
  priorities: ['Baja', 'Media', 'Alta'],
  settings: {
    autoSave: true,
    theme: 'light'
  }
};

// Reducer para manejar el estado
const todoReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOAD_TODOS:
      return {
        ...state,
        todos: action.payload || []
      };

    case ACTIONS.ADD_TODO:
      return {
        ...state,
        todos: [action.payload, ...state.todos]
      };

    case ACTIONS.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { 
                ...todo, 
                completed: !todo.completed,
                completedAt: !todo.completed ? new Date().toISOString() : null,
                updatedAt: new Date().toISOString()
              }
            : todo
        )
      };

    case ACTIONS.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };

    case ACTIONS.EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, ...action.payload.updates, updatedAt: new Date().toISOString() }
            : todo
        )
      };

    case ACTIONS.SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };

    case ACTIONS.SET_SORT:
      return {
        ...state,
        sort: action.payload
      };

    case ACTIONS.SET_SEARCH:
      return {
        ...state,
        search: action.payload
      };

    case ACTIONS.CLEAR_COMPLETED:
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed)
      };

    case ACTIONS.BULK_ACTIONS:
      return {
        ...state,
        todos: action.payload
      };

    case ACTIONS.SET_CATEGORY:
      return {
        ...state,
        categories: [...new Set([...state.categories, action.payload])]
      };

    case ACTIONS.SET_PRIORITY:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, priority: action.payload.priority, updatedAt: new Date().toISOString() }
            : todo
        )
      };

    case ACTIONS.SET_DUE_DATE:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, dueDate: action.payload.dueDate, updatedAt: new Date().toISOString() }
            : todo
        )
      };

    case ACTIONS.UPDATE_SETTINGS:
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload
        }
      };

    default:
      return state;
  }
};

// Crear contexto
const TodoContext = createContext();

// Hook personalizado para usar el contexto
export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos debe ser usado dentro de TodoProvider');
  }
  return context;
};

// Provider del contexto
export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [loaded, setLoaded] = useState(false);

  // Cargar datos desde Supabase (con fallback a localStorage)
  useEffect(() => {
    const loadData = async () => {
      try {
        // Intentar cargar desde Supabase solo si está configurado
        if (supabase) {
          console.log('🔄 Intentando cargar datos desde Supabase...');
          const { data: todos, error: todosError } = await supabase
            .from('todos')
            .select('*')
            .order('created_at', { ascending: false });

          if (todosError) {
            console.error('❌ Error cargando todos desde Supabase:', todosError);
            console.error('Código:', todosError.code);
            console.error('Mensaje:', todosError.message);
            if (todosError.code === '42P01') {
              console.error('💡 La tabla "todos" no existe. Ejecuta el script SQL en Supabase.');
            }
            if (todosError.code === '42501') {
              console.error('💡 Error de permisos RLS. Verifica las políticas en Supabase.');
            }
          } else if (todos) {
            console.log('✅ Datos cargados desde Supabase:', todos.length, 'tareas');
            // Transformar datos de Supabase al formato de la app
            const formattedTodos = todos.map(todo => ({
              id: todo.id,
              text: todo.text,
              completed: todo.completed,
              createdAt: todo.created_at,
              updatedAt: todo.updated_at,
              category: todo.category,
              priority: todo.priority,
              dueDate: todo.due_date,
              completedAt: todo.completed_at
            }));
            dispatch({ type: ACTIONS.LOAD_TODOS, payload: formattedTodos });
          }

          // Cargar settings desde Supabase
          const { data: settings, error: settingsError } = await supabase
            .from('user_settings')
            .select('*')
            .single();

          if (!settingsError && settings) {
            const formattedSettings = {
              autoSave: settings.auto_save,
              theme: settings.theme
            };
            dispatch({ type: ACTIONS.UPDATE_SETTINGS, payload: formattedSettings });
            if (settings.theme === 'dark') {
              document.body.classList.add('dark-mode');
            } else {
              document.body.classList.remove('dark-mode');
            }
          }
        }
      } catch (error) {
        console.error('Error cargando desde Supabase, usando localStorage como fallback:', error);
        
        }
      
      // Fallback a localStorage si Supabase no está configurado o falla
    const savedTodos = localStorage.getItem('jaky-todos-advanced');
    const savedSettings = localStorage.getItem('jaky-settings');
    
    if (savedTodos) {
      dispatch({ type: ACTIONS.LOAD_TODOS, payload: JSON.parse(savedTodos) });
    }
    
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
        dispatch({ type: ACTIONS.UPDATE_SETTINGS, payload: settings });
        if (settings.theme) {
          if (settings.theme === 'dark') {
            document.body.classList.add('dark-mode');
          } else {
            document.body.classList.remove('dark-mode');
          }
        }
    }
    setLoaded(true);
    };

    loadData();
  }, []);

  // Guardar todos en Supabase cuando cambien (con fallback a localStorage)
  // Nota: Las operaciones individuales (addTodo, toggleTodo, etc.) ya guardan en Supabase
  // Este useEffect es un respaldo para sincronizar cambios que no pasaron por esas funciones
  useEffect(() => {
    if (!loaded || !state.settings.autoSave) return;
    
    const saveTodos = async () => {
      try {
        if (supabase && state.todos.length > 0) {
          // Para cada todo, verificar si existe en Supabase y sincronizar
          for (const todo of state.todos) {
            // Solo sincronizar todos que tienen IDs numéricos (vienen de Supabase)
            // Los IDs temporales (Date.now() + Math.random()) se ignoran aquí
            // porque ya fueron guardados por addTodo cuando se crearon
            if (typeof todo.id === 'number' && todo.id < 10000000000000) {
              // ID parece ser de Supabase, verificar si existe
              const { data: existing, error: checkError } = await supabase
                .from('todos')
                .select('id')
                .eq('id', todo.id)
                .single();

              const todoData = {
                text: todo.text,
                completed: todo.completed,
                category: todo.category,
                priority: todo.priority,
                due_date: todo.dueDate,
                completed_at: todo.completedAt,
                updated_at: todo.updatedAt || new Date().toISOString()
              };

              if (existing && !checkError) {
                // Actualizar si existe
                await supabase
                  .from('todos')
                  .update(todoData)
                  .eq('id', todo.id);
              }
            }
          }
        } else {
          // Fallback a localStorage si Supabase no está configurado
          localStorage.setItem('jaky-todos-advanced', JSON.stringify(state.todos));
        }
      } catch (error) {
        console.error('Error guardando todos:', error);
        // Fallback a localStorage
        localStorage.setItem('jaky-todos-advanced', JSON.stringify(state.todos));
      }
    };

    // Usar debounce para evitar demasiadas llamadas
    const timeoutId = setTimeout(() => {
      saveTodos();
    }, 2000); // Esperar 2 segundos después del último cambio

    return () => clearTimeout(timeoutId);
  }, [state.todos, loaded, state.settings.autoSave]);

  // Guardar settings en Supabase cuando cambien (con fallback a localStorage)
  useEffect(() => {
    if (!loaded) return;
    
    const saveSettings = async () => {
      try {
        if (supabase) {
          const { error } = await supabase
            .from('user_settings')
            .upsert({
              auto_save: state.settings.autoSave,
              theme: state.settings.theme
            }, {
              onConflict: 'user_id'
            });

          if (error) throw error;
        } else {
          // Si Supabase no está configurado, usar localStorage
          localStorage.setItem('jaky-settings', JSON.stringify(state.settings));
        }
      } catch (error) {
        console.error('Error guardando settings, usando localStorage:', error);
      localStorage.setItem('jaky-settings', JSON.stringify(state.settings));
      }
    };

    if (state.settings) {
      saveSettings();
    }
  }, [state.settings, loaded]);

  // Funciones de utilidad
  const addTodo = async (todoData) => {
    try {
      if (supabase) {
        console.log('✅ Guardando tarea en Supabase...', todoData);
        const newTodo = {
          text: todoData.text,
          completed: false,
          category: todoData.category || 'Personal',
          priority: todoData.priority || 'Media',
          due_date: todoData.dueDate || null
        };

        const { data, error } = await supabase
          .from('todos')
          .insert([newTodo])
          .select()
          .single();

        if (error) {
          console.error('❌ Error de Supabase al insertar:', error);
          throw error;
        }

        console.log('✅ Tarea guardada en Supabase:', data);

        const formattedTodo = {
          id: data.id,
          text: data.text,
          completed: data.completed,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
          category: data.category,
          priority: data.priority,
          dueDate: data.due_date,
          completedAt: data.completed_at
        };

        dispatch({ type: ACTIONS.ADD_TODO, payload: formattedTodo });
      } else {
        console.warn('⚠️ Supabase no configurado, guardando en localStorage');
        // Fallback: agregar con ID temporal y guardar en localStorage
        const fallbackTodo = {
          id: Date.now() + Math.random(),
          text: todoData.text,
          completed: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          category: todoData.category || 'Personal',
          priority: todoData.priority || 'Media',
          dueDate: todoData.dueDate || null
        };
        dispatch({ type: ACTIONS.ADD_TODO, payload: fallbackTodo });
      }
    } catch (error) {
      console.error('❌ Error agregando tarea:', error);
      // Fallback: agregar con ID temporal
      const fallbackTodo = {
        id: Date.now() + Math.random(),
        text: todoData.text,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: todoData.category || 'Personal',
        priority: todoData.priority || 'Media',
        dueDate: todoData.dueDate || null
      };
      dispatch({ type: ACTIONS.ADD_TODO, payload: fallbackTodo });
    }
  };

  const toggleTodo = async (id) => {
    const todo = state.todos.find(t => t.id === id);
    if (!todo) return;

    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('todos')
          .update({
            completed: !todo.completed,
            completed_at: !todo.completed ? new Date().toISOString() : null,
            updated_at: new Date().toISOString()
          })
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;

        const updatedTodo = {
          ...todo,
          completed: data.completed,
          completedAt: data.completed_at,
          updatedAt: data.updated_at
        };

        dispatch({ 
          type: ACTIONS.EDIT_TODO, 
          payload: { id, updates: updatedTodo } 
        });
      } else {
        // Fallback a toggle local
        dispatch({ type: ACTIONS.TOGGLE_TODO, payload: id });
      }
    } catch (error) {
      console.error('Error actualizando tarea:', error);
    dispatch({ type: ACTIONS.TOGGLE_TODO, payload: id });
    }
  };

  const deleteTodo = async (id) => {
    try {
      if (supabase) {
        const { error } = await supabase
          .from('todos')
          .delete()
          .eq('id', id);

        if (error) throw error;
      }
      dispatch({ type: ACTIONS.DELETE_TODO, payload: id });
    } catch (error) {
      console.error('Error eliminando tarea:', error);
    dispatch({ type: ACTIONS.DELETE_TODO, payload: id });
    }
  };

  const editTodo = async (id, updates) => {
    try {
      if (supabase) {
        const updateData = {
          updated_at: new Date().toISOString()
        };

        if (updates.text !== undefined) updateData.text = updates.text;
        if (updates.category !== undefined) updateData.category = updates.category;
        if (updates.priority !== undefined) updateData.priority = updates.priority;
        if (updates.dueDate !== undefined) updateData.due_date = updates.dueDate;

        const { error } = await supabase
          .from('todos')
          .update(updateData)
          .eq('id', id);

        if (error) throw error;
      }

      dispatch({ type: ACTIONS.EDIT_TODO, payload: { id, updates } });
    } catch (error) {
      console.error('Error editando tarea:', error);
    dispatch({ type: ACTIONS.EDIT_TODO, payload: { id, updates } });
    }
  };

  const setFilter = (filter) => {
    dispatch({ type: ACTIONS.SET_FILTER, payload: filter });
  };

  const setSort = (sort) => {
    dispatch({ type: ACTIONS.SET_SORT, payload: sort });
  };

  const setSearch = (search) => {
    dispatch({ type: ACTIONS.SET_SEARCH, payload: search });
  };

  const clearCompleted = () => {
    dispatch({ type: ACTIONS.CLEAR_COMPLETED });
  };

  const bulkDelete = (ids) => {
    const newTodos = state.todos.filter(todo => !ids.includes(todo.id));
    dispatch({ type: ACTIONS.BULK_ACTIONS, payload: newTodos });
  };

  const bulkComplete = (ids) => {
    const newTodos = state.todos.map(todo =>
      ids.includes(todo.id)
        ? { ...todo, completed: true, completedAt: new Date().toISOString() }
        : todo
    );
    dispatch({ type: ACTIONS.BULK_ACTIONS, payload: newTodos });
  };

  const setPriority = (id, priority) => {
    dispatch({ type: ACTIONS.SET_PRIORITY, payload: { id, priority } });
  };

  const setDueDate = (id, dueDate) => {
    dispatch({ type: ACTIONS.SET_DUE_DATE, payload: { id, dueDate } });
  };

  const addCategory = (category) => {
    dispatch({ type: ACTIONS.SET_CATEGORY, payload: category });
  };

  const updateSettings = (settings) => {
    dispatch({ type: ACTIONS.UPDATE_SETTINGS, payload: settings });
    // Aplicar tema inmediatamente
    if (settings.theme) {
      if (settings.theme === 'dark') {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    }
  };

  // Funciones de filtrado y ordenamiento
  const getFilteredTodos = () => {
    let filtered = [...state.todos];

    // Filtrar por estado
    switch (state.filter) {
      case 'active':
        filtered = filtered.filter(todo => !todo.completed);
        break;
      case 'completed':
        filtered = filtered.filter(todo => todo.completed);
        break;
      case 'today':
        const today = new Date().toDateString();
        filtered = filtered.filter(todo => 
          todo.dueDate && 
          new Date(todo.dueDate).toDateString() === today
        );
        break;
    }

    // Filtrar por búsqueda
    if (state.search) {
      const searchLower = state.search.toLowerCase();
      filtered = filtered.filter(todo =>
        todo.text.toLowerCase().includes(searchLower) ||
        todo.category.toLowerCase().includes(searchLower)
      );
    }

    // Ordenar
    switch (state.sort) {
      case 'created':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'updated':
        filtered.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        break;
      case 'priority':
        const priorityOrder = { 'Alta': 3, 'Media': 2, 'Baja': 1 };
        filtered.sort((a, b) => (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0));
        break;
      case 'dueDate':
        filtered.sort((a, b) => {
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        });
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.text.localeCompare(b.text));
        break;
    }

    return filtered;
  };

  // Estadísticas avanzadas
  const getStats = () => {
    const total = state.todos.length;
    const completed = state.todos.filter(todo => todo.completed).length;
    const active = total - completed;
    
    const byCategory = state.categories.reduce((acc, category) => {
      acc[category] = state.todos.filter(todo => todo.category === category).length;
      return acc;
    }, {});

    const byPriority = state.priorities.reduce((acc, priority) => {
      acc[priority] = state.todos.filter(todo => todo.priority === priority).length;
      return acc;
    }, {});

    return {
      total,
      completed,
      active,
      byCategory,
      byPriority,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  };

  const value = {
    ...state,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    setFilter,
    setSort,
    setSearch,
    clearCompleted,
    bulkDelete,
    bulkComplete,
    setPriority,
    setDueDate,
    addCategory,
    updateSettings,
    getFilteredTodos,
    getStats,
    ACTIONS
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
