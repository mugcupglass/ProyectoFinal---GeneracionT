# 🚀 Instrucciones de Deployment - JAKY Todo List

## ✅ Lo que ya está listo

1. ✅ Supabase instalado (`@supabase/supabase-js`)
2. ✅ Cliente de Supabase configurado (`src/lib/supabase.js`)
3. ✅ TodoContext actualizado para usar Supabase
4. ✅ Fallback a localStorage si Supabase falla
5. ✅ `vercel.json` configurado para React

## 📋 Pasos para completar la configuración

### 1. Crear Proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) e inicia sesión
2. Crea un nuevo proyecto llamado "jaky-todo-list"
3. Espera 2-3 minutos mientras se crea

### 2. Crear las Tablas

Ve a **SQL Editor** en Supabase y ejecuta este script:

```sql
-- Tabla de tareas
CREATE TABLE todos (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  category TEXT DEFAULT 'Personal',
  priority TEXT DEFAULT 'Media',
  due_date TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de configuración
CREATE TABLE user_settings (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  auto_save BOOLEAN DEFAULT TRUE,
  theme TEXT DEFAULT 'light',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Políticas para todos (temporalmente permitir todo - cambiar cuando tengas auth)
CREATE POLICY "Allow all operations on todos"
  ON todos FOR ALL
  USING (true)
  WITH CHECK (true);

-- Políticas para settings (temporalmente permitir todo - cambiar cuando tengas auth)
CREATE POLICY "Allow all operations on settings"
  ON user_settings FOR ALL
  USING (true)
  WITH CHECK (true);

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_todos_updated_at BEFORE UPDATE ON todos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON user_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 3. Obtener Credenciales

En Supabase → **Settings** → **API**:
- Copia el **Project URL**
- Copia la **anon/public key**

### 4. Configurar Variables de Entorno Localmente

Crea un archivo `.env` en la raíz del proyecto:

```env
REACT_APP_SUPABASE_URL=https://tu-proyecto.supabase.co
REACT_APP_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

**Importante**: El archivo `.env` ya está en `.gitignore`, así que no se subirá a Git.

### 5. Probar Localmente

```bash
npm start
```

La app debería conectarse a Supabase automáticamente. Si hay errores, revisa la consola del navegador.

### 6. Desplegar en Vercel

#### Opción A: Vía Dashboard (Recomendada)

1. Ve a [vercel.com](https://vercel.com)
2. **New Project** → Importa tu repo de GitHub
3. En **Environment Variables**, agrega:
   - `REACT_APP_SUPABASE_URL` = Tu URL de Supabase
   - `REACT_APP_SUPABASE_ANON_KEY` = Tu anon key
4. Click **Deploy**

#### Opción B: Vía CLI

```bash
# Instalar Vercel CLI (si no lo tienes)
npm install -g vercel

# Login
vercel login

# Deploy (te pedirá las variables de entorno)
vercel
```

Cuando te pregunte por las variables, agrega:
- `REACT_APP_SUPABASE_URL`
- `REACT_APP_SUPABASE_ANON_KEY`

## ⚠️ Notas Importantes

### Sin Autenticación (Estado Actual)

Actualmente, **TODOS los usuarios comparten los mismos datos** porque no hay autenticación. Para un proyecto real:

1. Implementa Supabase Auth en el componente `Login.js`
2. Usa `user_id` para filtrar datos por usuario
3. Actualiza las políticas RLS en Supabase

### Mejoras Futuras

- [ ] Implementar autenticación real con Supabase Auth
- [ ] Agregar `user_id` a todas las consultas
- [ ] Actualizar políticas RLS para seguridad
- [ ] Agregar sincronización en tiempo real con Supabase Realtime

## 🔍 Verificar que funciona

1. Crea una tarea → Debe guardarse en Supabase
2. Marca como completada → Debe actualizar en Supabase
3. Elimina una tarea → Debe eliminarse de Supabase
4. Revisa en Supabase → **Table Editor** → `todos` → Deberías ver tus datos

## 📚 Recursos

- [Documentación Supabase](https://supabase.com/docs)
- [Documentación Vercel](https://vercel.com/docs)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript/introduction)

---

**¡Listo para deploy! 🚀**

