import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Lock, 
  IdCard, 
  Calendar, 
  MapPin, 
  Phone, 
  Briefcase, 
  ShieldCheck,
  Save,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { useCreateEmployee } from '../../hooks/queries/useEmployees';
import type { CreateEmployeeRequest } from '../../types/employee';

const employeeSchema = z.object({
  email: z.string().email('Email inválido'),
  passwordTemporal: z.string().min(8, 'Mínimo 8 caracteres'),
  nombres: z.string().min(2, 'Requerido'),
  apellidoPaterno: z.string().min(2, 'Requerido'),
  apellidoMaterno: z.string().optional(),
  ci: z.string().min(5, 'CI inválido'),
  fechaNacimiento: z.string().min(1, 'Requerido'),
  direccionEscrita: z.string().min(5, 'Requerido'),
  celular: z.string().min(8, 'Mínimo 8 dígitos'),
  areaTrabajo: z.string().min(2, 'Requerido'),
  esSuperAdmin: z.boolean().default(false),
});

const CreateEmployee: React.FC = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { mutate: createEmployee, isPending } = useCreateEmployee();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateEmployeeRequest>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      esSuperAdmin: false,
      permisos: {
        Construction: { access: true, permissions: ["*"] }
      }
    }
  });

  const onSubmit = (data: CreateEmployeeRequest) => {
    // Asegurar formato de fecha para el backend
    const formattedData = {
      ...data,
      fechaNacimiento: new Date(data.fechaNacimiento).toISOString(),
      permisos: {
        Construction: {
          access: true,
          permissions: data.esSuperAdmin ? ["*"] : ["Read", "Write"]
        }
      }
    };
    
    createEmployee(formattedData, {
      onSuccess: () => navigate('/employees'),
      onError: (err: any) => {
        console.error('Error al crear empleado:', err.response?.data);
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/employees')}
          className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Registrar Nuevo Empleado</h2>
          <p className="text-sm text-gray-500">Completa la información para crear el acceso al sistema.</p>
        </div>
      </div>

      {/* Stepper Visual */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${step === 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-gray-400'}`}>
          <div className={`h-6 w-6 rounded-full flex items-center justify-center border-2 ${step === 1 ? 'border-white' : 'border-gray-200 text-xs'}`}>1</div>
          Datos Personales
        </div>
        <div className="h-px w-8 bg-gray-100"></div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${step === 2 ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-gray-400'}`}>
          <div className={`h-6 w-6 rounded-full flex items-center justify-center border-2 ${step === 2 ? 'border-white' : 'border-gray-200 text-xs'}`}>2</div>
          Acceso y Roles
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Información Básica */}
            <div className="md:col-span-2 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-50 pb-4">
                <User className="h-5 w-5 text-blue-600" /> Información de Identidad
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Nombres</label>
                  <input {...register('nombres')} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm" placeholder="Ej. Juan Carlos" />
                  {errors.nombres && <p className="text-xs text-red-500">{errors.nombres.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Apellido Paterno</label>
                  <input {...register('apellidoPaterno')} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm" placeholder="Ej. Pérez" />
                  {errors.apellidoPaterno && <p className="text-xs text-red-500">{errors.apellidoPaterno.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Apellido Materno</label>
                  <input {...register('apellidoMaterno')} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm" placeholder="Ej. Mamani" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2"><IdCard className="h-4 w-4" /> CI / Documento</label>
                  <input {...register('ci')} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm" placeholder="12345678" />
                  {errors.ci && <p className="text-xs text-red-500">{errors.ci.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2"><Calendar className="h-4 w-4" /> F. Nacimiento</label>
                  <input {...register('fechaNacimiento')} type="date" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm" />
                  {errors.fechaNacimiento && <p className="text-xs text-red-500">{errors.fechaNacimiento.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2"><Phone className="h-4 w-4" /> Celular</label>
                  <input {...register('celular')} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm" placeholder="71234567" />
                  {errors.celular && <p className="text-xs text-red-500">{errors.celular.message}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2"><MapPin className="h-4 w-4" /> Dirección</label>
                <input {...register('direccionEscrita')} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm" placeholder="Av. Principal #123..." />
                {errors.direccionEscrita && <p className="text-xs text-red-500">{errors.direccionEscrita.message}</p>}
              </div>
            </div>

            <div className="md:col-span-2 flex justify-end">
              <button 
                type="button" 
                onClick={() => setStep(2)}
                className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center gap-2"
              >
                Continuar a Seguridad
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Credenciales */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-50 pb-4">
                <Lock className="h-5 w-5 text-blue-600" /> Credenciales de Acceso
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2"><Mail className="h-4 w-4" /> Correo Electrónico</label>
                  <input {...register('email')} type="email" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm" placeholder="empleado@gama.com" />
                  {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2"><Lock className="h-4 w-4" /> Contraseña Temporal</label>
                  <input {...register('passwordTemporal')} type="text" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm" placeholder="Temporal123!" />
                  <p className="text-[10px] text-gray-400 italic">El empleado deberá cambiarla en su primer inicio de sesión.</p>
                  {errors.passwordTemporal && <p className="text-xs text-red-500">{errors.passwordTemporal.message}</p>}
                </div>
              </div>
            </div>

            {/* Cargo y Roles */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-50 pb-4">
                <Briefcase className="h-5 w-5 text-blue-600" /> Cargo y Administración
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Área de Trabajo / Cargo</label>
                  <input {...register('areaTrabajo')} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm" placeholder="Ej. Residente de Obra" />
                  {errors.areaTrabajo && <p className="text-xs text-red-500">{errors.areaTrabajo.message}</p>}
                </div>

                <div className="p-4 rounded-xl border border-blue-50 bg-blue-50/30">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input 
                      {...register('esSuperAdmin')} 
                      type="checkbox" 
                      className="mt-1.5 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" 
                    />
                    <div>
                      <span className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                        <ShieldCheck className="h-4 w-4 text-blue-600" /> Acceso Super Admin
                      </span>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                        Permite gestionar otros empleados y configurar toda la empresa.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Resume / Info */}
            <div className="md:col-span-2 bg-green-50/50 p-6 rounded-2xl border border-green-100 flex items-start gap-4">
              <div className="bg-green-100 p-2 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-sm text-green-800">
                <p className="font-bold">Permisos por Defecto</p>
                <p className="opacity-80">Al registrarse, el empleado tendrá acceso automático al módulo de <strong>Construcción</strong>. Podrás ajustar permisos específicos más adelante.</p>
              </div>
            </div>

            <div className="md:col-span-2 flex justify-between gap-4">
              <button 
                type="button" 
                onClick={() => setStep(1)}
                className="px-8 py-3 bg-white border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-all"
              >
                Volver
              </button>
              <button 
                type="submit"
                disabled={isPending}
                className="flex-1 md:flex-none px-12 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
              >
                {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                {isPending ? 'Registrando...' : 'Finalizar Registro'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateEmployee;
