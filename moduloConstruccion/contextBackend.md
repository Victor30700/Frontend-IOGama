# 🏗️ Construction.API - Contexto del Proyecto y PRD

## 1. Visión del Producto
`Construction.API` es un microservicio especializado en la **Ingeniería de Costos y Gestión de Obras**. Su objetivo es transformar la gestión tradicional (Excel) en un sistema SaaS robusto, permitiendo la creación de Presupuestos (APUs), gestión de Insumos y control de Proyectos.

El sistema opera dentro de un ecosistema de microservicios, delegando la autenticación a `UserManagement.API` pero manteniendo soberanía total sobre sus datos y autorización interna.

## 2. Arquitectura Técnica
* **Estilo:** Clean Architecture (Domain, Application, Infrastructure, API).
* **Patrón de Diseño:** CQRS (Command Query Responsibility Segregation) utilizando **MediatR**.
* **Framework:** .NET 10.
* **Base de Datos:** PostgreSQL (Uso intensivo de Relacional + JSONB).
* **ORM:** Entity Framework Core.
* **Seguridad:** JWT (AuthN externo) + Roles Internos (AuthZ local) mediante Policies.
* **Documentación:** Swagger UI habilitado con soporte para JWT Bearer y comentarios XML.

## 3. Modelo de Seguridad y Multi-Tenancy (Crítico)

### 3.1. Identidad vs. Propiedad (La Regla de Oro)
El sistema es **Multi-Tenant Estricto**.
* **TenantId:** Identifica a la Organización dueña de los datos.
* **UserId:** Identifica a la persona que opera el sistema.

| Tipo de Cuenta | UserId (Token) | TenantId (Token/Calculado) | Rol (Token) |
| :--- | :--- | :--- | :--- |
| **Empresa (Dueño)** | `String (Firebase)` -> `GUID (Hash)` | `GUID (Hash del User)` | `Company` |
| **Personal (Dueño)** | `String (Firebase)` -> `GUID (Hash)` | `GUID (Hash del User)` | `Personal` |
| **Empleado (Subcuenta)**| `String (Firebase)` -> `GUID (Hash)` | `GUID (ID del Jefe)` | `Employee` |
| **System Admin** | `String (Firebase)` -> `GUID (Hash)` | `0000...0000` (SystemGlobal) | `SystemAdmin` |

**Regla de Implementación:** Toda entidad de negocio (`Project`, `Resource`) hereda de `BaseEntity` y **DEBE** tener un `TenantId`. Los filtros globales de EF Core aseguran que un usuario solo vea datos de su Tenant.

### 3.2. Gestión de Permisos
*   **Global Root (Dios):** Bypass total. Acceso irrestricto a todos los datos y políticas.
*   **Policies Administrativas:** `RequireGlobalRoot` y `CanManageGlobalCatalog` controlan el acceso al catálogo maestro y configuraciones de sistema.
*   **Permisos de Proyecto:** Gestionados localmente para empleados, permitiendo roles de lectura/edición por obra.

## 4. Estructura de Proyectos y Módulos

### 4.1. Organización Plana de Módulos
Se ha simplificado la estructura de los proyectos eliminando la recursividad de módulos.
*   **Proyecto:** Contenedor raíz.
*   **Módulo:** Lista plana de capítulos (ej. Obra Gruesa, Instalaciones) ordenados mediante el campo `Order`.
*   **Items de Presupuesto:** Los ítems de obra viven directamente dentro de un módulo.

## 5. Ingeniería de Costos (Análisis de Precios Unitarios)

Se implementó un modelo de **Clonación e Independencia** para asegurar que los presupuestos no se vean afectados por cambios futuros en el catálogo general.

### 5.1. Catálogo Maestro (`ItemTemplate`)
*   Representa la **plantilla** o "receta" reutilizable.
*   **Gestión Granular:** Se separa la edición de la cabecera (Nombre, Unidad) de la gestión de sus recursos (Materiales, Obreros, Equipos).
*   **Unicidad:** El nombre y código son únicos dentro de su ámbito (Global o privado del Tenant).

### 5.2. Ítem de Proyecto (`BudgetItem`)
*   Es la **instancia** del ítem dentro de una obra.
*   **Importación Masiva (Batch):** Permite seleccionar múltiples plantillas del catálogo e importarlas al proyecto con un solo comando.
*   **Independencia Total:** Al importar, se realiza una copia profunda de los insumos y sus precios actuales. El ítem del proyecto puede ser editado (cambiar nombres, rendimientos o añadir insumos manuales) sin afectar al catálogo.

### 5.3. Cálculo de Precios y Agregación de Totales
El sistema gestiona los costos de forma inteligente y automática mediante una arquitectura de persistencia en cascada:

*   **Precio Unitario del Ítem (`BudgetItem.UnitPrice`):** Calculado instantáneamente sumando `(Precio * Rendimiento)` de sus insumos, aplicando además leyes sociales, herramientas menores, gastos generales, utilidad e impuestos definidos en los parámetros del proyecto.
*   **Total del Ítem:** Se obtiene de la operación `UnitPrice * Quantity`.
*   **Total del Módulo (`ProjectModule.TotalAmount`):** Suma persistida de los totales de todos los ítems que pertenecen al módulo. Se actualiza automáticamente ante cualquier cambio en sus ítems o insumos.
*   **Total del Proyecto (`Project.TotalAmount`):** Suma persistida de los totales de todos sus módulos. Representa el costo total de la obra y se mantiene sincronizado en tiempo real.
*   **Independencia y Performance:** Al persistir los totales en cada nivel, las consultas de listados (proyectos y módulos) son extremadamente rápidas, evitando cálculos costosos en tiempo de ejecución mientras se garantiza la integridad de los datos mediante el servicio de agregación.
*   **Insumos Personalizados:** Permite agregar insumos "al vuelo" que solo existen para ese ítem de obra específico, disparando el recálculo de toda la cadena de costos hacia arriba.

## 6. Modelo de Dominio (Construction Core)

### 6.1. Catálogos Híbridos
Las unidades e insumos base pueden ser Globales (creados por AdminSistema) o Privados (creados por la Empresa). El sistema prioriza la visibilidad de ambos pero restringe la edición de los globales solo a personal autorizado.

## 7. Integración con UserManagement.API
*   **Puente de Identidad:** Conversión determinista de IDs de Firebase a GUIDs para consistencia en PostgreSQL.
*   **Seguridad Nivel 1 (Puerta):** Se ha implementado un Filtro Global de Autorización que valida el claim `module: Construccion` en el JWT. Usuarios sin este claim (o que no sean `is_global_root`) reciben un `403 Forbidden` automáticamente en cualquier endpoint.
*   **Seguridad Nivel 2 (Escritorio):** Una vez dentro de la API, el `PermissionService` local gestiona los permisos granulares sobre proyectos y obras específicas.
*   **Consumo de Claims:** Uso de `is_global_root` y roles para la toma de decisiones de autorización en tiempo real.