import api from '../../config/api';
import type { 
  ItemTemplateDto, 
  CreateItemTemplateRequest, 
  UpdateItemTemplateRequest,
  TemplateResourceRequest 
} from '../../types/construction/itemTemplate';
import type { BulkImportRequest } from '../../types/construction/item';

const BASE_URL = '/api/construction/api/ItemTemplates';
const MODULES_URL = '/api/construction/api/modules';

export const itemTemplateService = {
  // Catálogo Maestro
  getTemplates: async (onlyMyTenant = false): Promise<ItemTemplateDto[]> => {
    const response = await api.get<ItemTemplateDto[]>(BASE_URL, {
      params: { onlyMyTenant }
    });
    return response.data;
  },

  // GET por ID (Ahora con recursos incluidos según el nuevo DTO)
  getTemplateById: async (id: string): Promise<any> => {
    const response = await api.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  createTemplate: async (data: CreateItemTemplateRequest): Promise<string> => {
    const response = await api.post<string>(BASE_URL, data);
    return response.data;
  },

  updateTemplate: async (id: string, data: UpdateItemTemplateRequest): Promise<void> => {
    await api.put(`${BASE_URL}/${id}`, data);
  },

  deleteTemplate: async (id: string): Promise<void> => {
    await api.delete(`${BASE_URL}/${id}`);
  },

  addResources: async (id: string, resources: TemplateResourceRequest[]): Promise<void> => {
    await api.post(`${BASE_URL}/${id}/resources`, resources);
  },

  removeResources: async (id: string, resourceIds: string[]): Promise<void> => {
    // El backend espera un array de IDs en el body para el DELETE
    await api.delete(`${BASE_URL}/${id}/resources`, { data: resourceIds });
  },

  // Importación Masiva al Proyecto
  bulkImportTemplates: async (data: BulkImportRequest): Promise<void> => {
    await api.post(`${MODULES_URL}/${data.moduleId}/items/import`, data);
  }
};
