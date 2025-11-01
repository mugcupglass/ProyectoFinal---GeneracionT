# 🚀 Guía de Deployment en Vercel

## ✅ Pre-requisitos Completados

- ✅ Supabase configurado y funcionando
- ✅ Variables de entorno configuradas localmente
- ✅ vercel.json configurado

## 📋 Pasos para Desplegar en Vercel

### Opción A: Desde el Dashboard de Vercel (Recomendada - Más Fácil)

1. **Preparar tu repositorio**
   - Asegúrate de que tu código esté en GitHub, GitLab o Bitbucket
   - Haz commit y push de todos los cambios

2. **Crear cuenta en Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Haz clic en "Sign Up" (puedes usar tu cuenta de GitHub)

3. **Importar proyecto**
   - Una vez dentro de Vercel, haz clic en "Add New Project"
   - Selecciona tu repositorio de Git
   - Haz clic en "Import"

4. **Configurar el proyecto**
   - **Framework Preset**: Vercel debería detectar automáticamente "Create React App"
   - **Root Directory**: Dejar vacío (o `./` si es necesario)
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

5. **Configurar Variables de Entorno**
   - En la sección "Environment Variables", haz clic en "Add"
   - Agrega estas dos variables:
   
   ```
   REACT_APP_SUPABASE_URL
   ```
   - Valor: Tu URL de Supabase (ej: `https://vkiblirvfeuuzqglbqnr.supabase.co`)
   
   ```
   REACT_APP_SUPABASE_ANON_KEY
   ```
   - Valor: Tu anon key de Supabase

6. **Desplegar**
   - Haz clic en "Deploy"
   - Espera 2-3 minutos mientras Vercel construye y despliega tu aplicación
   - Cuando termine, verás un enlace a tu aplicación en vivo

### Opción B: Desde la Línea de Comandos (CLI)

1. **Instalar Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Iniciar sesión**
   ```bash
   vercel login
   ```
   - Te pedirá que abras tu navegador para autenticarte

3. **Desplegar**
   ```bash
   cd "C:\Users\JOATK\OneDrive\Escritorio\Nueva carpeta (2)\JAKY 3 - falta backend\JAKY 3"
   vercel
   ```

4. **Configurar variables de entorno durante el deploy**
   - Cuando te pregunte por las variables de entorno, responde "Yes"
   - Agrega las variables una por una:
     - `REACT_APP_SUPABASE_URL` = `https://vkiblirvfeuuzqglbqnr.supabase.co`
     - `REACT_APP_SUPABASE_ANON_KEY` = Tu anon key

5. **Desplegar a producción**
   ```bash
   vercel --prod
   ```

## 🔧 Configuración Post-Deployment

### Verificar que funciona

1. Visita la URL que Vercel te proporciona
2. Abre la consola del navegador (F12)
3. Verifica que no haya errores de Supabase
4. Crea una tarea de prueba
5. Verifica en Supabase que la tarea se guardó

### Agregar dominio personalizado (Opcional)

1. En el dashboard de Vercel, ve a tu proyecto
2. Settings → Domains
3. Agrega tu dominio personalizado

## ⚠️ Importante: Variables de Entorno

**NUNCA** subas el archivo `.env` a Git. Asegúrate de que esté en `.gitignore`.

Las variables de entorno deben configurarse en Vercel, no en el código.

## 📝 Checklist Antes de Deploy

- [ ] Código en Git (GitHub/GitLab/Bitbucket)
- [ ] `.env` está en `.gitignore`
- [ ] Variables de entorno configuradas en Vercel
- [ ] Proyecto construye correctamente (`npm run build` funciona localmente)
- [ ] Supabase está funcionando correctamente

## 🐛 Troubleshooting

### Error: Variables de entorno no encontradas
- Verifica que hayas agregado las variables en Vercel
- Asegúrate de que los nombres sean exactamente: `REACT_APP_SUPABASE_URL` y `REACT_APP_SUPABASE_ANON_KEY`

### Error: Build falla
- Verifica los logs de build en Vercel
- Asegúrate de que `npm run build` funciona localmente

### Error: La app no se conecta a Supabase
- Verifica que las variables de entorno estén configuradas correctamente en Vercel
- Revisa la consola del navegador en la app desplegada
- Verifica que las políticas RLS en Supabase permitan acceso público

## 🎉 ¡Listo!

Una vez desplegado, tu aplicación estará disponible en una URL como:
`https://tu-proyecto.vercel.app`

Cada vez que hagas push a tu repositorio, Vercel desplegará automáticamente los cambios.

