import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { employeeService } from '../../services/employee.service';
import Swal from 'sweetalert2';
import { sileo } from 'sileo';
import type { CreateEmployeeRequest, UserPermissions } from '../../types/employee';

export const employeeKeys = {
  all: ['employees'] as const,
  list: () => [...employeeKeys.all, 'list'] as const,
  permissions: (userId: string) => [...employeeKeys.all, 'permissions', userId] as const,
};

export const useEmployees = () => {
  return useQuery({
    queryKey: employeeKeys.list(),
    queryFn: employeeService.getEmployees,
  });
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEmployeeRequest) => employeeService.createEmployee(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.list() });
      Swal.fire({
        title: '¡Empleado Creado!',
        text: 'El nuevo empleado ha sido registrado correctamente.',
        icon: 'success',
        confirmButtonColor: '#2563eb',
        customClass: { popup: 'rounded-2xl' }
      });
    },
    onError: (error: any) => {
      const serverErrors = error.response?.data?.errors;
      let errorDetail = 'No se pudo crear el empleado.';

      if (serverErrors) {
        // Si el backend devuelve un objeto de errores (típico de ASP.NET Core)
        errorDetail = Object.values(serverErrors).flat().join('<br/>');
      } else if (error.response?.data?.message) {
        errorDetail = error.response.data.message;
      }

      Swal.fire({
        title: 'Error de Validación',
        html: `<div class="text-left text-sm text-red-600">${errorDetail}</div>`,
        icon: 'error',
        confirmButtonColor: '#ef4444',
        customClass: { popup: 'rounded-2xl' }
      });
    }
  });
};

export const useUpdateEmployeeStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: number }) => 
      employeeService.updateEmployeeStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.list() });
      sileo.success({ title: 'Estado actualizado correctamente' });
    },
    onError: (error: any) => {
      sileo.error({
        title: 'Error al cambiar estado',
        description: error.response?.data?.message || 'No se pudo actualizar el estado del empleado.'
      });
    }
  });
};

export const useResetEmployeePassword = () => {
  return useMutation({
    mutationFn: ({ id, newPassword }: { id: string; newPassword: string }) => 
      employeeService.resetEmployeePassword(id, newPassword),
    onSuccess: () => {
      Swal.fire({
        title: '¡Contraseña Reseteada!',
        text: 'La clave del empleado ha sido actualizada.',
        icon: 'success',
        confirmButtonColor: '#2563eb',
        customClass: { popup: 'rounded-2xl' }
      });
    },
    onError: (error: any) => {
      sileo.error({
        title: 'Error al resetear',
        description: error.response?.data?.message || 'No se pudo actualizar la contraseña.'
      });
    }
  });
};

export const useUpdatePermissions = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (permisos: UserPermissions) => employeeService.upsertUserPermissions(userId, permisos),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.permissions(userId) });
      sileo.success({ title: 'Permisos actualizados correctamente' });
    },
    onError: (error: any) => {
      sileo.error({
        title: 'Error de permisos',
        description: error.response?.data?.message || 'No se pudieron actualizar los permisos granulares.'
      });
    }
  });
};
