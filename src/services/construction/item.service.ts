import api from '../../config/api';
import type { BudgetItemDto } from '../../types/construction/item';
import type { 
  BudgetItemAnalysisDto, 
  UpdateItemResourceRequest, 
  AddCustomResourceRequest 
} from '../../types/construction/itemAnalysis';

const BASE_URL = '/api/construction/api';

export const itemService = {
  // Gestión de Cabecera de Ítems
  getModuleItems: async (moduleId: string): Promise<BudgetItemDto[]> => {
    const response = await api.get<BudgetItemDto[]>(`${BASE_URL}/modules/${moduleId}/items`);
    return response.data;
  },

  updateItem: async (id: string, data: Partial<BudgetItemDto>): Promise<void> => {
    await api.put(`${BASE_URL}/items/${id}`, data);
  },

  deleteItem: async (id: string): Promise<void> => {
    await api.delete(`${BASE_URL}/items/${id}`);
  },

  // Gestión de Análisis de Precios Unitarios (APU)
  getItemAnalysis: async (id: string): Promise<BudgetItemAnalysisDto> => {
    const response = await api.get<BudgetItemAnalysisDto>(`${BASE_URL}/items/${id}/analysis`);
    return response.data;
  },

  // Añadir recurso manual (no del catálogo)
  addCustomResource: async (id: string, data: AddCustomResourceRequest): Promise<void> => {
    await api.post(`${BASE_URL}/items/${id}/resources/custom`, data);
  },

  // Actualizar rendimiento o precio de un recurso específico en el APU
  updateItemResource: async (itemId: string, resourceId: string, data: UpdateItemResourceRequest): Promise<void> => {
    await api.put(`${BASE_URL}/items/${itemId}/resources/${resourceId}`, data);
  },

  // Quitar un recurso del APU
  removeItemResource: async (itemId: string, resourceId: string): Promise<void> => {
    await api.delete(`${BASE_URL}/items/${itemId}/resources/${resourceId}`);
  }
};
