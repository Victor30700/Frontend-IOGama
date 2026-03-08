# Documentación Técnica - ERP IO GAMA Construcciones

Esta documentación detalla la implementación del sistema frontend, dividida por fases de desarrollo.

---

## 🛡️ Fase 1: Núcleo de Autenticación y Seguridad

### 1. Arquitectura de Autenticación
El sistema utiliza un flujo basado en **JWT (JSON Web Tokens)** con estrategia de **Refresh Token**.
- **Zustand**: Gestiona el estado global de tokens y datos básicos del usuario.
- **Axios Interceptors**: Inyectan automáticamente el token de acceso y gestionan la renovación automática en caso de errores `401 Unauthorized`.

---

## 🏗️ Fase 2: Layout Base y Contexto del Usuario

### 1. Gestión de Estado Híbrida
- **Estado de UI (`uiStore.ts`)**: Gestionado con **Zustand** para la interactividad visual (Sidebar).
- **Estado del Servidor**: Gestionado con **@tanstack/react-query** para caching e invalidación de datos.

### 2. Componentes Corporativos
- **Sidebar y Navbar**: Integración con el perfil real del usuario, manejando carga diferida (Skeletons) y errores de red en imágenes.

---

## 👥 Fase 3: Gestión de Empleados y Seguridad Granular

### 1. Administración de Personal (`EmployeeList.tsx`)
Se implementó una tabla administrativa robusta con las siguientes capacidades:
- **Búsqueda y Filtrado**: Filtros por estado (Activo/Suspendido) y búsqueda por nombre/email.
- **Gestión de Estado (HU-FRONT-13)**: Cambio dinámico de estado entre "Activo" y "Suspendido" con confirmación de seguridad vía SweetAlert2.
- **Reseteo de Credenciales (HU-FRONT-14)**: Funcionalidad para establecer nuevas contraseñas temporales a los empleados directamente desde la tabla.

### 2. Registro de Empleados (`CreateEmployee.tsx`)
- Formulario de dos pasos con validaciones estrictas vía **Zod**.
- Asignación de roles iniciales y generación de credenciales.

### 3. Matriz de Seguridad Refinada (HU-FRONT-15)
Se desarrolló una vista avanzada de permisos (`EmployeePermissions.tsx`) con las siguientes características:
- **Modelo de Diccionario**: Los permisos se estructuran como un mapa de módulos, permitiendo escalabilidad.
- **Control Granular**: Habilitación de módulos completos y selección de funcionalidades específicas (ej. `PROJECT_CREATE`, `BUDGET_EDIT`).
- **Sincronización Multi-API**:
  - Los datos personales residen en `UserManagement.API`.
  - Los permisos granulares se sincronizan con `Construction.API` mediante una operación de **Upsert (POST)**.
- **UX Adaptativa**: Bloqueo automático de funcionalidades internas cuando el acceso al módulo principal está desactivado.

---

## 🛠️ Stack Tecnológico
- **Framework**: Vite + React + TypeScript.
- **UI/UX**: Tailwind CSS + Lucide React.
- **Server State**: TanStack Query (React Query).
- **Feedback**: Sileo (Toasts) + SweetAlert2 (Modales interactivos).

---

**Última actualización:** 06 de Marzo de 2026
**Estado General:** Sprint de Gestión de Empleados y Permisos finalizado al 100%.
