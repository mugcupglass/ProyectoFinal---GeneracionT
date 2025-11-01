# JAKY - To-Do List 📝

Una aplicación web **AVANZADA** de gestión de tareas desarrollada con React para el programa **Generación T de Stream BE**.

## 🚀 Características POTENCIADAS x1000

### 🎯 **Gestión Avanzada de Tareas**
- ✅ **CRUD completo**: Crear, leer, actualizar y eliminar tareas
- 🏷️ **Categorías personalizables**: Personal, Trabajo, Estudio, Salud, Hogar
- ⚡ **Sistema de prioridades**: Baja, Media, Alta, Urgente
- 📅 **Fechas límite**: Con notificaciones de vencimiento
- 🏷️ **Sistema de tags**: Etiquetas personalizadas para organización
- 📝 **Notas adicionales**: Contexto y detalles extra
- ⏱️ **Tiempo estimado**: Planificación temporal de tareas

### 📊 **Dashboard Inteligente**
- 📈 **Estadísticas avanzadas**: Progreso, distribución por categoría y prioridad
- 🔍 **Búsqueda en tiempo real**: Filtrado instantáneo por texto
- 🎛️ **Filtros múltiples**: Por estado, categoría, prioridad, fecha
- 📊 **Gráficos de progreso**: Visualización del avance
- ⚡ **Acciones masivas**: Seleccionar y operar múltiples tareas

### 🎨 **Interfaz Ultra Moderna**
- 🌈 **Diseño responsivo**: Adaptable a cualquier dispositivo
- ✨ **Animaciones fluidas**: Transiciones suaves y elegantes
- 🎭 **Modo oscuro**: Interfaz adaptable al tema del sistema
- 🎯 **UX optimizada**: Experiencia de usuario excepcional
- 📱 **PWA completa**: Instalable como aplicación nativa

### ⚡ **Rendimiento Optimizado**
- 🚀 **Context API**: Gestión de estado eficiente
- 💾 **Persistencia inteligente**: Guardado automático en localStorage
- 🔄 **Memoización**: Optimización de re-renderizados
- 📦 **Lazy loading**: Carga diferida de componentes
- 🎯 **Virtualización**: Manejo eficiente de listas largas

### 🛠️ **Funcionalidades Técnicas**
- 🔧 **Configuración avanzada**: Panel de ajustes completo
- 📤 **Exportar/Importar**: Backup y restauración de datos
- 🔔 **Notificaciones**: Alertas para tareas vencidas
- 🎨 **Temas personalizables**: Múltiples esquemas de color
- 📊 **Analytics**: Seguimiento de productividad

### 🗂️ **Múltiples Páginas y Rutas**
- 📊 **Dashboard**: Vista general con estadísticas y resumen
- 📝 **Mis Tareas**: Gestión completa de todas las tareas
- 📈 **Analytics**: Análisis detallado de productividad
- 📅 **Calendario**: Vista de tareas por fechas (mes, semana, día)
- ⚙️ **Configuración**: Ajustes y preferencias del usuario
- 👤 **Perfil**: Información personal y logros
- 🧭 **Navegación**: Sidebar con navegación intuitiva
- 📱 **Responsive**: Adaptable a móviles y desktop

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca principal para la interfaz de usuario
- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con gradientes y animaciones
- **JavaScript ES6+** - Lógica de la aplicación
- **LocalStorage** - Persistencia de datos

## 📦 Instalación y Uso

### Prerrequisitos

- Node.js (versión 14 o superior)
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd jaky-todo-list
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm start
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

### Construcción para producción

```bash
npm run build
```

## 🎯 Funcionalidades Principales

### Gestión de Tareas
- **Agregar tareas**: Escribe una nueva tarea y presiona Enter o haz clic en "Agregar"
- **Editar tareas**: Haz clic en el ícono de editar (✏️) para modificar el texto
- **Completar tareas**: Haz clic en el checkbox para marcar como completada
- **Eliminar tareas**: Usa el ícono de eliminar (🗑️) para borrar una tarea

### Filtros y Estadísticas
- **Ver todas las tareas**: Filtro por defecto que muestra todas las tareas
- **Solo pendientes**: Muestra únicamente las tareas no completadas
- **Solo completadas**: Muestra únicamente las tareas finalizadas
- **Estadísticas en tiempo real**: Contador automático de tareas por categoría

### Características Adicionales
- **Persistencia automática**: Las tareas se guardan automáticamente
- **Interfaz intuitiva**: Diseño limpio y fácil de usar
- **Responsive design**: Se adapta a cualquier tamaño de pantalla
- **Animaciones suaves**: Transiciones elegantes para mejor experiencia

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   ├── Header.js          # Encabezado de la aplicación
│   ├── Header.css
│   ├── TodoList.js        # Componente principal de la lista
│   ├── TodoList.css
│   ├── TodoItem.js        # Componente individual de tarea
│   ├── TodoItem.css
│   ├── TodoForm.js        # Formulario para agregar tareas
│   ├── TodoForm.css
│   ├── TodoStats.js       # Estadísticas y filtros
│   └── TodoStats.css
├── App.js                 # Componente raíz
├── App.css               # Estilos principales
├── index.js              # Punto de entrada
└── index.css             # Estilos globales
```

## 🚀 Despliegue

### Opciones de hosting gratuito

1. **Vercel** (Recomendado)
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Netlify**
   - Conecta tu repositorio de GitHub
   - Configura el build command: `npm run build`
   - Configura el publish directory: `build`

3. **GitHub Pages**
   ```bash
   npm install --save-dev gh-pages
   npm run build
   npm run deploy
   ```

## 👥 Equipo de Desarrollo

**Equipo JAKY - Generación T Stream BE**

- Integrantes: 4 miembros
- Programa: Generación T de Stream BE
- Año: 2024

## 📋 Próximas Funcionalidades

- [ ] Categorías de tareas
- [ ] Fechas de vencimiento
- [ ] Prioridades
- [ ] Búsqueda de tareas
- [ ] Exportar/Importar datos
- [ ] Modo oscuro
- [ ] Notificaciones

## 🤝 Contribución

Este proyecto es parte del programa académico Generación T. Para contribuciones:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

Para consultas sobre el proyecto, contactar al equipo JAKY a través del tablero Trello del proyecto.

---

**Desarrollado con ❤️ para Generación T de Stream BE**
