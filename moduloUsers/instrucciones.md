Actúa como un Senior Frontend Engineer experto en React, TypeScript y Tailwind CSS. Tu objetivo es desarrollar e implementar el código para la "Fase 1: Núcleo de Autenticación y Seguridad" del proyecto Frontend de "IO GAMA Construcciones".

**Contexto del Proyecto:**
- Entorno: Vite + React + TypeScript.
- Estilos: Tailwind CSS y `lucide-react` para iconos. Color corporativo principal: `blue-600`.
- Estado global: `zustand`.
- Peticiones: `axios` apuntando al API Gateway.
- Formularios: `react-hook-form` + `@hookform/resolvers/zod` + `zod`.
- Dominio: La aplicación es Single-Tenant (solo para IO-GAMA).

**Configuración Previa Requerida (Ten esto en cuenta para tus referencias):**
La variable de entorno en `.env` es `VITE_API_GATEWAY_URL=https://localhost:7149`.
Las rutas de la API deben usar el formato Clean Route del Gateway. Ejemplo: `/api/users/Auth/login`.

Por favor, crea o actualiza los siguientes archivos aplicando las mejores prácticas de código limpio, manejo de errores y tipado estricto:

**PASO 1: Tipos e Interfaces (src/types/auth.ts)**
Crea las interfaces necesarias:
- `LoginCredentials` (email, password).
- `ChangePasswordRequest` (currentPassword, newPassword).
- `AuthResponse` (token, refreshToken, userContext).
- `User` (email, role, etc., según lo que devuelva el token/contexto).

**PASO 2: Estado Global (src/store/authStore.ts)**
Implementa un store con Zustand (`useAuthStore`) que maneje:
- `token`: string | null (guardado solo en memoria/estado de Zustand).
- `refreshToken`: string | null (guardado en LocalStorage).
- `isAuthenticated`: boolean.
- Funciones: `setTokens(token, refreshToken)`, `logout()` (limpia estado y LocalStorage).

**PASO 3: Interceptores y API (src/config/api.ts) - HU-FRONT-02**
Crea una instancia de Axios (`api`):
1. `baseURL` apuntando a `import.meta.env.VITE_API_GATEWAY_URL`.
2. Interceptor de Request: Inyecta el `token` del store de Zustand en el header `Authorization: Bearer`.
3. Interceptor de Response: Captura errores `401 Unauthorized`. 
   - Si ocurre un 401, pausa las peticiones, llama a `POST /api/users/Auth/refresh-token` enviando el refresh token actual.
   - Si tiene éxito, actualiza el store de Zustand y reintenta las peticiones pausadas.
   - Si falla, ejecuta `logout()` y redirige al inicio.

**PASO 4: Pantalla de Login (src/features/auth/Login.tsx) - HU-FRONT-01**
Crea el componente de Login:
- Un diseño corporativo, limpio y centrado.
- Formulario con `react-hook-form` y validación con `zod` (Email válido, Password requerido).
- Al hacer submit, consumir `api.post('/api/users/Auth/login', data)`.
- Manejo de estados de carga (deshabilitar botón) y visualización de errores genéricos (ej. credenciales inválidas).
- Al recibir éxito, guardar tokens en el store y usar `react-router-dom` (`useNavigate`) para redirigir a `/`.

**PASO 5: Cambio de Contraseña (src/features/auth/ChangePassword.tsx) - HU-FRONT-03**
Crea un componente (puede ser renderizado dentro de una vista de perfil):
- Formulario con validación Zod: `currentPassword` y `newPassword` (con validación de seguridad mínima).
- Consumir `api.post('/api/users/Auth/change-password', data)`.
- Al tener éxito (Status 200), invocar `logout()` del store y redirigir obligatoriamente al login por seguridad.

**Instrucción Final:**
Genera el código completo para estos 5 archivos. Asegúrate de que las importaciones coincidan con la estructura de carpetas (`src/features`, `src/store`, `src/config`, etc.). No uses placeholders genéricos, escribe la lógica de reintento del interceptor de axios completa.