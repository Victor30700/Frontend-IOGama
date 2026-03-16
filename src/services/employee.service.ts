import api from '../config/api';
import type { 
  EmployeeListItem, 
  EmployeeDetailDto,
  CreateEmployeeRequest, 
  UserPermissions, 
  UpdateGatekeeperPermissionsRequest,
  UpdateEmployeeProfileRequest
} from '../types/employee';

const BASE_URL = '/api/users/api/CompanyManagement/employees';

export const employeeService = {
  // --- UserManagement.API (Gestión de Personal) ---
  getEmployees: async (): Promise<EmployeeListItem[]> => {
    const response = await api.get<EmployeeListItem[]>(BASE_URL);
    return response.data;
  },

  getEmployeeDetail: async (id: string): Promise<EmployeeDetailDto> => {
    const response = await api.get<EmployeeDetailDto>(`${BASE_URL}/${id}`);
    return response.data;
  },

  createEmployee: async (data: CreateEmployeeRequest): Promise<any> => {
    const response = await api.post(BASE_URL, data);
    return response.data;
  },

  updateEmployeeStatus: async (id: string, status: number): Promise<any> => {
    // nuevoEstado: 0 (Activo), 1 (Suspendido) etc
    const response = await api.put(`${BASE_URL}/${id}/status`, { 
      nuevoEstado: status 
    });
    return response.data;
  },

  resetEmployeePassword: async (id: string, newPassword: string): Promise<any> => {
    const response = await api.put(`${BASE_URL}/${id}/reset-password`, { 
      newPassword 
    });
    return response.data;
  },

  updateGatekeeperPermissions: async (id: string, data: UpdateGatekeeperPermissionsRequest): Promise<any> => {
    const response = await api.put(`${BASE_URL}/${id}/permissions`, data);
    return response.data;
  },

  updateEmployeeProfile: async (id: string, data: UpdateEmployeeProfileRequest): Promise<any> => {
    const response = await api.put(`${BASE_URL}/${id}/profile`, data);
    return response.data;
  },

  // --- Construction.API (Gestión Técnica Granular) ---
  getMyPermissions: async (): Promise<UserPermissions> => {
    const response = await api.get<UserPermissions>('/api/construction/api/Permissions/me');
    return response.data;
  },

  getUserPermissions: async (userId: string): Promise<UserPermissions> => {
    const response = await api.get<UserPermissions>(`/api/construction/api/Permissions/users/${userId}`);
    return response.data;
  },

  upsertUserPermissions: async (userId: string, permisos: UserPermissions): Promise<any> => {
    const response = await api.post(`/api/construction/api/Permissions/users/${userId}`, permisos);
    return response.data;
  },
};
