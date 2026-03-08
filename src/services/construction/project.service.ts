import api from '../../config/api';
import type { ProjectDto, CreateProjectRequest, UpdateProjectRequest } from '../../types/construction/project';
import type { ProjectParametersDto, UpdateProjectParametersRequest } from '../../types/construction/projectParameters';

const BASE_URL = '/api/construction/api/Projects';

export const projectService = {
  // Gestión de Proyectos
  getProjects: async (): Promise<ProjectDto[]> => {
    const response = await api.get<ProjectDto[]>(BASE_URL);
    return response.data;
  },

  createProject: async (data: CreateProjectRequest): Promise<string> => {
    const response = await api.post<string>(BASE_URL, data);
    return response.data;
  },

  updateProject: async (id: string, data: UpdateProjectRequest): Promise<void> => {
    await api.put(`${BASE_URL}/${id}`, data);
  },

  deleteProject: async (id: string): Promise<void> => {
    await api.delete(`${BASE_URL}/${id}`);
  },

  // Gestión de Parámetros de Ley - RUTAS CORREGIDAS SEGÚN ENTRADASSALIDAS.MD
  getProjectParameters: async (projectId: string): Promise<ProjectParametersDto> => {
    const response = await api.get<ProjectParametersDto>(`/api/construction/api/projects/${projectId}/parameters`);
    return response.data;
  },

  updateProjectParameters: async (projectId: string, data: UpdateProjectParametersRequest): Promise<void> => {
    // El backend espera un PUT según la documentación compartida
    await api.put(`/api/construction/api/projects/${projectId}/parameters`, data);
  }
};
