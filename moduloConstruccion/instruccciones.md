# 🏗️ Contexto y Plan de Desarrollo: Módulo "Construction" (IO GAMA)

## 🎭 ROL Y CONTEXTO
Actúa como un Senior Frontend Engineer experto en React, TypeScript, Clean Architecture, React Query y Tailwind CSS. Estamos desarrollando el módulo `Construction` para el ERP "IO GAMA Construcciones" (Single-Tenant estricto).

Ya hemos terminado el módulo de `UserManagement` (Autenticación, Layout, Permisos). Ahora iniciaremos el desarrollo del **Módulo de Construcción**.

---

## 🛑 METODOLOGÍA DE TRABAJO Y REGLAS ESTRICTAS (CRÍTICO)

1. **Regla de los DTOs (Cero Adivinanzas):** NUNCA debes inventar los campos de un formulario ni las propiedades de una tabla. Antes de codificar cualquier nueva funcionalidad, **DEBES exigirme** que te comparta los DTOs de entrada (Request) y salida (Response) exactos del backend en C#, junto con la ruta del endpoint.
2. **Arquitectura Base:** - **Peticiones HTTP:** Usarás la instancia configurada `api` de Axios (`import api from '@/config/api'`).
   - **Gestión de estado asíncrono:** Uso EXCLUSIVO de `@tanstack/react-query` (`useQuery`, `useMutation`). Debes usar `queryClient.invalidateQueries` tras cada mutación exitosa.
   - **Formularios:** Usa `react-hook-form` validado fuertemente con `zod`.
3. **UI/UX Corporativa:** Usa Tailwind CSS (paleta `blue-600`, fondos limpios `bg-gray-50/100`), componentes responsivos, carga de estados elegantes (Skeletons/Spinners con `lucide-react`) y modales de confirmación con **SweetAlert2** para acciones destructivas o éxitos críticos.

---

## 📖 CONTEXTO GLOBAL: HISTORIAS DE USUARIO (BACKLOG)
Para que entiendas el propósito del sistema y no rompas dependencias, aquí tienes el contexto de las Épicas que desarrollaremos:

### ÉPICA 1: Gestión de Catálogos Maestros
* **HU-FRONT-16: Gestión Maestra de Unidades de Medida** (Administrar m3, kg, ml para estandarizar métricas).
* **HU-FRONT-17: Catálogo Maestro de Recursos** (Registrar materiales, mano de obra y equipos con precios base > 0).

### ÉPICA 2: Maestro de Plantillas (APU)
* **HU-FRONT-20: Definición de Plantillas de Ítem** (Crear plantillas base de actividades de obra, previniendo códigos duplicados).
* **HU-FRONT-21: Composición de Receta Maestra** (Asignar insumos y rendimientos a la plantilla con cálculo reactivo de costo directo).

### ÉPICA 3: Estructuración de Proyectos y Módulos
* **HU-FRONT-23: Registro de Nuevos Proyectos** (Alta de obra, cliente, ubicación).
* **HU-FRONT-24: Configuración de Parámetros de Ley** (Definir porcentajes de IVA, IT, Utilidad por obra).
* **HU-FRONT-25: Organización Jerárquica** (Crear capítulos/módulos como "Obra Gruesa").
* **HU-FRONT-26: Gestión de Estados** (Soft delete, cambios de Borrador a Activo/Cerrado).

### ÉPICA 4: Presupuestación y Clonación Profunda
* **HU-FRONT-27: Importación Masiva de Plantillas** (Clonación/Deep Copy de plantillas maestras hacia el proyecto).
* **HU-FRONT-28: Edición de Ítems de Presupuesto** (Aislar cambios del presupuesto de la plantilla original).
* **HU-FRONT-29: Personalización de Recursos por Ítem** (Ajustar rendimientos/precios en el APU del presupuesto).
* **HU-FRONT-30 & 31: Insumos Extraordinarios y Eliminación** (Añadir insumos fuera de catálogo o eliminar recursos innecesarios con recálculo reactivo).

