export interface PermissionDetail {
  access: boolean;
  permissions: string[];
}

// Representa el diccionario: { "Modulo": { access: true, permissions: ["*"] } }
export interface UserPermissions {
  [key: string]: PermissionDetail;
}

export interface EmployeeListItem {
  id: string;
  nombreCompleto: string;
  email: string;
  cargo: string;
  esSuperAdmin: boolean;
  estado: 'Activo' | 'Suspendido';
  fechaRegistro: string;
}

export interface CreateEmployeeRequest {
  email: string;
  passwordTemporal: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  ci: string;
  fechaNacimiento: string;
  direccionEscrita: string;
  celular: string;
  areaTrabajo: string;
  esSuperAdmin: boolean;
  permisos: UserPermissions;
}
