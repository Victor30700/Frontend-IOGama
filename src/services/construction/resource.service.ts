import api from '../../config/api';
import type { ResourceDto, CreateResourceRequest, UpdateResourceRequest } from '../../types/construction/resource';

const BASE_URL = '/api/construction/api/Resources';

export const resourceService = {
  getResources: async (pageNumber = 1, pageSize = 10): Promise<ResourceDto[]> => {
    // Según el DTO compartido, el GET retorna un array [ { ... } ] directamente
    const response = await api.get<ResourceDto[]>(BASE_URL, {
      params: { pageNumber, pageSize }
    });
    return response.data;
  },

  createResource: async (data: CreateResourceRequest): Promise<any> => {
    const response = await api.post(BASE_URL, data);
    return response.data;
  },

  updateResource: async (id: string, data: UpdateResourceRequest): Promise<ResourceDto> => {
    const response = await api.put<ResourceDto>(`${BASE_URL}/${id}`, data);
    return response.data;
  },

  deleteResource: async (id: string): Promise<void> => {
    await api.delete(`${BASE_URL}/${id}`);
  },
};
