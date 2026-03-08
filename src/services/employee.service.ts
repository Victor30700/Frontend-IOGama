import api from '../config/api';
import type { EmployeeListItem, CreateEmployeeRequest, UserPermissions } from '../types/employee';

export const employeeService = {
  // Gestión de Empleados (UserManagement.API)
  // NOTA: Se eliminó un '/api' extra que sobraba según ENDPOINTS_GUIDE.md
  getEmployees: async (): Promise<EmployeeListItem[]> => {
    const response = await api.get<EmployeeListItem[]>('/api/users/CompanyManagement/employees');
    return response.data;
  },

  createEmployee: async (data: CreateEmployeeRequest): Promise<any> => {
    const response = await api.post('/api/users/CompanyManagement/employees', data);
    return response.data;
  },

  updateEmployeeStatus: async (id: string, status: number): Promise<any> => {
    const response = await api.put(`/api/users/CompanyManagement/employees/${id}/status`, { 
      nuevoEstado: status 
    });
    return response.data;
  },

  resetEmployeePassword: async (id: string, newPassword: string): Promise<any> => {
    const response = await api.put(`/api/users/CompanyManagement/employees/${id}/reset-password`, { 
      newPassword,
      confirmPassword: newPassword 
    });
    return response.data;
  },

  // Gestión de Permisos (Construction.API)
  getMyPermissions: async (): Promise<UserPermissions> => {
    const response = await api.get<UserPermissions>('/api/construction/Permissions/me');
    return response.data;
  },

  getUserPermissions: async (userId: string): Promise<UserPermissions> => {
    const response = await api.get<UserPermissions>(`/api/construction/Permissions/users/${userId}`);
    return response.data;
  },

  // Upsert de permisos (POST hacia Construction.API)
  upsertUserPermissions: async (userId: string, permisos: UserPermissions): Promise<any> => {
    const response = await api.post(`/api/construction/Permissions/users/${userId}`, permisos);
    return response.data;
  },
};
