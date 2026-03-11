# 🌐 Guía de Configuración para Producción (Vite)

Para que tu proyecto funcione tanto en tu ordenador (**Local**) como cuando lo subas a **GitHub/Producción**, debemos usar variables de entorno. 

> [!IMPORTANT]
> Los archivos `.env` de los que hablamos aquí **DEBEN ir en la carpeta `Frontend`**, ya que es Vite quien necesita leerlos para construir la aplicación.

### Paso 1: Crear los archivos en la carpeta `Frontend/`

Debes tener dos archivos en la raíz de tu carpeta `Frontend`:

1.  **`.env`** (Para cuando trabajas en tu PC):
    ```env
    VITE_API_URL=http://localhost:4000
    ```

2.  **`.env.production`** (Para cuando el proyecto esté en internet):
    ```env
    VITE_API_URL=http://51.210.22.156:4000
    ```

---

### Paso 2: Usar la variable en tu código JavaScript

En lugar de escribir la URL a mano (`"http://localhost:4000..."`), usaremos la variable global de Vite.

**Ejemplo en un componente:**

```javascript
// 1. Definimos la URL usando el enviroment de Vite
const API_URL = import.meta.env.VITE_API_URL;

// 2. La usamos en el fetch
fetch(`${API_URL}/restaurants`)
  .then(res => res.json())
  .then(data => console.log(data));
```

---

### Paso 3: ¿Por qué hacerlo así?

1.  **Automatización**: Cuando ejecutas `npm run dev`, Vite usa automáticamente el archivo `.env`.
2.  **Seguridad y Despliegue**: Cuando ejecutas `npm run build` para subirlo a producción, Vite detecta que es para producción y "sustituye" la variable por la IP real (`51.210.22.156`).
3.  **Sin ERRORES**: Así no tienes que estar cambiando las URLs a mano cada vez que subes cambios a GitHub, evitando que se te olvide cambiar alguna y la aplicación falle en producción.

### Resumen de carpetas:
- **`Backend/`**: Tiene sus propios `.env` para la base de datos (DB_USER, DB_PASS).
- **`Frontend/`**: TIENE QUE TENER los suyos (`VITE_API_URL`) para saber a qué servidor preguntar.
