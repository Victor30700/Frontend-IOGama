import { useQuery, useMutation } from '@tanstack/react-query';
import { reportService } from '../../../services/construction/report.service';
import { sileo } from 'sileo';

export const reportKeys = {
  all: ['reports'] as const,
  b1: (id: string) => [...reportKeys.all, 'b1', id] as const,
  b3: (id: string) => [...reportKeys.all, 'b3', id] as const,
};

export const useB1DataQuery = (projectId: string) => {
  return useQuery({
    queryKey: reportKeys.b1(projectId),
    queryFn: () => reportService.getB1Data(projectId),
    enabled: !!projectId,
  });
};

export const useDownloadB1Mutation = () => {
  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) => reportService.downloadB1Pdf(id, name),
    onSuccess: () => sileo.success({ title: 'Descarga iniciada', description: 'El Formulario B-1 se está generando.' }),
    onError: () => sileo.error({ title: 'Error', description: 'No se pudo generar el PDF del presupuesto.' })
  });
};

export const useDownloadB2Mutation = () => {
  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) => reportService.downloadB2Pdf(id, name),
    onSuccess: () => sileo.success({ title: 'Descarga iniciada', description: 'El Formulario B-2 se está generando.' }),
    onError: () => sileo.error({ title: 'Error', description: 'No se pudo generar el PDF del análisis.' })
  });
};

export const useDownloadB3Mutation = () => {
  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) => reportService.downloadB3Pdf(id, name),
    onSuccess: () => sileo.success({ title: 'Descarga iniciada', description: 'El Formulario B-3 se está generando.' }),
    onError: () => sileo.error({ title: 'Error', description: 'No se pudo generar el PDF de insumos.' })
  });
};
