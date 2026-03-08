import api from '../../config/api';
import type { ProjectModuleDto, CreateModuleRequest, UpdateModuleRequest } from '../../types/construction/module';

export const moduleService = {
  getModules: async (projectId: string): Promise<ProjectModuleDto[]> => {
    const response = await api.get<ProjectModuleDto[]>(`/api/construction/api/projects/${projectId}/modules`);
    return response.data;
  },

  createModule: async (projectId: string, data: CreateModuleRequest): Promise<string> => {
    const response = await api.post<string>(`/api/construction/api/projects/${projectId}/modules`, data);
    return response.data;
  },

  updateModule: async (id: string, data: UpdateModuleRequest): Promise<void> => {
    await api.put(`/api/construction/api/modules/${id}`, data);
  },

  deleteModule: async (id: string): Promise<void> => {
    await api.delete(`/api/construction/api/modules/${id}`);
  }
};
