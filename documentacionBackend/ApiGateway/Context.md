# 🌐 Smart Gateway: Núcleo de Enrutamiento y Seguridad

Este proyecto actúa como la **Pasarela Inteligente (Smart Gateway)** del ecosistema IO GAMA. Centraliza la seguridad, la documentación y el tráfico hacia los microservicios mediante **YARP (Yet Another Reverse Proxy)**.

---

## 1. Arquitectura y Seguridad

### 🛡️ Validación Centralizada de JWT
El Gateway es el **Portero** del sistema. Antes de que una petición llegue a un microservicio:
1. El Gateway valida la **firma y expiración** del Token JWT.
2. Si el Token es inválido o no existe (en rutas protegidas), el Gateway responde inmediatamente con `401 Unauthorized`.
3. Esto descarga a los microservicios de la tarea de validación de firma y asegura que solo tráfico auténtico circule por la red interna.

### 🔄 Enrutamiento y Case Sensitivity
**Importante:** El Gateway es sensible a mayúsculas/minúsculas en las rutas de los microservicios.
- Las rutas de proyectos deben usar `/api/construction/api/Projects` (P mayúscula) para asegurar el enrutamiento correcto hacia el microservicio de Construcción.
- Las rutas de gestión de empresas deben usar `/api/users/api/CompanyManagement` para UserManagement.

---

## 2. Flujo de Autenticación y Sesión

### Inicio de Sesión y Aislamiento de Datos
El proceso de autenticación garantiza que no haya fuga de información entre sesiones:
1. Al iniciar sesión, el sistema ejecuta un `queryClient.clear()` para borrar cualquier caché de usuarios anteriores.
2. Se obtienen los tokens y el contexto del usuario.
3. El sistema proporciona retroalimentación detallada mediante **SweetAlert2** (Credenciales incorrectas, cuenta suspendida, éxito).

### Mantenimiento de Sesión (Silent Refresh)
Al recargar la aplicación, el sistema utiliza el `refreshToken` para obtener un nuevo `accessToken` automáticamente, garantizando una experiencia fluida sin re-autenticación constante.

---

## 3. Modelo de Seguridad en Dos Capas

### Capa 1: El Portero (UserManagement)
Gestiona el acceso de "alto nivel" y la integridad del personal:
- **Estados de Cuenta:** 
  - `1`: Activo (Acceso total).
  - `2`: Suspendido (Bloqueo inmediato de login).
- **Gestión de Perfil:** Permite a los usuarios actualizar su imagen (Base64), biografía corporativa y datos de contacto oficiales.
- **Reset de Seguridad:** Los administradores pueden forzar el reseteo de contraseñas de empleados.

### Capa 2: Matriz Granular (Construcción)
Define qué funciones técnicas puede realizar el usuario dentro del módulo de ingeniería:
- Gestión de catálogos (Unidades, Recursos, Plantillas APU).
- Ingeniería de costos y presupuestos masivos.
- **Reportes Oficiales:** Generación de Formularios B-1 (Presupuesto) y B-3 (Insumos Consolidados) mediante el motor **QuestPDF**.

---

## 4. Colaboración en Proyectos (Batch Maestro v4)

El sistema soporta gestión de equipos a gran escala:

- **Invitación Masiva (Batch):** Permite añadir múltiples empleados a una obra en una sola petición HTTP mediante el endpoint `POST /members` con un array de objetos.
- **Roles de Ingeniería:**
  - `Admin`: Control total del presupuesto y equipo.
  - `Resident`: Gestión técnica de la obra.
  - `Supervisor`: Supervisión y visor de costos.
  - `Viewer`: Solo lectura.
- **Filtro Automático de Portafolio:** El microservicio filtra los proyectos automáticamente para que los empleados solo vean las obras donde son miembros activos.
- **Traspaso de Liderazgo:** El Dueño o SuperAdmin pueden transferir el rol de **Encargado** a cualquier miembro, delegando el control total de la obra.

---

## 5. Interfaz y Experiencia de Usuario (UX)

### Diseño Profesional Minimalista
- **Estética Industrial:** Fondo en `slate-100` con tarjetas blancas de bordes ultra-suaves (`40px`) para reducir la fatiga visual.
- **Dashboard Gerencial:** Panel principal con métricas agregadas (Proyectos activos, inversión total, personal en nómina).
- **Menús de Acción Estables:** Implementación de menús contextuales basados en clics y estados para evitar la inestabilidad del hover.
- **Sincronización de Identidad:** La foto de perfil se sincroniza en tiempo real entre la configuración y el Navbar global.

---

## 6. Guía de Integración para React (Vite)

### Cliente Axios con Soporte para Blobs (PDFs)
```javascript
// Ejemplo para descargar reportes oficiales
export const downloadPdf = async (projectId) => {
  const response = await api.get(`/api/Reports/projects/${projectId}/budget/pdf`, {
    responseType: 'blob' // Vital para recibir el archivo binario
  });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  // ... lógica de descarga
};
```

---

## 7. Troubleshooting Local
1. **SSL:** Acepta el certificado de desarrollo de ASP.NET Core.
2. **Puertos:** Gateway (`7149`), UserManagement (`7171`), Construction (`7210`).
3. **Mayúsculas:** Respeta el PascalCase en las rutas de los servicios para evitar errores 400 del Gateway.