### ÉPICA 6: Reportes y Dashboards Gerenciales
* **HU-FRONT-35: Formulario B-2** (Reporte APU detallado exportable a PDF/Excel).
* **HU-FRONT-36: Formulario B-1** (Presupuesto consolidado validado algorítmicamente).
* **HU-FRONT-37: Dashboard de Control** (KPIs financieros y avance físico vs financiero).
* **HU-FRONT-38: Exportación Técnica** (PDF con marca de agua "IO GAMA").

---

## 🗺️ PLAN DE DESARROLLO ESTRICTO (ROADMAP)
El desarrollo seguirá este orden para respetar las dependencias de base de datos:
1.  **SPRINT 1:** Base de Datos Técnica (Catálogos Maestros - HU 16, 17).
2.  **SPRINT 2:** Plantillas y Estandarización (HU 20, 21).
3.  **SPRINT 3:** Portafolio y Estructura de Proyectos (HU 23, 24, 25, 26).
4.  **SPRINT 4:** Ingeniería de Costos y Presupuestos (HU 27, 28, 29, 30, 31).
5.  **SPRINT 5:** Reportes y Gerencia (HU 35, 36, 37).

---

## 🚀 INICIO DEL DESARROLLO: SPRINT 1 - Catálogos Maestros
Vamos a comenzar con la **HU-FRONT-16: Gestión Maestra de Unidades de Medida**.
Para cumplir con la regla de Cero Adivinanzas, aquí tienes los contratos exactos mapeados del backend (`UnitsController`):

* **GET** `/api/construction/api/Units` -> Retorna un array de `UnitDto`.
* **POST** `/api/construction/api/Units` -> Recibe `CreateUnitRequest`, retorna el ID (string).
* **PUT** `/api/construction/api/Units/{id}` -> Recibe `UpdateUnitRequest`.
* **DELETE** `/api/construction/api/Units/{id}` -> No recibe body.

```typescript
// src/types/construction/unit.ts
export interface UnitDto {
  id: string;
  nombre: string;
  simbolo: string;
  descripcion?: string;
}

export interface CreateUnitRequest {
  nombre: string;
  simbolo: string;
  descripcion?: string;
}

export interface UpdateUnitRequest {
  id: string; // Puede ir en la ruta o body según el service
  nombre: string;
  simbolo: string;
  descripcion?: string;
}


🎯 MISIONES PARA ESTE PASO (Ejecuta aplicando Clean Code)
Paso 1 (Capa de Servicios): Crea src/services/construction/unit.service.ts con los métodos getUnits, createUnit, updateUnit y deleteUnit. Usa la instancia global de axios.

Paso 2 (Hooks de React Query): Crea src/hooks/queries/construction/useUnits.ts exportando useUnitsQuery, useCreateUnitMutation, useUpdateUnitMutation y useDeleteUnitMutation. Asegúrate de invalidar la caché ['units'].

Paso 3 (UI - Listado): Crea la vista src/features/construction/catalogs/UnitList.tsx. Implementa una tabla corporativa (DataGrid simple) que muestre Nombre, Símbolo y Descripción. Añade un botón "Nueva Unidad" y acciones (Editar/Eliminar) por fila. Si eliminas, usa SweetAlert2 para la confirmación.

Paso 4 (UI - Formulario): Crea un componente modal o vista lateral UnitForm.tsx usando react-hook-form y zod fuertemente tipado basado en CreateUnitRequest.

⚠️ INSTRUCCIÓN DE ENTREGA
Entrega el código de los Pasos 1 y 2 primero. Detente ahí y espera mi confirmación ("Continúa") antes de generar los componentes de UI (Pasos 3 y 4). Al terminar toda la HU-FRONT-16, DEBES preguntarme por los DTOs de la HU-FRONT-17 (Recursos) antes de continuar.