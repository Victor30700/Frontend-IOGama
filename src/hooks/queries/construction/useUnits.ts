import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { unitService } from '../../../services/construction/unit.service';
import { sileo } from 'sileo';
import type { CreateUnitRequest, UpdateUnitRequest } from '../../../types/construction/unit';

export const unitKeys = {
  all: ['units'] as const,
  list: () => [...unitKeys.all, 'list'] as const,
};

export const useUnitsQuery = () => {
  return useQuery({
    queryKey: unitKeys.list(),
    queryFn: unitService.getUnits,
  });
};

export const useCreateUnitMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUnitRequest) => unitService.createUnit(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: unitKeys.list() });
      sileo.success({
        title: 'Unidad Creada',
        description: 'La unidad de medida ha sido registrada exitosamente.'
      });
    },
    onError: (error: any) => {
      sileo.error({
        title: 'Error al crear',
        description: error.response?.data?.message || 'No se pudo registrar la unidad.'
      });
    }
  });
};

export const useUpdateUnitMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUnitRequest }) => 
      unitService.updateUnit(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: unitKeys.list() });
      sileo.success({
        title: 'Unidad Actualizada',
        description: 'Los cambios han sido guardados correctamente.'
      });
    },
    onError: (error: any) => {
      sileo.error({
        title: 'Error al actualizar',
        description: error.response?.data?.message || 'No se pudo actualizar la unidad.'
      });
    }
  });
};

export const useDeleteUnitMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => unitService.deleteUnit(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: unitKeys.list() });
      sileo.success({
        title: 'Unidad Eliminada',
        description: 'La unidad ha sido removida del catálogo.'
      });
    },
    onError: (error: any) => {
      sileo.error({
        title: 'Error al eliminar',
        description: error.response?.data?.message || 'No se pudo eliminar la unidad.'
      });
    }
  });
};
