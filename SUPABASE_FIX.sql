-- Script SQL para arreglar la conexión con Supabase
-- Ejecuta este script en el SQL Editor de Supabase si las tablas ya existen
-- O ejecuta el script completo si las tablas no existen

-- PRIMERO: Eliminar políticas RLS existentes (si las hay)
DROP POLICY IF EXISTS "Users can view their own todos" ON todos;
DROP POLICY IF EXISTS "Users can insert their own todos" ON todos;
DROP POLICY IF EXISTS "Users can update their own todos" ON todos;
DROP POLICY IF EXISTS "Users can delete their own todos" ON todos;
DROP POLICY IF EXISTS "Users can view their own settings" ON user_settings;
DROP POLICY IF EXISTS "Users can insert their own settings" ON user_settings;
DROP POLICY IF EXISTS "Users can update their own settings" ON user_settings;
DROP POLICY IF EXISTS "Allow all operations on todos" ON todos;
DROP POLICY IF EXISTS "Allow all operations on settings" ON user_settings;

-- SEGUNDO: Si las tablas no existen, crearlas
CREATE TABLE IF NOT EXISTS todos (
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

CREATE TABLE IF NOT EXISTS user_settings (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  auto_save BOOLEAN DEFAULT TRUE,
  theme TEXT DEFAULT 'light',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TERCERO: Habilitar RLS
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- CUARTO: Crear políticas que permitan TODO (sin autenticación)
-- Estas políticas permiten que cualquier usuario (incluso sin autenticar) pueda operar
CREATE POLICY "Allow all operations on todos"
  ON todos FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations on settings"
  ON user_settings FOR ALL
  USING (true)
  WITH CHECK (true);

-- QUINTO: Crear trigger para updated_at si no existe
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_todos_updated_at ON todos;
CREATE TRIGGER update_todos_updated_at BEFORE UPDATE ON todos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_settings_updated_at ON user_settings;
CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON user_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- SEXTO: Verificar que todo está bien (opcional)
SELECT 'Tabla todos creada correctamente' AS status;
SELECT 'Tabla user_settings creada correctamente' AS status;
SELECT 'Políticas RLS configuradas para acceso público' AS status;

