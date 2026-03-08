import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Save, Loader2, Package, Type, DollarSign, Ruler, Tag } from 'lucide-react';
import Swal from 'sweetalert2';
import { useCreateResourceMutation, useUpdateResourceMutation } from '../../../hooks/queries/construction/useResources';
import { useUnitsQuery } from '../../../hooks/queries/construction/useUnits';
import type { ResourceDto, CreateResourceRequest } from '../../../types/construction/resource';

// Definimos los tipos como números para el backend
const resourceSchema = z.object({
  name: z.string().min(2, 'El nombre es demasiado corto'),
  unitOfMeasureId: z.string().min(1, 'La unidad es requerida'),
  basePrice: z.number().min(0, 'El precio no puede ser negativo'),
  type: z.coerce.number(), // Forzamos a número (0, 1, 2)
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
      type: 0, // Default: Materiales
      basePrice: 0
    }
  });

  useEffect(() => {
    if (resource) {
      // Mapeo de string a número para edición
      const typeMap: Record<string, number> = {
        'Materiales': 0,
        'Obrero': 1,
        'Mano de Obra': 1,
        'Equipo': 2
      };

      reset({
        name: resource.name,
        unitOfMeasureId: units?.find(u => u.abbreviation === resource.unitAbbreviation)?.id || '',
        basePrice: resource.basePrice,
        type: typeMap[resource.type] ?? 0,
        code: resource.code,
      });
    }
  }, [resource, reset, units]);

  const onSubmit = (data: any) => {
    // El backend espera el tipo como entero según el error 400
    const payload = {
      ...data,
      type: Number(data.type)
    };

    const action = isEditing ? updateResource : createResource;
    const finalData = isEditing ? { id: resource!.id, data: { ...payload, id: resource!.id } } : payload;

    action(finalData as any, {
      onSuccess: () => {
        Swal.fire({
          title: isEditing ? '¡Actualizado!' : '¡Registrado!',
          text: 'Insumo guardado correctamente en el catálogo.',
          icon: 'success',
          confirmButtonColor: '#2563eb',
          customClass: { popup: 'rounded-2xl' }
        });
        onClose();
      },
      onError: (err: any) => {
        // Extraer mensaje detallado del error 400 que me pasaste
        const serverErrors = err.response?.data?.errors;
        let errorMessage = 'Verifica los datos ingresados.';
        
        if (serverErrors) {
          errorMessage = Object.values(serverErrors).flat().join('\n');
        }

        Swal.fire({
          title: 'Error del Servidor',
          text: errorMessage,
          icon: 'error',
          confirmButtonColor: '#ef4444',
          customClass: { popup: 'rounded-2xl' }
        });
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Type className="h-4 w-4 text-blue-500" /> Nombre del Insumo
              </label>
              <input 
                {...register('name')}
                type="text"
                placeholder="Ej. Cemento IP-40"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm outline-none"
              />
              {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Tag className="h-4 w-4 text-blue-500" /> Código Interno
              </label>
              <input 
                {...register('code')}
                type="text"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm outline-none"
              />
            </div>

            {/* Selector con valores numéricos para el Enum de C# */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Package className="h-4 w-4 text-blue-500" /> Tipo de Recurso
              </label>
              <select 
                {...register('type')}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm outline-none bg-white"
              >
                <option value={0}>Materiales</option>
                <option value={1}>Mano de Obra (Obrero)</option>
                <option value={2}>Equipos y Herramientas</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Ruler className="h-4 w-4 text-blue-500" /> Unidad de Medida
              </label>
              <select 
                {...register('unitOfMeasureId')}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm outline-none bg-white"
              >
                <option value="">Selecciona una unidad...</option>
                {units?.map(unit => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name} ({unit.abbreviation})
                  </option>
                ))}
              </select>
              {errors.unitOfMeasureId && <p className="text-xs text-red-500 font-medium">{errors.unitOfMeasureId.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-blue-500" /> Precio Base (Bs.)
              </label>
              <input 
                {...register('basePrice', { valueAsNumber: true })}
                type="number"
                step="0.01"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm outline-none"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button type="button" onClick={onClose} className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all">
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isCreating || isUpdating}
              className="px-8 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center gap-2"
            >
              {isCreating || isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Finalizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResourceForm;
