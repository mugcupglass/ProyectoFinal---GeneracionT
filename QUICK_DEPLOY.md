# 🚀 Deployment Rápido en Vercel

## Opción 1: Desde el Dashboard (Recomendada - 5 minutos)

### Paso 1: Preparar tu código en Git
Si tu código aún no está en GitHub/GitLab:
```bash
# Asegúrate de estar en el directorio del proyecto
cd "C:\Users\JOATK\OneDrive\Escritorio\Nueva carpeta (2)\JAKY 3 - falta backend\JAKY 3"

# Si no tienes git inicializado:
git init
git add .
git commit -m "Preparado para deploy en Vercel"

# Crear repositorio en GitHub y luego:
git remote add origin TU_URL_DEL_REPO
git push -u origin main
```

### Paso 2: Crear cuenta en Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en "Sign Up" (puedes usar tu cuenta de GitHub)
3. Conecta tu cuenta de GitHub/GitLab

### Paso 3: Importar proyecto
1. En Vercel, haz clic en **"Add New Project"**
2. Selecciona tu repositorio
3. Haz clic en **"Import"**

### Paso 4: Configurar
- Framework: Vercel lo detectará automáticamente como "Create React App"
- Build Command: `npm run build` (debería estar automático)
- Output Directory: `build` (debería estar automático)

### Paso 5: Variables de Entorno ⚠️ IMPORTANTE
En la sección **"Environment Variables"**, agrega:

**Variable 1:**
- Nombre: `REACT_APP_SUPABASE_URL`
- Valor: `https://vkiblirvfeuuzqglbqnr.supabase.co`

**Variable 2:**
- Nombre: `REACT_APP_SUPABASE_ANON_KEY`
- Valor: (Tu anon key completa)

### Paso 6: Deploy
1. Haz clic en **"Deploy"**
2. Espera 2-3 minutos
3. ¡Listo! Tu app estará en una URL como `https://tu-proyecto.vercel.app`

## Opción 2: Desde la Terminal (CLI)

```bash
# 1. Instalar Vercel CLI (si no lo tienes)
npm install -g vercel

# 2. Ir al directorio del proyecto
cd "C:\Users\JOATK\OneDrive\Escritorio\Nueva carpeta (2)\JAKY 3 - falta backend\JAKY 3"

# 3. Login en Vercel
vercel login

# 4. Deploy (primera vez)
vercel

# 5. Cuando te pregunte por las variables de entorno:
# - Responde "Yes" para cada una
# - REACT_APP_SUPABASE_URL = https://vkiblirvfeuuzqglbqnr.supabase.co
# - REACT_APP_SUPABASE_ANON_KEY = (tu key)

# 6. Deploy a producción
vercel --prod
```

## ✅ Verificar que funciona

1. Abre la URL que Vercel te dio
2. Abre la consola del navegador (F12)
3. Crea una tarea de prueba
4. Verifica en Supabase que se guardó

## 🔄 Actualizaciones Futuras

Cada vez que hagas `git push`, Vercel desplegará automáticamente los cambios.

