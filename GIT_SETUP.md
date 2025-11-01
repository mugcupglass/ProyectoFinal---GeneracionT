# 📦 Guía para Crear Repositorio en Git

## 📋 Pasos Completos

### Paso 1: Inicializar Git Localmente

Ejecuta estos comandos en tu terminal (estando en el directorio del proyecto):

```bash
# Ir al directorio del proyecto
cd "C:\Users\JOATK\OneDrive\Escritorio\Nueva carpeta (2)\JAKY 3 - falta backend\JAKY 3"

# Inicializar Git (si no está inicializado)
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "Initial commit: JAKY Todo List con Supabase"
```

### Paso 2: Crear Repositorio en GitHub

1. **Ve a GitHub**
   - Abre [github.com](https://github.com) en tu navegador
   - Inicia sesión o crea una cuenta si no tienes

2. **Crear nuevo repositorio**
   - Haz clic en el botón **"+"** en la esquina superior derecha
   - Selecciona **"New repository"**

3. **Configurar el repositorio**
   - **Repository name**: `jaky-todo-list` (o el nombre que prefieras)
   - **Description**: "Aplicación To-Do List con React y Supabase"
   - **Visibility**: Elige "Public" o "Private"
   - ⚠️ **NO marques** "Initialize this repository with a README" (ya tienes archivos)
   - Haz clic en **"Create repository"**

4. **Copiar la URL del repositorio**
   - GitHub te mostrará la URL, algo como: `https://github.com/tu-usuario/jaky-todo-list.git`
   - **Copia esa URL**

### Paso 3: Conectar tu Repositorio Local con GitHub

Ejecuta estos comandos (reemplaza `TU_URL` con la URL que copiaste):

```bash
# Agregar el repositorio remoto
git remote add origin TU_URL_DEL_REPOSITORIO

# Renombrar la rama principal a 'main' (si es necesario)
git branch -M main

# Subir el código a GitHub
git push -u origin main
```

### Paso 4: Verificar

1. Refresca la página de GitHub
2. Deberías ver todos tus archivos
3. ✅ ¡Tu repositorio está listo!

## 🔐 Importante: Seguridad

### Verificar que .env no se suba

El archivo `.env` debería estar en `.gitignore`. Verifica:

```bash
# Verificar que .env está en .gitignore
cat .gitignore | grep .env
```

Si no aparece, agrega esta línea a `.gitignore`:
```
.env
.env.local
```

## 📝 Comandos Rápidos (Resumen)

```bash
# Si Git no está inicializado:
git init
git add .
git commit -m "Initial commit: JAKY Todo List"

# Conectar con GitHub (después de crear el repo en GitHub):
git remote add origin https://github.com/tu-usuario/jaky-todo-list.git
git branch -M main
git push -u origin main
```

## 🐛 Problemas Comunes

### Error: "fatal: remote origin already exists"
```bash
git remote remove origin
git remote add origin TU_URL
```

### Error: "Authentication failed"
- Necesitas configurar tu token de GitHub
- Ve a GitHub Settings → Developer settings → Personal access tokens
- O usa GitHub Desktop para facilitar la autenticación

### Error: "branch 'main' does not exist"
```bash
git checkout -b main
# o
git branch -M main
```

## ✅ Checklist

- [ ] Git inicializado localmente
- [ ] Primer commit realizado
- [ ] Repositorio creado en GitHub
- [ ] Repositorio local conectado con GitHub
- [ ] Código subido (push) a GitHub
- [ ] `.env` NO está en el repositorio (está en `.gitignore`)

## 🚀 Siguiente Paso

Una vez que tu código esté en GitHub:
- Ve a Vercel
- Importa tu repositorio
- ¡Deploy!

