import api from '../../config/api';
import type { ProjectDto, CreateProjectRequest, UpdateProjectRequest } from '../../types/construction/project';
import type { ProjectParametersDto, UpdateProjectParametersRequest } from '../../types/construction/projectParameters';
import type { 
  ProjectMemberDto, 
  BatchMembersRequest 
} from '../../types/construction/projectMember';

// Mantener Projects con P mayúscula para que el Gateway lo rutee correctamente
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

  // Gestión de Parámetros de Ley
  getProjectParameters: async (projectId: string): Promise<ProjectParametersDto> => {
    const response = await api.get<ProjectParametersDto>(`${BASE_URL}/${projectId}/parameters`);
    return response.data;
  },

  updateProjectParameters: async (projectId: string, data: UpdateProjectParametersRequest): Promise<void> => {
    await api.put(`${BASE_URL}/${projectId}/parameters`, data);
  },

  // Gestión de Miembros (Colaboración Maestro v4)
  getProjectMembers: async (projectId: string): Promise<ProjectMemberDto[]> => {
    const response = await api.get<ProjectMemberDto[]>(`${BASE_URL}/${projectId}/members`);
    return response.data;
  },

  inviteMembers: async (projectId: string, data: BatchMembersRequest): Promise<void> => {
    // Nota: El projectId va en el path Y en el body según Swagger
    await api.post(`${BASE_URL}/${projectId}/members`, data);
  },

  updateMembers: async (projectId: string, data: BatchMembersRequest): Promise<void> => {
    await api.put(`${BASE_URL}/${projectId}/members`, data);
  },

  transferManager: async (projectId: string, newManagerUserId: string): Promise<void> => {
    await api.put(`${BASE_URL}/${projectId}/transfer-manager`, null, {
      params: { newManagerUserId }
    });
  }
};
