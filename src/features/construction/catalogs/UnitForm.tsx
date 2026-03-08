import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Save, Loader2, Ruler, Type } from 'lucide-react';
import { useCreateUnitMutation, useUpdateUnitMutation } from '../../../hooks/queries/construction/useUnits';
import type { UnitDto, CreateUnitRequest } from '../../../types/construction/unit';

const unitSchema = z.object({
  name: z.string().min(2, 'El nombre es demasiado corto').max(50, 'Máximo 50 caracteres'),
  abbreviation: z.string().min(1, 'El símbolo es requerido').max(10, 'Máximo 10 caracteres'),
});

interface UnitFormProps {
  unit?: UnitDto;
  onClose: () => void;
}

const UnitForm: React.FC<UnitFormProps> = ({ unit, onClose }) => {
  const isEditing = !!unit;
  const { mutate: createUnit, isPending: isCreating } = useCreateUnitMutation();
  const { mutate: updateUnit, isPending: isUpdating } = useUpdateUnitMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUnitRequest>({
    resolver: zodResolver(unitSchema),
  });

  useEffect(() => {
    if (unit) {
      reset({
        name: unit.name,
        abbreviation: unit.abbreviation,
      });
    }
  }, [unit, reset]);

  const onSubmit = (data: CreateUnitRequest) => {
    if (isEditing && unit) {
      updateUnit({ id: unit.id, data: { ...data, id: unit.id } }, {
        onSuccess: onClose
      });
    } else {
      createUnit(data, {
        onSuccess: onClose
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 text-left">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-100 text-white">
              <Ruler className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              {isEditing ? 'Editar Unidad' : 'Nueva Unidad de Medida'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5 text-left">
          <div className="space-y-4">
            {/* Nombre */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Type className="h-4 w-4 text-blue-500" /> Nombre de la Unidad
              </label>
              <input 
                {...register('name')}
                type="text"
                placeholder="Ej. Metros Cúbicos"
                className={`w-full px-4 py-2.5 rounded-xl border transition-all text-sm outline-none ${
                  errors.name ? 'border-red-300 focus:ring-red-100 focus:border-red-500' : 'border-gray-200 focus:ring-blue-100 focus:border-blue-500'
                }`}
              />
              {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name.message}</p>}
            </div>

            {/* Símbolo */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <span className="text-blue-500 font-black text-xs">SYM</span> Símbolo / Abrev.
              </label>
              <input 
                {...register('abbreviation')}
                type="text"
                placeholder="Ej. m3"
                className={`w-full px-4 py-2.5 rounded-xl border transition-all text-sm outline-none ${
                  errors.abbreviation ? 'border-red-300 focus:ring-red-100 focus:border-red-500' : 'border-gray-200 focus:ring-blue-100 focus:border-blue-500'
                }`}
              />
              {errors.abbreviation && <p className="text-xs text-red-500 font-medium">{errors.abbreviation.message}</p>}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isCreating || isUpdating}
              className="px-8 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCreating || isUpdating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {isEditing ? 'Guardar Cambios' : 'Registrar Unidad'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UnitForm;
