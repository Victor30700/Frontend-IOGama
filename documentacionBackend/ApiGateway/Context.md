# 🌐 Smart Gateway: Núcleo de Enrutamiento y Seguridad

Este proyecto actúa como la **Pasarela Inteligente (Smart Gateway)** del ecosistema IO GAMA. Centraliza la seguridad, la documentación y el tráfico hacia los microservicios mediante **YARP (Yet Another Reverse Proxy)**.

---

## 1. Arquitectura y Seguridad

### 🛡️ Validación Centralizada de JWT
El Gateway es el **Portero** del sistema. Antes de que una petición llegue a un microservicio:
1. El Gateway valida la **firma y expiración** del Token JWT.
2. Si el Token es inválido o no existe (en rutas protegidas), el Gateway responde inmediatamente con `401 Unauthorized`.
3. Esto descarga a los microservicios de la tarea de validación de firma y asegura que solo tráfico auténtico circule por la red interna.

### 🔄 Enrutamiento Dual (Clean & Swagger Style)
Hemos implementado un sistema de transformación de rutas para mayor flexibilidad:
- **Clean Routes:** Permite URLs elegantes como `/api/users/Auth/login`.
- **Swagger Style:** Soporta el formato por defecto de los microservicios `/api/users/api/...` para total compatibilidad con la UI de Swagger.

---

## 2. Guía de Integración para React (Vite)

Para conectar el Frontend de React con el ecosistema, sigue estas pautas:

### Configuración de Base URL
En tu archivo `.env` o de configuración de Axios:
```javascript
// .env
VITE_API_GATEWAY_URL=https://localhost:7149
```

### Ejemplo de Cliente Axios (Recomendado)
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_GATEWAY_URL,
});

// Interceptor para añadir el Token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Ejemplo de Llamada a UserManagement (Login)
export const login = async (credentials) => {
  // Nota: Usamos la ruta limpia /api/users/Auth/login
  const response = await api.post('/api/users/Auth/login', credentials);
  return response.data;
};

// Ejemplo de Llamada a Construction (Obtener Proyectos)
export const getProjects = async () => {
  const response = await api.get('/api/construction/Projects');
  return response.data;
};
```

---

## 3. Swagger Unificado
El Gateway reescribe dinámicamente el JSON de Swagger de cada microservicio para inyectar el prefijo correcto.
- **Acceso:** `https://localhost:7149/swagger`
- **Uso:** Selecciona el microservicio en el menú desplegable superior derecho. El botón "Execute" funcionará directamente a través de la pasarela.

---

## 4. Troubleshooting Local
1. **SSL:** Asegúrate de que tu navegador/cliente acepte el certificado de desarrollo de ASP.NET Core.
2. **Puertos:** El Gateway corre en `7149` (HTTPS). Los microservicios deben estar en `7171` (UserManagement) y `7210` (Construction).
