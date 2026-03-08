import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { resourceService } from '../../../services/construction/resource.service';
import { sileo } from 'sileo';
import type { CreateResourceRequest, UpdateResourceRequest } from '../../../types/construction/resource';

export const resourceKeys = {
  all: ['resources'] as const,
  list: (page: number, size: number) => [...resourceKeys.all, 'list', page, size] as const,
};

export const useResourcesQuery = (pageNumber = 1, pageSize = 10) => {
  return useQuery({
    queryKey: resourceKeys.list(pageNumber, pageSize),
    queryFn: () => resourceService.getResources(pageNumber, pageSize),
  });
};

export const useCreateResourceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateResourceRequest) => resourceService.createResource(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: resourceKeys.all });
      sileo.success({
        title: 'Recurso Creado',
        description: 'El insumo ha sido registrado en el catálogo.'
      });
    },
    onError: (error: any) => {
      sileo.error({
        title: 'Error al crear',
        description: error.response?.data?.message || 'No se pudo registrar el recurso.'
      });
    }
  });
};

export const useUpdateResourceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateResourceRequest }) => 
      resourceService.updateResource(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: resourceKeys.all });
      sileo.success({
        title: 'Recurso Actualizado',
        description: 'Los cambios han sido guardados correctamente.'
      });
    },
    onError: (error: any) => {
      sileo.error({
        title: 'Error al actualizar',
        description: error.response?.data?.message || 'No se pudo actualizar el recurso.'
      });
    }
  });
};

export const useDeleteResourceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => resourceService.deleteResource(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: resourceKeys.all });
      sileo.success({
        title: 'Recurso Eliminado',
        description: 'El insumo ha sido removido del catálogo.'
      });
    },
    onError: (error: any) => {
      sileo.error({
        title: 'Error al eliminar',
        description: error.response?.data?.message || 'No se pudo eliminar el recurso.'
      });
    }
  });
};
