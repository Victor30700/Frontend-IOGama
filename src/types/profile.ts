export interface GeoLocation {
  latitude: number;
  longitude: number;
}

export interface DatosPersonalesDto {
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno?: string;
  ci: string;
  celular: string;
  direccion: string;
}

export interface DatosEmpresaDto {
  razonSocial: string;
  nit: string;
  direccionLegal: string;
  telefonoOficina: string;
}

export interface DatosEmpleadoDto {
  cargo: string;
  areaTrabajo: string;
  fechaIngreso: string;
}

export interface UserProfileResponse {
  id: string;
  email: string;
  tipoUsuario: string; // Ej: 'Empresa', 'SubCuentaEmpresa', 'SuperAdminGlobal'
  estado: string;
  fotoPerfilUrl: string;
  biografia: string | null;
  datosPersonales: DatosPersonalesDto | null;
  datosEmpresa: DatosEmpresaDto | null;
  datosEmpleado: DatosEmpleadoDto | null;
}

export interface UpdateProfileRequest {
  fotoPerfilUrl?: string;
  biografia?: string;
  celular?: string;
  direccion?: string;
  ubicacionLaboral?: GeoLocation;
}
