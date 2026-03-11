# 🚀 Pasos para Subir y Ver el Proyecto en Producción

Ahora que tenemos la configuración de variables de entorno lista, este es el proceso que debes seguir para que tu proyecto funcione perfectamente en GitHub y use los datos reales del servidor.

### 1. Preparación de los archivos .env
Asegúrate de que en la carpeta `Frontend/` tienes estos archivos:
- **`.env`**: con `VITE_API_URL=http://localhost:4000` (para tu PC).
- **`.env.production`**: con `VITE_API_URL=http://51.210.22.156:4000` (para producción).

### 2. Guardar y Subir a GitHub
Sigue estos comandos en tu terminal desde la raíz del proyecto para subir los cambios:

```bash
git add .
git commit -m "Configuración ready para producción"
git push origin main
```

### 3. El Proceso de Build (Si vas a desplegar)
Cuando se genera la versión de producción (ya sea en tu PC con `npm run build` o en una plataforma de despliegue), Vite hará lo siguiente:
1. Detectará que es un entorno de **producción**.
2. Buscará el archivo **`.env.production`**.
3. Reemplazará todas las veces que pusiste `import.meta.env.VITE_API_URL` por la IP `http://51.210.22.156:4000`.

### 4. Cómo comprobarlo localmente antes de subir
Si quieres estar 100% seguro de que en producción funcionará, puedes simularlo en tu PC:
1. En la carpeta `Frontend`, ejecuta: `npm run build`
2. Luego ejecuta: `npm run preview`
3. Abre el enlace que te dé. En ese momento, la app **estará intentando conectar con el servidor real** (la IP) y no con tu localhost.

### 5. Acceso a los datos en producción
Una vez el proyecto esté subido a GitHub y desplegado (por ejemplo en GitHub Pages o Vercel):
- Tu Frontend viajará por internet.
- Cada vez que necesite datos, llamará a: `http://51.210.22.156:4000/restaurants`.
- ¡Magia! Verás los datos reales del servidor externo.

---
> [!TIP]
> **Importante**: No borres los archivos `.env`. Si los borras, Vite no sabrá a dónde apuntar y los fetch fallarán.
