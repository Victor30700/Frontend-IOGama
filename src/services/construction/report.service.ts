import api from '../../config/api';
import type { B1ReportDto, B3ReportDto } from '../../types/construction/report';

// Usamos PascalCase como en el Gateway para evitar errores 400
const BASE_URL = '/api/construction/api/Reports';

export const reportService = {
  // Formulario B-1 (Presupuesto)
  getB1Data: async (projectId: string): Promise<B1ReportDto> => {
    const response = await api.get<B1ReportDto>(`${BASE_URL}/projects/${projectId}/budget`);
    return response.data;
  },

  downloadB1Pdf: async (projectId: string, projectName: string): Promise<void> => {
    const response = await api.get(`${BASE_URL}/projects/${projectId}/budget/pdf`, {
      responseType: 'blob'
    });
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Formulario_B1_${projectName.replace(/\s+/g, '_')}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  },

  // Formulario B-2 (Análisis de Precio Unitario - Individual por Ítem)
  downloadB2Pdf: async (itemId: string, itemName: string): Promise<void> => {
    const response = await api.get(`${BASE_URL}/items/${itemId}/pdf`, {
      responseType: 'blob'
    });
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Formulario_B2_${itemName.replace(/\s+/g, '_')}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  },

  // Formulario B-3 (Insumos Consolidados)
  getB3Data: async (projectId: string): Promise<B3ReportDto> => {
    const response = await api.get<B3ReportDto>(`${BASE_URL}/projects/${projectId}/consolidated-resources`);
    return response.data;
  },

  downloadB3Pdf: async (projectId: string, projectName: string): Promise<void> => {
    const response = await api.get(`${BASE_URL}/projects/${projectId}/consolidated-resources/pdf`, {
      responseType: 'blob'
    });
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Formulario_B3_${projectName.replace(/\s+/g, '_')}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
};
