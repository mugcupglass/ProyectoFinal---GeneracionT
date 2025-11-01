# 🔧 Arreglar Conexión con Supabase

Si el proyecto no se comunica correctamente con la base de datos, sigue estos pasos:

## 🔍 Diagnóstico

Primero, abre la consola del navegador (F12) y revisa los mensajes de error. Verás mensajes específicos sobre qué está fallando.

## ⚠️ Problema Común: Políticas RLS

El problema más común es que las **políticas RLS (Row Level Security)** están configuradas para requerir autenticación, pero tu aplicación no tiene autenticación implementada aún.

## ✅ Solución: Ejecutar Script SQL Corregido

1. **Abre tu proyecto en Supabase**
   - Ve a [supabase.com](https://supabase.com)
   - Selecciona tu proyecto

2. **Ve al SQL Editor**
   - En el menú lateral, haz clic en **"SQL Editor"**
   - Haz clic en **"New Query"**

3. **Ejecuta el script de corrección**
   - Abre el archivo `SUPABASE_FIX.sql` en tu proyecto
   - Copia TODO el contenido
   - Pégalo en el SQL Editor de Supabase
   - Haz clic en **"Run"** o presiona `Ctrl+Enter`

4. **Verifica que funcionó**
   - Deberías ver mensajes de éxito
   - Ve a **"Table Editor"** → `todos`
   - Deberías poder ver la tabla (aunque esté vacía)

## 🧪 Probar la Conexión

Después de ejecutar el script:

1. **Recarga la aplicación** en tu navegador
2. **Abre la consola** (F12)
3. **Crea una nueva tarea**
4. Deberías ver mensajes como:
   - `✅ Guardando tarea en Supabase...`
   - `✅ Tarea guardada en Supabase: {...}`

## 🔍 Verificar en Supabase

1. Ve a **Table Editor** en Supabase
2. Selecciona la tabla **`todos`**
3. Deberías ver las tareas que creaste desde la aplicación

## ❌ Si Aún No Funciona

Si después de ejecutar el script sigue sin funcionar:

1. **Revisa la consola del navegador** (F12)
   - Busca mensajes de error específicos
   - Copia el mensaje de error completo

2. **Verifica las variables de entorno**
   - Asegúrate de que el archivo `.env` tiene los valores correctos
   - Reinicia el servidor (`npm start`)

3. **Verifica que las tablas existen**
   - En Supabase → Table Editor
   - Deberías ver las tablas `todos` y `user_settings`

4. **Verifica las políticas RLS**
   - En Supabase → Authentication → Policies
   - Deberías ver políticas que dicen "Allow all operations"

## 📝 Nota sobre Seguridad

Las políticas actuales permiten acceso público sin autenticación. Esto está bien para desarrollo, pero cuando implementes autenticación real, deberás actualizar las políticas para que requieran autenticación.

