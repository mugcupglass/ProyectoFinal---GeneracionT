import React, { useState, useEffect } from 'react';
import { motivationalQuotes, shortMotivationalMessages, productivityTips } from '../data/motivationalQuotes';
import './MotivationalWidget.css';

const MotivationalWidget = ({ completedTasks = 0, totalTasks = 0 }) => {
  const [currentQuote, setCurrentQuote] = useState(null);
  const [currentTip, setCurrentTip] = useState(null);

  // Calcular porcentaje de progreso
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Cambiar frase motivacional cada 30 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
      setCurrentQuote(randomQuote);
    }, 30000);

    // Cargar frase inicial
    const initialQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setCurrentQuote(initialQuote);

    return () => clearInterval(interval);
  }, []);

  // Cambiar consejo de productividad cada 45 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      const randomTip = productivityTips[Math.floor(Math.random() * productivityTips.length)];
      setCurrentTip(randomTip);
    }, 45000);

    // Cargar consejo inicial
    const initialTip = productivityTips[Math.floor(Math.random() * productivityTips.length)];
    setCurrentTip(initialTip);

    return () => clearInterval(interval);
  }, []);

  const getMotivationalMessage = () => {
    if (progressPercentage === 100 && totalTasks > 0) {
      return "🎉 ¡Increíble! ¡Has completado todas tus tareas! ¡Eres una máquina de productividad! 🚀";
    } else if (progressPercentage >= 75) {
      return "🔥 ¡Excelente! Estás muy cerca de completar todo. ¡Sigue así! 💪";
    } else if (progressPercentage >= 50) {
      return "⭐ ¡Muy bien! Ya has completado la mitad. ¡Continúa con esa energía! 🎯";
    } else if (progressPercentage >= 25) {
      return "🚀 ¡Buen comienzo! Cada tarea completada te acerca a tus metas. ¡Sigue adelante! 💫";
    } else {
      return "💪 ¡Hora de empezar! Cada gran logro comienza con el primer paso. ¡Tú puedes! 🌟";
    }
  };

  return (
    <div className="motivational-widget">
      <div className="motivational-content">
        {/* Mensaje de progreso */}
        <div className="progress-message">
          <div className="progress-text">
            {getMotivationalMessage()}
          </div>
          <div className="progress-stats">
            {completedTasks} de {totalTasks} tareas completadas ({progressPercentage}%)
          </div>
        </div>

        {/* Frase motivacional */}
        {currentQuote && (
          <div className="quote-section">
            <div className="quote-text">
              "{currentQuote.text}"
            </div>
            <div className="quote-author">
              — {currentQuote.author}
            </div>
            <div className="quote-category">
              #{currentQuote.category}
            </div>
          </div>
        )}

        {/* Consejo de productividad */}
        {currentTip && (
          <div className="tip-section">
            <div className="tip-icon">💡</div>
            <div className="tip-text">
              {currentTip}
            </div>
          </div>
        )}

        {/* Barra de progreso visual */}
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="progress-percentage">
            {progressPercentage}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotivationalWidget;
