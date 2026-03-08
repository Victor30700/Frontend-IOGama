# Instrucciones Fase 2: Layout Base y Contexto del Usuario

## 🎭 ROL Y CONTEXTO
Actúa como un Senior Frontend Engineer experto en React, TypeScript, Clean Architecture y Tailwind CSS. Estamos desarrollando el frontend del ERP "IO GAMA Construcciones" (Single-Tenant estricto).

Ya hemos finalizado exitosamente la "Fase 1: Núcleo de Autenticación y Seguridad" (tenemos configurado `zustand` en `src/store/authStore.ts`, la instancia de axios con interceptores en `src/config/api.ts`, y las rutas protegidas).

Tu objetivo ahora es desarrollar e implementar el código para la **FASE 2: Layout Base y Contexto del Usuario (Sprints HU-FRONT-04, 05, 06)**.

---

## 🛠️ STACK TÉCNICO Y REGLAS ESTRICTAS DE LA FASE 2

1. **Peticiones HTTP**: Usa **EXCLUSIVAMENTE** la instancia de Axios ya configurada (`import api from '@/config/api'`). Las rutas van al Smart Gateway (ej. `/api/Users/profile/me`).
2. **Gestión de Estado Híbrida (CRÍTICO)**:
   - **Estado de UI**: Usa `zustand` SOLO para el estado visual (ej. abrir/cerrar Sidebar). Crea un `uiStore.ts`.
   - **Estado del Servidor**: Usa OBLIGATORIAMENTE `@tanstack/react-query` (`useQuery`, `useMutation`) para traer y actualizar el perfil. No guardes los datos del perfil en Zustand.
3. **Formularios**: `react-hook-form` + validación estricta con `zod`.
4. **UI/UX**: Estilo corporativo, serio y moderno (oficina/construcción). Usa Tailwind CSS (paleta `blue-600`/`blue-700`, fondos `bg-gray-50/100`) y `lucide-react` para iconos.
5. **Animaciones**: El Sidebar izquierdo debe ser responsivo, colapsable en desktop y off-canvas en mobile, con transiciones/animaciones profesionales y fluidas usando clases de Tailwind.
6. **Alertas**: Usa notificaciones tipo Toast (Sileo) para errores menores o estados de carga, pero integra **SweetAlert2** EXCLUSIVAMENTE para la confirmación de éxito crítico (ej. "Perfil actualizado correctamente").

---

## 📦 DTOS EXACTOS Y TIPADO (`src/types/profile.ts`)
Basado en el backend de .NET, implementa estas interfaces para asegurar el tipado:

```typescript
export interface GeoLocation {
  latitude: number;
  longitude: number;
}

export interface UserProfileResponse {
  id: string;
  email: string;
  userType: string; // Ej: 'Personal', 'Company', 'Employee', 'SuperAdminGlobal'
  nombres?: string; // Para usuarios personales/empleados
  apellidoPaterno?: string;
  razonSocial?: string; // Para empresas
  fotoPerfilUrl?: string;
  biografia?: string;
  celular?: string;
  direccion?: string;
  ubicacionLaboral?: GeoLocation;
  modulosActivos?: string[];
}

export interface UpdateProfileRequest {
  fotoPerfilUrl?: string;
  biografia?: string;
  celular?: string;
  direccion?: string;
  ubicacionLaboral?: GeoLocation;
}

## 🗺️ PLAN DE TRABAJO Y PASOS DE EJECUCIÓN
Por favor, genera el código paso a paso. No me des todo el código de golpe. Entrega el código de cada paso aplicando principios de Clean Code.

### PASO 1: Store de UI y Tipos
- Crea `src/types/profile.ts` con las interfaces proporcionadas.
- Crea `src/store/uiStore.ts` con Zustand para manejar el estado del Sidebar (`isSidebarOpen`, `toggleSidebar`, `closeSidebar`).

### PASO 2: Layout Base y Navegación (DashboardLayout)
- Crea `src/layouts/Sidebar.tsx`: Navegación vertical a la izquierda. Responsivo (con backdrop en mobile), animaciones suaves, enlaces estilizados según la ruta activa (`react-router-dom`).
- Crea `src/layouts/Navbar.tsx`: Barra superior. Debe incluir un botón tipo hamburguesa para el sidebar (en mobile) y un menú desplegable de usuario (Avatar) a la derecha.
- Crea/Actualiza `src/layouts/DashboardLayout.tsx`: Debe integrar el `Sidebar`, el `Navbar` y un `<Outlet />` de React Router en el área principal. Debe estar envuelto mentalmente por el `ProtectedRoute` que ya tenemos.

### PASO 3: HU-FRONT-04 (Consulta de Perfil - Capa de Datos)
- Crea `src/services/profile.service.ts` con funciones que usen la instancia `api` de Axios (ej. `getMe()`).
- Crea `src/hooks/queries/useProfile.ts` que exporte un hook custom usando `useQuery` para obtener el perfil.
- **Integración**: Actualiza el `Navbar` y `Sidebar` para consumir este hook y mostrar el nombre/Razón Social y foto de perfil del usuario real. Usa un *Skeleton* elegante mientras los datos cargan.

### PASO 4: HU-FRONT-05 & 06 (Actualización de Perfil - UI y Mutación)
- Crea el hook `useUpdateProfile` con `useMutation` en `src/hooks/queries/useProfile.ts`. Al tener éxito, debe invalidar la query del perfil (`queryClient.invalidateQueries`) para refrescar la UI automáticamente y lanzar un modal de éxito con SweetAlert2.
- Crea la vista `src/features/profile/ProfileSettings.tsx`.
- Implementa un formulario con diseño corporativo (tarjetas blancas, sombras sutiles) usando `react-hook-form` y `zod` mapeado a `UpdateProfileRequest`.

---

## 🚀 INSTRUCCIÓN DE ENTREGA
Comienza entregando el código completo y estructurado del **PASO 1 y PASO 2**. Cuando termines, detente y espera mi confirmación ("Continúa") para generar los pasos 3 y 4.