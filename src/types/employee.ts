export interface GatekeeperPermission {
  acceso: boolean;
  funcionalidades: string[];
  recursosIds: string[];
}

export interface GatekeeperPermissionsMap {
  [modulo: string]: GatekeeperPermission;
}

// Estructura para Construction.API
export interface PermissionDetail {
  access: boolean;
  permissions: string[];
}

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

export interface EmployeeDetailDto extends EmployeeListItem {
  ci: string;
  celular: string;
  direccion: string;
  permisos: GatekeeperPermissionsMap;
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
  permisos: GatekeeperPermissionsMap;
}

export interface UpdateGatekeeperPermissionsRequest {
  areaTrabajo: string;
  esSuperAdmin: boolean;
  permisos: GatekeeperPermissionsMap;
}

export interface UpdateEmployeeProfileRequest {
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  ci: string;
  celular: string;
  direccion: string;
}
