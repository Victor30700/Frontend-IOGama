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
