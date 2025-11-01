import { useCallback } from 'react';

// Hook simplificado para optimización básica
export const usePerformance = () => {
  // Memoizar estadísticas básicas
  const memoizedStats = useCallback((todos) => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;
    
    const byCategory = todos.reduce((acc, todo) => {
      acc[todo.category] = (acc[todo.category] || 0) + 1;
      return acc;
    }, {});

    const byPriority = todos.reduce((acc, todo) => {
      acc[todo.priority] = (acc[todo.priority] || 0) + 1;
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
  }, []);

  return {
    memoizedStats
  };
};

export default usePerformance;
