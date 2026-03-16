import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Save, Loader2, Package, Type, DollarSign, Ruler, Tag } from 'lucide-react';
import { useCreateResourceMutation, useUpdateResourceMutation } from '../../../hooks/queries/construction/useResources';
import { useUnitsQuery } from '../../../hooks/queries/construction/useUnits';
import type { ResourceDto, CreateResourceRequest } from '../../../types/construction/resource';

const resourceSchema = z.object({
  name: z.string().min(2, 'El nombre es demasiado corto'),
  unitOfMeasureId: z.string().min(1, 'La unidad es requerida'),
  basePrice: z.number().min(0, 'El precio no puede ser negativo'),
  type: z.string().min(1, 'El tipo es requerido'),
  code: z.string().optional().or(z.literal('')),
});

interface ResourceFormProps {
  resource?: ResourceDto;
  onClose: () => void;
}

const ResourceForm: React.FC<ResourceFormProps> = ({ resource, onClose }) => {
  const isEditing = !!resource;
  const { mutate: createResource, isPending: isCreating } = useCreateResourceMutation();
  const { mutate: updateResource, isPending: isUpdating } = useUpdateResourceMutation();
  const { data: units } = useUnitsQuery();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(resourceSchema),
    defaultValues: {
      type: 'Materiales',
      basePrice: 0
    }
  });

  useEffect(() => {
    if (resource) {
      reset({
        name: resource.name,
        unitOfMeasureId: units?.find(u => u.abbreviation === resource.unitAbbreviation)?.id || '',
        basePrice: resource.basePrice,
        type: resource.type,
        code: resource.code,
      });
    }
  }, [resource, reset, units]);

  const onSubmit = (data: any) => {
    const action = isEditing ? updateResource : createResource;
    const finalData = isEditing ? { id: resource!.id, data: { ...data, id: resource!.id } } : data;

    action(finalData as any, {
      onSuccess: () => {
        // La notificación de éxito ahora viene del hook useResources.ts
        onClose();
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-200 text-left">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg shadow-lg text-white">
              <Package className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              {isEditing ? 'Editar Recurso' : 'Nuevo Recurso / Insumo'}
            </h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2 text-left">
                <Type className="h-4 w-4 text-blue-500" /> Nombre del Insumo
              </label>
              <input {...register('name')} type="text" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-100" />
              {errors.name && <p className="text-xs text-red-500">{errors.name.message as string}</p>}
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Tag className="h-4 w-4 text-blue-500" /> Código
              </label>
              <input {...register('code')} type="text" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none" />
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Package className="h-4 w-4 text-blue-500" /> Categoría
              </label>
              <select {...register('type')} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none bg-white">
                <option value="Materiales">Materiales</option>
                <option value="Obreros">Mano de Obra</option>
                <option value="Equipos">Equipos y Herramientas</option>
              </select>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Ruler className="h-4 w-4 text-blue-500" /> Unidad
              </label>
              <select {...register('unitOfMeasureId')} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none bg-white">
                <option value="">Seleccionar...</option>
                {units?.map(u => <option key={u.id} value={u.id}>{u.name} ({u.abbreviation})</option>)}
              </select>
              {errors.unitOfMeasureId && <p className="text-xs text-red-500">{errors.unitOfMeasureId.message as string}</p>}
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-blue-500" /> Precio Base
              </label>
              <input {...register('basePrice', { valueAsNumber: true })} type="number" step="0.01" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none" />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 text-left text-left">
            <button type="button" onClick={onClose} className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-xl">Cancelar</button>
            <button type="submit" disabled={isCreating || isUpdating} className="px-8 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50">
              {isCreating || isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Guardar Recurso
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResourceForm;
