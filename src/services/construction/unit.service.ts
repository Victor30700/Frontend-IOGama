import api from '../../config/api';
import type { UnitDto, CreateUnitRequest, UpdateUnitRequest } from '../../types/construction/unit';

const BASE_URL = '/api/construction/api/Units';

export const unitService = {
  getUnits: async (): Promise<UnitDto[]> => {
    const response = await api.get<UnitDto[]>(BASE_URL);
    return response.data;
  },

  createUnit: async (data: CreateUnitRequest): Promise<string> => {
    const response = await api.post<string>(BASE_URL, data);
    return response.data;
  },

  updateUnit: async (id: string, data: UpdateUnitRequest): Promise<void> => {
    await api.put(`${BASE_URL}/${id}`, data);
  },

  deleteUnit: async (id: string): Promise<void> => {
    await api.delete(`${BASE_URL}/${id}`);
  },
};
