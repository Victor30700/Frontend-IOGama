import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  Camera, 
  Save, 
  Loader2,
  Building
} from 'lucide-react';
import { useProfile, useUpdateProfile } from '../../hooks/queries/useProfile';
import type { UpdateProfileRequest } from '../../types/profile';

const profileSchema = z.object({
  fotoPerfilUrl: z.string().url('URL de foto inválida').optional().or(z.literal('')),
  biografia: z.string().max(500, 'Máximo 500 caracteres').optional(),
  celular: z.string().min(8, 'Celular inválido').optional(),
  direccion: z.string().min(5, 'Dirección demasiado corta').optional(),
});

const ProfileSettings: React.FC = () => {
  const { data: profile, isLoading: isProfileLoading } = useProfile();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateProjectRequest>({
    resolver: zodResolver(profileSchema),
  });

  // Cargar datos iniciales
  useEffect(() => {
    if (profile) {
      reset({
        fotoPerfilUrl: profile.fotoPerfilUrl || '',
        biografia: profile.biografia || '',
        celular: profile.celular || '',
        direccion: profile.direccion || '',
      });
    }
  }, [profile, reset]);

  const isPhotoValid = (url?: string) => {
    if (!url) return false;
    if (url.includes('www.fotoURL.com')) return false;
    if (!url.startsWith('http')) return false;
    return true;
  };

  const onSubmit = (data: UpdateProfileRequest) => {
    updateProfile(data);
  };

  if (isProfileLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 text-left">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
        <p className="text-gray-500 font-medium">Cargando perfil...</p>
      </div>
    );
  }

  const displayName = profile?.razonSocial || `${profile?.nombres} ${profile?.apellidoPaterno || ''}`;

  return (
    <div className="space-y-6 text-left">
      {/* Header Profile */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-left">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-800"></div>
        <div className="px-8 pb-8 text-left">
          <div className="relative flex justify-between items-end -mt-12 text-left">
            <div className="relative group text-left">
              <div className="h-24 w-24 rounded-2xl border-4 border-white bg-gray-100 overflow-hidden shadow-lg flex items-center justify-center text-left">
                {isPhotoValid(profile?.fotoPerfilUrl) ? (
                  <img 
                    src={profile!.fotoPerfilUrl} 
                    alt="Avatar" 
                    className="h-full w-full object-cover" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      const fallback = (e.target as HTMLImageElement).parentElement;
                      if (fallback) {
                        fallback.innerHTML = `
                          <div class="h-full w-full flex items-center justify-center bg-blue-50 text-blue-600 text-3xl font-bold">
                            ${displayName[0]}
                          </div>
                        `;
                      }
                    }}
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-blue-50 text-blue-600 text-3xl font-bold text-left">
                    {displayName[0]}
                  </div>
                )}
              </div>
              <button className="absolute bottom-0 right-0 p-1.5 bg-white rounded-lg shadow-md border border-gray-100 text-gray-600 hover:text-blue-600 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="mt-4 text-left">
            <h2 className="text-2xl font-bold text-gray-900">{displayName}</h2>
            <div className="flex items-center gap-4 mt-1 text-left">
              <span className="flex items-center gap-1.5 text-sm text-gray-500">
                <Mail className="h-4 w-4" /> {profile?.email}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-gray-500">
                <Building className="h-4 w-4" /> {profile?.userType}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
        {/* Basic Info */}
        <div className="lg:col-span-2 space-y-6 text-left">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-left">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 text-left">
              <FileText className="h-5 w-5 text-blue-600" /> Información Personal
            </h3>
            
            <div className="space-y-4 text-left">
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Biografía / Descripción</label>
                <textarea 
                  {...register('biografia')}
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all resize-none text-sm text-gray-600 outline-none"
                  placeholder="Cuéntanos un poco sobre ti o tu empresa..."
                />
                {errors.biografia && <p className="mt-1 text-xs text-red-500">{errors.biografia.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="text-left">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Celular de Contacto</label>
                  <div className="relative text-left">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input 
                      {...register('celular')}
                      type="text" 
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm outline-none"
                      placeholder="+51 999 999 999"
                    />
                  </div>
                  {errors.celular && <p className="mt-1 text-xs text-red-500">{errors.celular.message}</p>}
                </div>
                <div className="text-left">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5 text-left">Dirección Física</label>
                  <div className="relative text-left">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input 
                      {...register('direccion')}
                      type="text" 
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm outline-none"
                      placeholder="Calle las Flores 123..."
                    />
                  </div>
                  {errors.direccion && <p className="mt-1 text-xs text-red-500">{errors.direccion.message}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Sidebar */}
        <div className="space-y-6 text-left">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-left">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 text-left">
              <Save className="h-5 w-5 text-blue-600" /> Acciones
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Asegúrate de guardar tus cambios antes de salir de esta página.
            </p>
            <button
              type="submit"
              disabled={!isDirty || isUpdating}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-100"
            >
              {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {isUpdating ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl text-left">
            <h4 className="text-sm font-bold text-blue-800 mb-2">Visibilidad de Perfil</h4>
            <p className="text-xs text-blue-600 leading-relaxed text-left">
              Esta información es visible para los administradores y puede ser utilizada para procesos internos del ERP.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
