import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { KeyRound, Lock, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import api from '../../config/api';
import { useAuthStore } from '../../store/authStore';
import type { ChangePasswordRequest } from '../../types/auth';

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'La contraseña actual es requerida'),
  newPassword: z.string()
    .min(8, 'La nueva contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .regex(/[a-z]/, 'Debe contener al menos una minúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número'),
  confirmNewPassword: z.string().min(1, 'Debes confirmar la nueva contraseña'),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmNewPassword"],
});

const ChangePassword: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordRequest>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      await api.post('/api/users/Auth/change-password', data);
      setIsSuccess(true);
      
      // Logout and redirect after a brief delay to show success
      setTimeout(() => {
        logout();
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        'Error al cambiar la contraseña. Verifica tu contraseña actual.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-50 rounded-lg">
          <KeyRound className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Cambiar Contraseña</h2>
      </div>

      {isSuccess ? (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-400" />
          <div className="text-sm text-green-700">
            <p className="font-bold">¡Éxito!</p>
            <p>Contraseña actualizada. Redirigiendo al login...</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña Actual
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-gray-400" />
              </div>
              <input
                {...register('currentPassword')}
                type="password"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="••••••••"
              />
            </div>
            {errors.currentPassword && (
              <p className="mt-1 text-xs text-red-600">{errors.currentPassword.message}</p>
            )}
          </div>

          <hr className="my-4 border-gray-100" />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nueva Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-gray-400" />
              </div>
              <input
                {...register('newPassword')}
                type="password"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Mínimo 8 caracteres"
              />
            </div>
            {errors.newPassword && (
              <p className="mt-1 text-xs text-red-600">{errors.newPassword.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar Nueva Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-gray-400" />
              </div>
              <input
                {...register('confirmNewPassword')}
                type="password"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Repite la nueva contraseña"
              />
            </div>
            {errors.confirmNewPassword && (
              <p className="mt-1 text-xs text-red-600">{errors.confirmNewPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
          >
            {isLoading ? (
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
            ) : null}
            {isLoading ? 'Actualizando...' : 'Cambiar Contraseña'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ChangePassword;
