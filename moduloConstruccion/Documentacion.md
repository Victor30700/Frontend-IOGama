# Documentación Técnica - Módulo de Construcción (IO GAMA)

Esta documentación detalla la implementación del núcleo de Ingeniería de Costos y Gestión de Obras para el ERP de **IO GAMA Construcciones**.

---

## 🏗️ 1. Arquitectura y Estándares
El módulo sigue los principios de **Clean Architecture** y una política de **Single-Tenant estricto**, personalizando cada interfaz para las necesidades de la empresa.

### Tecnologías Aplicadas:
- **Estado del Servidor**: TanStack Query (React Query) v5 para caching y sincronización reactiva.
- **Validación de Datos**: Zod + React Hook Form para asegurar la integridad de los DTOs.
- **UI/UX**: Tailwind CSS + Lucide React.
- **Feedback**: SweetAlert2 para flujos críticos y Sileo para notificaciones informativas.

---

## 📚 2. Catálogos Maestros (La Base Técnica)

### 2.1. Gestión de Unidades de Medida (HU-FRONT-16)
- **Funcionalidad**: Estandarización de métricas (m3, kg, ml, pza, etc.).
- **Diferenciación**: Soporte para unidades **Globales** (protegidas) y **Privadas** (editables).
- **Sincronización**: Mapeo exacto de campos `name` y `abbreviation` según el backend.

### 2.2. Catálogo de Recursos / Insumos (HU-FRONT-17)
- **Categorización**: Clasificación obligatoria en **Materiales**, **Obrero** (Mano de Obra) y **Equipo** (Herramientas).
- **Mapeo de Enums**: Implementación de lógica de conversión numérica (0, 1, 2) para compatibilidad con el backend de C#.
- **Gestión de Precios**: Registro de precios base referenciales para el Análisis de Precios Unitarios (APU).

---

## 🏢 3. Portafolio y Estructura de Proyectos

### 3.1. Registro de Proyectos (HU-FRONT-23)
- **Dashboard de Obras**: Visualización tipo tarjetas con indicadores de estado (Borrador, Ejecución, Pausa, Finalizado).
- **Finanzas**: Control de **Tasa de Cambio** (Bs/USD) y datos del cliente por cada obra.

### 3.2. Parámetros de Ley y Utilidad (HU-FRONT-24)
- **Configuración Granular**: Definición de coeficientes impositivos por proyecto:
  - Beneficios Sociales (%), IVA sobre Mano de Obra (%), Herramientas Menores (%).
  - Gastos Generales (%), Utilidad Proyectada (%), IT (%).
- **Persistencia**: Sincronización vía **PUT** a la estructura anidada `/api/projects/{id}/parameters`.

### 3.3. Organización por Módulos/Capítulos (HU-FRONT-25)
- **Jerarquía**: Capacidad de dividir el presupuesto en secciones lógicas (Obras Preliminares, Estructura, etc.).
- **UX**: Creación rápida mediante diálogos integrados y visualización de subtotales por capítulo.

---

## 💰 4. Ingeniería de Costos y Presupuestos (Detalle)

### 4.1. Importación Masiva de Plantillas (HU-FRONT-27)
- **Concepto**: Puente entre el Catálogo Maestro y la obra específica.
- **Funcionalidad**: Selección múltiple de actividades del maestro con asignación de cantidades iniciales.
- **Clonación de Seguridad**: El sistema crea copias independientes de los APUs para proteger el presupuesto de cambios futuros en el maestro.

### 4.2. Visualización y Edición de Ítems (HU-FRONT-28)
- **Acordeón de Capítulos**: Interfaz plegable para organizar la vista del presupuesto.
- **Edición Inline**: Ajuste directo de cantidades de obra con recalculación automática de subtotales y totales generales mediante invalidación de caché en React Query.

### 4.3. Personalización de APU por Proyecto (HU-FRONT-29)
- **Matriz Dinámica**: Modal especializado para el desglose de costos por ítem de obra.
- **Cálculos en Tiempo Real**:
  - Aplicación automática de los **Parámetros de Ley** del proyecto sobre el costo directo.
  - Cálculo de Beneficios Sociales, IVA MO, Herramientas Menores, Utilidad e IT.
- **Ajuste Fino**: Permite modificar rendimientos y precios unitarios de insumos específicamente para una obra sin alterar el catálogo global.

---

## 🛠️ 5. Desafíos Técnicos Superados
- **Intercepción de Errores 400/500**: Sistema de desglose de excepciones de Entity Framework (concurrencia) y errores de validación de .NET para mostrarlos de forma legible vía SweetAlert2.
- **Sincronización Multi-Caché**: Implementación de lógica de refresco en cascada: Ítem -> Módulo -> Proyecto.
- **Tipado Estricto**: Uso riguroso de `import type` para compatibilidad con `verbatimModuleSyntax`.

---

**Última actualización:** 06 de Marzo de 2026
**Estado General:** Sprint de Ingeniería de Detalle y Presupuestos Completado.
