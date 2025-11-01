# 🚀 Guía de Configuración de Supabase y Vercel

## 📋 Paso 1: Crear Proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta (o inicia sesión)
2. Haz clic en "New Project"
3. Completa la información:
   - **Name**: jaky-todo-list (o el nombre que prefieras)
   - **Database Password**: Guarda esta contraseña de forma segura
   - **Region**: Elige la más cercana
4. Espera a que se cree el proyecto (2-3 minutos)

## 🔑 Paso 2: Obtener Credenciales de Supabase

1. En tu proyecto de Supabase, ve a **Settings** → **API**
2. Copia los siguientes valores:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: La clave pública (anon key)

## 🗄️ Paso 3: Crear Tablas en Supabase

1. Ve a **SQL Editor** en tu proyecto de Supabase
2. Ejecuta el siguiente script SQL:

```sql
-- Tabla de tareas (todos)
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

-- Tabla de configuración (settings)
CREATE TABLE user_settings (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  auto_save BOOLEAN DEFAULT TRUE,
  theme TEXT DEFAULT 'light',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para todos (sin autenticación - para desarrollo)
-- IMPORTANTE: Estas políticas permiten acceso público. Actualiza cuando implementes auth.
CREATE POLICY "Allow all operations on todos"
  ON todos FOR ALL
  USING (true)
  WITH CHECK (true);

-- Políticas RLS para settings (sin autenticación - para desarrollo)
CREATE POLICY "Allow all operations on settings"
  ON user_settings FOR ALL
  USING (true)
  WITH CHECK (true);

-- Trigger para actualizar updated_at automáticamente
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

## 📝 Paso 4: Configurar Variables de Entorno Localmente

1. Crea un archivo `.env` en la raíz del proyecto (junto a `package.json`)
2. Agrega las siguientes variables:

```env
REACT_APP_SUPABASE_URL=https://xxxxx.supabase.co
REACT_APP_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

3. **IMPORTANTE**: Agrega `.env` a tu `.gitignore` para no subir las credenciales a Git

## 🌐 Paso 5: Desplegar en Vercel

### Opción A: Desde la línea de comandos

1. Instala Vercel CLI (si no lo tienes):
```bash
npm install -g vercel
```

2. Inicia sesión:
```bash
vercel login
```

3. Despliega:
```bash
vercel
```

4. Cuando te pregunte por las variables de entorno, agrega:
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_ANON_KEY`

### Opción B: Desde el Dashboard de Vercel

1. Ve a [vercel.com](https://vercel.com) y crea una cuenta (o inicia sesión)
2. Haz clic en "Add New Project"
3. Importa tu repositorio de GitHub/GitLab
4. En **Environment Variables**, agrega:
   - `REACT_APP_SUPABASE_URL` = Tu URL de Supabase
   - `REACT_APP_SUPABASE_ANON_KEY` = Tu anon key de Supabase
5. Haz clic en "Deploy"

## ✅ Verificación

1. Una vez desplegado, tu aplicación debería funcionar con Supabase
2. Las tareas ahora se guardan en la base de datos en lugar de localStorage
3. Los datos se sincronizarán entre dispositivos si el usuario está autenticado

## 🔐 Configuración de Autenticación (Opcional)

Si quieres usar autenticación real de Supabase, puedes modificar el componente `Login.js` para usar Supabase Auth. Por ahora, la aplicación funciona sin autenticación, pero cada usuario tendrá sus propios datos cuando se implemente.

## 📚 Recursos

- [Documentación de Supabase](https://supabase.com/docs)
- [Documentación de Vercel](https://vercel.com/docs)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript/introduction)

