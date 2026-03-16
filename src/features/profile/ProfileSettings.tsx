import React, { useEffect, useRef, useState } from 'react';
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
  ShieldCheck,
  History,
  Trash2,
  Info,
  Building2,
  Briefcase
} from 'lucide-react';
import { useProfile, useUpdateProfile } from '../../hooks/queries/useProfile';
import type { UpdateProfileRequest } from '../../types/profile';
import Swal from 'sweetalert2';

const profileSchema = z.object({
  fotoPerfilUrl: z.string().optional().or(z.literal('')),
  biografia: z.string().max(1000, 'La descripción es demasiado larga').optional().or(z.literal('')),
  celular: z.string().min(7, 'Celular inválido').optional().or(z.literal('')),
  direccion: z.string().min(5, 'Dirección demasiado corta').optional().or(z.literal('')),
});

const ProfileSettings: React.FC = () => {
  const { data: profile, isLoading: isProfileLoading } = useProfile();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty },
  } = useForm<UpdateProfileRequest>({
    resolver: zodResolver(profileSchema),
  });

  // CARGA AUTOMÁTICA DE DATOS PERSISTIDOS (Nueva Estructura)
  useEffect(() => {
    if (profile) {
      // Intentamos sacar celular y direccion de donde sea que esten (Personales o Empresa)
      const celularPersistido = profile.datosPersonales?.celular || profile.datosEmpresa?.telefonoOficina || '';
      const direccionPersistida = profile.datosPersonales?.direccion || profile.datosEmpresa?.direccionLegal || '';

      reset({
        fotoPerfilUrl: profile.fotoPerfilUrl || '',
        biografia: profile.biografia || '',
        celular: celularPersistido,
        direccion: direccionPersistida,
      });
      setPreviewUrl(null);
    }
  }, [profile, reset]);

  const isPhotoValid = (url?: string) => {
    if (!url) return false;
    if (url.includes('www.fotoURL.com')) return false;
    if (!url.startsWith('http') && !url.startsWith('data:')) return false;
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreviewUrl(base64);
        setValue('fotoPerfilUrl', base64, { shouldDirty: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    Swal.fire({
      title: '¿Quitar foto de perfil?',
      text: "Se eliminará tu imagen actual.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Sí, eliminar',
      customClass: { popup: 'rounded-[32px]' }
    }).then((result) => {
      if (result.isConfirmed) {
        setPreviewUrl(null);
        setValue('fotoPerfilUrl', '', { shouldDirty: true });
      }
    });
  };

  const onSubmit = (data: UpdateProfileRequest) => {
    Swal.fire({
      title: '¿Guardar cambios?',
      text: "Se actualizará tu información de perfil corporativo.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      confirmButtonText: 'Sí, actualizar',
      customClass: { popup: 'rounded-[32px]' }
    }).then((result) => {
      if (result.isConfirmed) {
        updateProfile(data);
      }
    });
  };

  if (isProfileLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 text-left">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin text-left" />
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Cargando perfil ejecutivo...</p>
      </div>
    );
  }

  // Lógica de visualización de nombre
  const displayName = profile?.datosEmpresa?.razonSocial || 
                     (profile?.datosPersonales?.nombres ? `${profile.datosPersonales.nombres} ${profile.datosPersonales.apellidoPaterno || ''}` : 'Usuario');

  const hasPhoto = previewUrl || isPhotoValid(profile?.fotoPerfilUrl);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700 text-left">
      <div className="text-left">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight text-left">Configuración de Perfil</h2>
        <p className="text-slate-500 font-medium text-left text-left">Gestiona tu identidad profesional y datos de contacto.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        {/* Lado Izquierdo: Identidad Visual */}
        <div className="lg:col-span-4 space-y-6 text-left">
          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 text-center text-left">
            <div className="relative inline-block text-left mb-6">
              <div className="h-36 w-36 rounded-[40px] overflow-hidden bg-slate-50 border-4 border-slate-50 shadow-inner flex items-center justify-center text-left">
                {hasPhoto ? (
                  <img src={previewUrl || profile!.fotoPerfilUrl} alt="Avatar" className="h-full w-full object-cover" />
                ) : (
                  <User className="h-14 w-14 text-slate-200" />
                )}
              </div>
              
              <div className="absolute -bottom-2 -right-2 flex flex-col gap-2 text-left">
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-700 transition-all border-4 border-white text-left"
                  title="Cambiar foto"
                >
                  <Camera className="h-5 w-5 text-left" />
                </button>
                {hasPhoto && (
                  <button 
                    type="button"
                    onClick={handleRemovePhoto}
                    className="p-2 bg-red-50 text-red-600 rounded-xl shadow-md hover:bg-red-100 transition-all border-2 border-white text-left"
                    title="Eliminar foto"
                  >
                    <Trash2 className="h-4 w-4 text-left" />
                  </button>
                )}
              </div>
              
              <input type="file" ref={fileInputRef} className="hidden text-left" accept="image/*" onChange={handleFileChange} />
            </div>

            <div className="text-left text-left">
              <h3 className="text-xl font-black text-slate-900 leading-tight mb-1 text-left">{displayName}</h3>
              <div className="flex items-center gap-2 text-slate-500 mb-6 text-left text-left">
                <Mail className="h-3.5 w-3.5 opacity-40 text-left" />
                <span className="text-xs font-bold truncate text-left">{profile?.email}</span>
              </div>
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest text-left text-left">
                <ShieldCheck className="h-3 w-3 text-left" /> {profile?.tipoUsuario}
              </div>
            </div>
          </div>

          <div className="bg-blue-600/5 border border-blue-600/10 p-6 rounded-[32px] text-left text-left">
            <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-3 flex items-center gap-2 text-left">
              <Info className="h-4 w-4 text-left" /> Centro de Identidad
            </h4>
            <p className="text-[13px] text-slate-600 leading-relaxed font-medium text-left">
              En esta sección tienes el control sobre tu <span className="text-slate-900 font-bold text-left">imagen de perfil</span>, la <span className="text-slate-900 font-bold text-left">reseña corporativa</span> de la empresa y tus datos de contacto. 
              <br /><br />
              Asegúrate de mantener esta información actualizada para presupuestos y reportes.
            </p>
          </div>
        </div>

        {/* Lado Derecho: Formulario Maestro */}
        <div className="lg:col-span-8 text-left">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden text-left text-left">
            <div className="p-8 md:p-12 space-y-10 text-left text-left">
              
              <div className="space-y-4 text-left text-left">
                <div className="text-left text-left">
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 mb-1 text-left">
                    <History className="h-5 w-5 text-blue-600 text-left" /> Descripción Profesional
                  </h3>
                  <p className="text-sm text-slate-400 font-medium text-left">Redacta una breve reseña sobre tu rol o la empresa.</p>
                </div>
                <textarea 
                  {...register('biografia')}
                  rows={5}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all font-medium text-slate-700 text-sm resize-none text-left"
                  placeholder="Sin biografía registrada..."
                />
              </div>

              <div className="space-y-6 text-left text-left">
                <div className="text-left text-left">
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 mb-1 text-left">
                    <Phone className="h-5 w-5 text-blue-600 text-left" /> Datos de Localización
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left text-left">
                  <div className="space-y-2 text-left text-left">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 text-left">Teléfono de Contacto</label>
                    <div className="relative group text-left">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-blue-600 transition-colors text-left" />
                      <input 
                        {...register('celular')}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all font-bold text-slate-700 text-sm text-left"
                        placeholder="Ej. 71234567"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 text-left text-left">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 text-left text-left">Dirección Física</label>
                    <div className="relative group text-left">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-blue-600 transition-colors text-left" />
                      <input 
                        {...register('direccion')}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all font-bold text-slate-700 text-sm text-left"
                        placeholder="Ubicación física..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex justify-end text-left text-left">
              <button
                type="submit"
                disabled={!isDirty || isUpdating}
                className="flex items-center gap-3 px-12 py-4 bg-[#0f172a] text-white font-black rounded-2xl hover:bg-blue-600 shadow-xl shadow-slate-200 transition-all disabled:opacity-50 text-left text-left"
              >
                {isUpdating ? <Loader2 className="h-5 w-5 animate-spin text-left" /> : <Save className="h-5 w-5 text-left" />}
                Guardar Cambios Profesionales
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
