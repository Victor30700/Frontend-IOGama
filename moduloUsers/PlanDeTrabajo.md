# Plan de Trabajo - Fase 1: Núcleo de Autenticación y Seguridad

Este plan de trabajo detalla los pasos para la implementación del sistema de autenticación y seguridad para el proyecto **IO GAMA Construcciones**, siguiendo las instrucciones del archivo `instrucciones.md`.

## Objetivo
Desarrollar un flujo de autenticación robusto utilizando React, TypeScript, Tailwind CSS, Zustand y Axios, conectándose al API Gateway configurado.

---

## Fases de Implementación

### Fase 0: Preparación y Entorno
- [x] Verificar configuración de `.env` (`VITE_API_GATEWAY_URL`).
- [x] Validar dependencias necesarias en `package.json`:
    - `zustand`, `axios`, `lucide-react`, `react-hook-form`, `zod`, `@hookform/resolvers`, `react-router-dom`.

### Fase 1: Definición de Tipos (PASO 1)
- [x] Crear `src/types/auth.ts`.
- [x] Definir interfaces: `LoginCredentials`, `ChangePasswordRequest`, `AuthResponse`, `User`, `UserContext`.
- [x] Asegurar tipado estricto para las respuestas de la API.

### Fase 2: Estado Global con Zustand (PASO 2)
- [x] Crear `src/store/authStore.ts`.
- [x] Implementar `useAuthStore`:
    - Estado: `token` (en memoria), `refreshToken` (LocalStorage), `isAuthenticated`.
    - Acciones: `setTokens`, `logout`, `setUserData`.
- [x] Configurar persistencia selectiva para el `refreshToken`.

### Fase 3: Configuración de API y Seguridad (PASO 3 - HU-FRONT-02)
- [x] Crear `src/config/api.ts`.
- [x] Configurar instancia de Axios con `baseURL`.
- [x] Implementar Interceptor de Petición (Request): Inyectar Bearer Token.
- [x] Implementar Interceptor de Respuesta (Response):
    - Manejo de error `401 Unauthorized`.
    - Lógica de Refresh Token (cola de peticiones fallidas y reintento).
    - Redirección automática al login en caso de fallo crítico.

### Fase 4: Interfaz de Usuario de Autenticación (PASO 4 - HU-FRONT-01)
- [x] Crear `src/features/auth/Login.tsx`.
- [x] Diseñar UI corporativa con Tailwind CSS y Lucide Icons.
- [x] Implementar formulario con `react-hook-form` y validación `zod`.
- [x] Integrar lógica de envío a `/api/users/Auth/login`.
- [x] Manejar estados: Loading, Error (Feedback visual), Éxito (Redirección).

### Fase 5: Gestión de Seguridad del Usuario (PASO 5 - HU-FRONT-03)
- [x] Crear `src/features/auth/ChangePassword.tsx`.
- [x] Implementar validación de contraseñas (coincidencia y seguridad mínima).
- [x] Integrar petición a `/api/users/Auth/change-password`.
- [x] Asegurar flujo de logout obligatorio tras cambio exitoso.

### Fase 6: Integración y Pruebas
- [x] Configurar rutas en `App.tsx` o `src/routes/` para proteger rutas privadas.
- [x] Realizar pruebas de flujo completo: Login -> Token Expirado -> Refresh -> Navegación -> Change Password -> Logout.

---

## Entregables Finales
1. `src/types/auth.ts`
2. `src/store/authStore.ts`
3. `src/config/api.ts`
4. `src/features/auth/Login.tsx`
5. `src/features/auth/ChangePassword.tsx`
6. `src/components/ProtectedRoute.tsx`
7. `src/layouts/DashboardLayout.tsx`
8. `src/App.tsx`

---

**Nota:** Cada paso se realizará aplicando principios de Clean Code y manejo de errores exhaustivo.
