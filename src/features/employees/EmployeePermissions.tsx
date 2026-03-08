import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Shield, 
  ArrowLeft, 
  Save, 
  Loader2, 
  Construction, 
  CheckSquare, 
  AlertCircle,
  Building2,
  Lock
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { employeeService } from '../../services/employee.service';
import { useUpdatePermissions } from '../../hooks/queries/useEmployees';
import type { UserPermissions } from '../../types/employee';

// Definición de permisos disponibles para el módulo de Construcción
const CONSTRUCTION_FUNCTIONS = [
  { id: 'PROJECT_CREATE', label: 'Crear Proyectos' },
  { id: 'PROJECT_EDIT', label: 'Editar Proyectos' },
  { id: 'BUDGET_EDIT', label: 'Gestionar Presupuestos' },
  { id: 'COSTS_VIEW', label: 'Ver Costos Reales' },
  { id: 'RESOURCE_APPROVE', label: 'Aprobar Insumos' },
  { id: 'REPORTS_GENERATE', label: 'Generar Reportes' },
];

const EmployeePermissions: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Estado local para manejar los cambios antes de guardar
  const [localPermissions, setLocalPermissions] = useState<UserPermissions>({
    Construction: { access: false, permissions: [] }
  });

  const { data: remotePermissions, isLoading } = useQuery({
    queryKey: ['employees', 'permissions', id],
    queryFn: () => employeeService.getUserPermissions(id!),
    enabled: !!id
  });

  const { mutate: updatePermissions, isPending } = useUpdatePermissions(id!);

  // Sincronizar estado local con datos del servidor al cargar
  useEffect(() => {
    if (remotePermissions) {
      setLocalPermissions(remotePermissions);
    }
  }, [remotePermissions]);

  const handleToggleModule = (module: string) => {
    setLocalPermissions(prev => ({
      ...prev,
      [module]: {
        ...prev[module],
        access: !prev[module]?.access,
        // Si se desactiva el acceso, limpiamos los permisos internos opcionalmente
        permissions: !prev[module]?.access ? prev[module]?.permissions || [] : []
      }
    }));
  };

  const handleToggleFunction = (module: string, permissionId: string) => {
    setLocalPermissions(prev => {
      const currentPermissions = prev[module]?.permissions || [];
      const newPermissions = currentPermissions.includes(permissionId)
        ? currentPermissions.filter(p => p !== permissionId)
        : [...currentPermissions, permissionId];

      return {
        ...prev,
        [module]: {
          ...prev[module],
          permissions: newPermissions
        }
      };
    });
  };

  const handleSave = () => {
    updatePermissions(localPermissions);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
        <p className="text-gray-500">Cargando matriz de seguridad...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/employees')}
            className="p-2.5 rounded-xl text-gray-500 hover:bg-gray-50 border border-gray-100 transition-all"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" /> Matriz de Seguridad
            </h2>
            <p className="text-sm text-gray-500">Configura el acceso granular para este usuario.</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={isPending}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 disabled:opacity-50"
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Guardar Permisos
        </button>
      </div>

      {/* Permissions Grid */}
      <div className="grid grid-cols-1 gap-6">
        {/* Module: Construction */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className={`p-6 flex items-center justify-between ${localPermissions['Construction']?.access ? 'bg-blue-50/50' : 'bg-gray-50/50'}`}>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${localPermissions['Construction']?.access ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                <Construction className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Módulo de Construcción</h3>
                <p className="text-xs text-gray-500">Gestión de proyectos, presupuestos e insumos.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={localPermissions['Construction']?.access || false}
                onChange={() => handleToggleModule('Construction')}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="p-8 space-y-6">
            {!localPermissions['Construction']?.access ? (
              <div className="flex flex-col items-center justify-center py-8 text-gray-400 space-y-2">
                <Lock className="h-8 w-8 opacity-20" />
                <p className="text-sm italic">Acceso deshabilitado para este módulo</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                    <CheckSquare className="h-4 w-4 text-blue-600" /> Funcionalidades Específicas
                  </h4>
                  <div className="space-y-3">
                    {CONSTRUCTION_FUNCTIONS.map((func) => (
                      <label 
                        key={func.id} 
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                          localPermissions['Construction']?.permissions.includes(func.id)
                          ? 'border-blue-200 bg-blue-50/30 ring-1 ring-blue-100'
                          : 'border-gray-100 hover:bg-gray-50'
                        }`}
                      >
                        <input 
                          type="checkbox" 
                          checked={localPermissions['Construction']?.permissions.includes(func.id) || false}
                          onChange={() => handleToggleFunction('Construction', func.id)}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" 
                        />
                        <span className={`text-sm ${localPermissions['Construction']?.permissions.includes(func.id) ? 'font-bold text-blue-900' : 'text-gray-600'}`}>
                          {func.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-amber-50/50 border border-amber-100 p-6 rounded-2xl">
                    <div className="flex items-center gap-2 text-amber-700 mb-2 font-bold text-sm">
                      <AlertCircle className="h-4 w-4" /> Importante
                    </div>
                    <p className="text-xs text-amber-600 leading-relaxed">
                      Si el empleado tiene el rol de <strong>Super Admin</strong>, tendrá acceso total a todas las funcionalidades independientemente de lo marcado aquí.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl border border-gray-100 bg-gray-50/30">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Resumen de Cambios</h4>
                    <p className="text-sm text-gray-600">
                      Módulo: <span className="font-bold text-blue-600">Activo</span>
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Funcionalidades: <span className="font-bold text-gray-900">{localPermissions['Construction']?.permissions.length || 0} asignadas</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Future modules can be added here */}
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 p-8 rounded-2xl flex flex-col items-center justify-center text-gray-400 space-y-2 opacity-60">
          <Building2 className="h-8 w-8 opacity-20" />
          <p className="text-sm font-medium">Módulos de Inventario y Contabilidad próximamente</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeePermissions;
