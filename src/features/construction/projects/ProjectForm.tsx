import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Save, Loader2, Building2, Type, Tag, MapPin, User, DollarSign } from 'lucide-react';
import { useCreateProjectMutation } from '../../../hooks/queries/construction/useProjects';
import type { CreateProjectRequest } from '../../../types/construction/project';

const projectSchema = z.object({
  name: z.string().min(3, 'El nombre es demasiado corto').max(100),
  code: z.string().min(2, 'El código es requerido').max(20),
  location: z.string().min(5, 'Especifica una ubicación válida'),
  client: z.string().min(3, 'El nombre del cliente es requerido'), // Cambiado de clientName a client
  exchangeRate: z.number().min(1, 'Tasa inválida'),
});

interface ProjectFormProps {
  onClose: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onClose }) => {
  const { mutate: createProject, isPending } = useCreateProjectMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProjectRequest>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      exchangeRate: 6.96 
    }
  });

  const onSubmit = (data: CreateProjectRequest) => {
    createProject(data, {
      onSuccess: onClose
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-200 text-left">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 text-left">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 text-left">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg shadow-lg text-white">
              <Building2 className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Registrar Nueva Obra / Proyecto</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {/* Nombre del Proyecto */}
            <div className="md:col-span-2 space-y-1.5 text-left">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Type className="h-4 w-4 text-blue-500" /> Nombre del Proyecto
              </label>
              <input 
                {...register('name')}
                type="text"
                placeholder="Ej. Edificio Los Olivos - Fase 1"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm outline-none"
              />
              {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name.message}</p>}
            </div>

            {/* Código Técnico */}
            <div className="space-y-1.5 text-left">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Tag className="h-4 w-4 text-blue-500" /> Código de Obra
              </label>
              <input 
                {...register('code')}
                type="text"
                placeholder="Ej. PRJ-2026-001"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm outline-none"
              />
              {errors.code && <p className="text-xs text-red-500 font-medium">{errors.code.message}</p>}
            </div>

            {/* Cliente */}
            <div className="space-y-1.5 text-left">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <User className="h-4 w-4 text-blue-500" /> Cliente / Entidad
              </label>
              <input 
                {...register('client')}
                type="text"
                placeholder="Ej. Inmobiliaria GAMA S.A."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm outline-none"
              />
              {errors.client && <p className="text-xs text-red-500 font-medium">{errors.client.message}</p>}
            </div>

            {/* Ubicación */}
            <div className="md:col-span-2 space-y-1.5 text-left">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-500" /> Ubicación de la Obra
              </label>
              <input 
                {...register('location')}
                type="text"
                placeholder="Ej. Zona Norte, Av. Circunvalación #456"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm outline-none"
              />
              {errors.location && <p className="text-xs text-red-500 font-medium">{errors.location.message}</p>}
            </div>

            {/* Tasa de Cambio */}
            <div className="space-y-1.5 text-left">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-blue-500" /> Tasa de Cambio (Bs por 1 USD)
              </label>
              <input 
                {...register('exchangeRate', { valueAsNumber: true })}
                type="number"
                step="0.01"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm outline-none"
              />
              {errors.exchangeRate && <p className="text-xs text-red-500 font-medium">{errors.exchangeRate.message}</p>}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 text-left">
            <button type="button" onClick={onClose} className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all">
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-8 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center gap-2 disabled:opacity-50"
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Crear Proyecto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
