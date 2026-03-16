import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService } from '../../../services/construction/project.service';
import { sileo } from 'sileo';
import type { BatchMembersRequest } from '../../../types/construction/projectMember';

export const memberKeys = {
  all: ['projectMembers'] as const,
  list: (projectId: string) => [...memberKeys.all, 'list', projectId] as const,
};

export const useProjectMembersQuery = (projectId: string) => {
  return useQuery({
    queryKey: memberKeys.list(projectId),
    queryFn: () => projectService.getProjectMembers(projectId),
    enabled: !!projectId,
  });
};

export const useInviteMembersMutation = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BatchMembersRequest) => projectService.inviteMembers(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memberKeys.list(projectId) });
      sileo.success({ title: 'Usuario(s) invitados', description: 'El equipo ha sido actualizado con éxito.' });
    },
    onError: (error: any) => {
      sileo.error({ title: 'Error al invitar', description: error.response?.data?.message || 'Error de validación.' });
    }
  });
};

export const useUpdateMembersMutation = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BatchMembersRequest) => projectService.updateMembers(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memberKeys.list(projectId) });
      sileo.success({ title: 'Permisos actualizados' });
    }
  });
};

export const useTransferManagerMutation = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newManagerUserId: string) => projectService.transferManager(projectId, newManagerUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: memberKeys.list(projectId) });
      sileo.success({ title: 'Liderazgo transferido', description: 'Se ha asignado un nuevo encargado para la obra.' });
    }
  });
};
