import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Save, Loader2, Building2, Type, Tag, MapPin, User, DollarSign } from 'lucide-react';
import { useCreateProjectMutation, useUpdateProjectMutation } from '../../../hooks/queries/construction/useProjects';
import { ProjectStatus } from '../../../types/construction/project';
import type { CreateProjectRequest, ProjectDto } from '../../../types/construction/project';

const projectSchema = z.object({
  name: z.string().min(3, 'El nombre es demasiado corto').max(100),
  code: z.string().min(2, 'El código es requerido').max(20),
  location: z.string().min(5, 'Especifica una ubicación válida'),
  client: z.string().min(3, 'El nombre del cliente es requerido'),
  exchangeRate: z.number().min(1, 'Tasa inválida'),
});

interface ProjectFormProps {
  project?: ProjectDto; // Si viene, estamos en modo Edición
  onClose: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onClose }) => {
  const isEditing = !!project;
  const { mutate: createProject, isPending: isCreating } = useCreateProjectMutation();
  const { mutate: updateProject, isPending: isUpdating } = useUpdateProjectMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProjectRequest>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      exchangeRate: 6.96 
    }
  });

  // Cargar datos si estamos editando
  useEffect(() => {
    if (project) {
      reset({
        name: project.name,
        code: project.code,
        location: project.location,
        client: project.client,
        exchangeRate: project.exchangeRate
      });
    }
  }, [project, reset]);

  const onSubmit = (data: CreateProjectRequest) => {
    if (isEditing && project) {
      updateProject({ 
        id: project.id, 
        data: { ...data, status: project.status } 
      }, {
        onSuccess: onClose
      });
    } else {
      createProject(data, {
        onSuccess: onClose
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-200 text-left text-left">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 text-left">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 text-left">
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-100 text-white">
              <Building2 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-black text-gray-900">
              {isEditing ? 'Editar Información de Obra' : 'Registrar Nueva Obra'}
            </h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all text-left">
            <X className="h-6 w-6 text-left" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="md:col-span-2 space-y-1.5 text-left">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest text-left">Nombre del Proyecto</label>
              <input {...register('name')} className="w-full px-4 py-3 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-100 text-sm font-bold text-gray-700" />
              {errors.name && <p className="text-[10px] text-red-500 font-bold">{errors.name.message as string}</p>}
            </div>

            <div className="space-y-1.5 text-left text-left">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Código de Obra</label>
              <input {...register('code')} className="w-full px-4 py-3 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-100 text-sm font-bold text-gray-700" />
            </div>

            <div className="space-y-1.5 text-left text-left">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Cliente</label>
              <input {...register('client')} className="w-full px-4 py-3 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-100 text-sm font-bold text-gray-700" />
            </div>

            <div className="md:col-span-2 space-y-1.5 text-left">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Ubicación</label>
              <input {...register('location')} className="w-full px-4 py-3 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-100 text-sm font-bold text-gray-700" />
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Tasa de Cambio (Bs/USD)</label>
              <input {...register('exchangeRate', { valueAsNumber: true })} type="number" step="0.01" className="w-full px-4 py-3 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-100 text-sm font-black text-blue-600" />
            </div>
          </div>

          <div className="pt-6 flex items-center justify-end gap-4 text-left">
            <button type="button" onClick={onClose} className="px-8 py-3 text-sm font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-2xl transition-all">
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isCreating || isUpdating}
              className="px-10 py-3 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center gap-3 disabled:opacity-50"
            >
              {isCreating || isUpdating ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
              {isEditing ? 'Actualizar Proyecto' : 'Crear Proyecto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
