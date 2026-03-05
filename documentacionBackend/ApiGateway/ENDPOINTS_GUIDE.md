# 📄 Guía Completa de Endpoints (Maestra)

**URL Base del Gateway:** `https://localhost:7149`

---

## 🔑 User Management API (`/api/users/`)

### Auth (Públicos)
- **POST** `/api/users/Auth/register/personal` -> Registro de persona (Nivel 1).
- **POST** `/api/users/Auth/register/company` -> Registro de empresa (Nivel 1 - Pendiente).
- **POST** `/api/users/Auth/login` -> Inicia sesión (JWT Multi-módulo + UserContext).
- **POST** `/api/users/Auth/refresh-token` -> Renueva el token.
- **POST** `/api/users/Auth/change-password` -> Cambia contraseña (Requiere JWT).

### Usuarios e Identidades
- **GET** `/api/users/Users/profile/me` -> Obtener mi perfil completo.
- **PUT** `/api/users/Users/profile/me` -> Actualizar mis datos básicos.
- **GET** `/api/users/Users/public/search` -> Búsqueda pública inteligente (searchTerm + ciudad).
- **GET** `/api/users/Users/public/{userId}` -> Perfil público (Tarjeta).
- **POST** `/api/users/Users/tags/request` -> Solicitar oficio (Tag) / Rectificar tras rechazo.
- **POST** `/api/users/Users/modules/request` -> Solicitar software personal / Rectificar.

### Gestión de Empresas y Empleados (CompanyManagement)
- **POST** `/api/users/CompanyManagement/profiles/request` -> Solicitar nuevo módulo (ej. Construcción) o Tag Social.
- **PUT** `/api/users/CompanyManagement/identity/rectify` -> Rectificar datos legales tras rechazo.
- **GET** `/api/users/CompanyManagement/employees` -> Listar mis empleados.
- **POST** `/api/users/CompanyManagement/employees` -> Registrar nuevo empleado con permisos.
- **GET** `/api/users/CompanyManagement/employees/{id}` -> Ver detalle y permisos de empleado.
- **PUT** `/api/users/CompanyManagement/employees/{id}/permissions` -> Actualizar permisos de empleado.
- **PUT** `/api/users/CompanyManagement/employees/{id}/status` -> Activar/Suspender empleado.
- **PUT** `/api/users/CompanyManagement/employees/{id}/reset-password` -> Resetear clave de empleado.

### Administración (Requiere permisos de Admin)
- **GET** `/api/users/Admin/identities/pending` -> Empresas nuevas esperando aprobación.
- **PUT** `/api/users/Admin/identities/decision` -> Aprobar/Rechazar identidad (Soporta rejectionReason).
- **GET** `/api/users/Admin/companies/modules/pending` -> Solicitudes de software esperando.
- **PUT** `/api/users/Admin/companies/modules/decision` -> Aprobar/Rechazar módulo (Soporta rejectionReason).
- **GET** `/api/users/Admin/tags/pending` -> Solicitudes de oficios esperando.
- **PUT** `/api/users/Admin/personal/tags/decision` -> Aprobar/Rechazar Tag (Soporta rejectionReason).
- **PUT** `/api/users/Admin/users/{id}/status` -> Banear/Suspender/Activar cualquier usuario (Soporta motivo).
- **GET** `/api/users/Admin/users/search` -> Búsqueda administrativa (exacta: Email, CI, NIT).
- **GET** `/api/users/Admin/users/{id}` -> Ver perfil completo sin censura.

### Reputación (Reviews)
- **GET** `/api/users/Reviews` -> Listar reseñas por recipientId y contextoId.
- **POST** `/api/users/Reviews` -> Crear una reseña contextual.

---

## 🏗️ Construction API (`/api/construction/`)
**Nota:** Todos los endpoints requieren el claim `module: Construccion` en el JWT.

### Proyectos
- **GET** `/api/construction/Projects` -> Listar mis proyectos (Incluye TotalAmount).
- **POST** `/api/construction/Projects` -> Crear proyecto.
- **PUT** `/api/construction/Projects/{id}` -> Actualizar proyecto.
- **DELETE** `/api/construction/Projects/{id}` -> Eliminar proyecto.

### Módulos de Obra
- **GET** `/api/construction/Modules?projectId={projectId}` -> Listar módulos de un proyecto (Incluye TotalAmount).
- **POST** `/api/construction/Modules` -> Crear módulo.
- **PUT** `/api/construction/Modules/{id}` -> Actualizar módulo.
- **DELETE** `/api/construction/Modules/{id}` -> Eliminar módulo.

### Ítems del Presupuesto (Budget Items)
- **GET** `/api/construction/BudgetItems/module/{moduleId}` -> Listar ítems de un módulo.
- **POST** `/api/construction/BudgetItems` -> Crear ítem manual.
- **POST** `/api/construction/BudgetItems/import` -> Importar ítems masivamente del catálogo.
- **PUT** `/api/construction/BudgetItems/{id}` -> Actualizar cabecera (Cantidad, Nombre).
- **DELETE** `/api/construction/BudgetItems/{id}` -> Eliminar ítem.
- **GET** `/api/construction/BudgetItems/{id}/analysis` -> Formulario B1 detallado.

### Recursos de Ítems (Análisis de Precios)
- **POST** `/api/construction/BudgetItems/resources/custom` -> Añadir insumo personalizado.
- **POST** `/api/construction/BudgetItems/resources/custom/batch` -> Añadir múltiples insumos personalizados.
- **PUT** `/api/construction/BudgetItems/resources/{id}` -> Actualizar precio/rendimiento de insumo.
- **DELETE** `/api/construction/BudgetItems/resources/{id}` -> Quitar insumo del ítem.

### Catálogos y Configuración
- **GET** `/api/construction/ItemTemplates` -> Plantillas de ítems.
- **GET** `/api/construction/Resources` -> Insumos base (Globales/Privados).
- **GET** `/api/construction/Units` -> Unidades de medida.
- **GET** `/api/construction/ProjectParameters/project/{projectId}` -> Ver IVA, IT, Utilidad de la obra.
