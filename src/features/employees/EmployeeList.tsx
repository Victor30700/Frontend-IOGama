import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Search, 
  UserPlus, 
  Shield, 
  UserX, 
  UserCheck,
  Mail, 
  Briefcase,
  Loader2,
  Filter,
  CheckCircle2,
  XCircle,
  KeyRound
} from 'lucide-react';
import Swal from 'sweetalert2';
import { useEmployees, useUpdateEmployeeStatus, useResetEmployeePassword } from '../../hooks/queries/useEmployees';

const EmployeeList: React.FC = () => {
  const navigate = useNavigate();
  const { data: employees, isLoading } = useEmployees();
  const { mutate: updateStatus } = useUpdateEmployeeStatus();
  const { mutate: resetPassword } = useResetEmployeePassword();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Todos' | 'Activo' | 'Suspendido'>('Todos');

  const handleToggleStatus = (id: string, currentStatus: string) => {
    const isSuspending = currentStatus === 'Activo';
    // Usar mapeo de enteros: 1 = Activo, 2 = Suspendido (ajustar según backend si es diferente)
    const newStatus = isSuspending ? 2 : 1;

    Swal.fire({
      title: `¿${isSuspending ? 'Suspender' : 'Activar'} empleado?`,
      text: isSuspending 
        ? 'El empleado no podrá acceder al sistema hasta que sea reactivado.' 
        : 'El empleado recuperará el acceso al sistema inmediatamente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: isSuspending ? '#ef4444' : '#10b981',
      cancelButtonColor: '#6b7280',
      confirmButtonText: `Sí, ${isSuspending ? 'suspender' : 'activar'}`,
      cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'rounded-2xl',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatus({ id, status: newStatus });
      }
    });
  };

  const handleResetPassword = async (id: string, nombre: string) => {
    const { value: newPassword } = await Swal.fire({
      title: 'Resetear Contraseña',
      text: `Ingresa la nueva contraseña temporal para ${nombre}`,
      input: 'password',
      inputLabel: 'Contraseña nueva',
      inputPlaceholder: 'Mínimo 8 caracteres',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      inputAttributes: {
        autocapitalize: 'off',
        autocorrect: 'off'
      },
      inputValidator: (value) => {
        if (!value || value.length < 8) {
          return 'La contraseña debe tener al menos 8 caracteres';
        }
        return null;
      },
      customClass: {
        popup: 'rounded-2xl',
      }
    });

    if (newPassword) {
      resetPassword({ id, newPassword });
    }
  };

  const filteredEmployees = employees?.filter(emp => {
    const matchesSearch = emp.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Todos' || emp.estado === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
        <p className="text-gray-500 font-medium">Cargando nómina de empleados...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="bg-blue-50 p-3 rounded-xl">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Gestión de Empleados</h2>
            <p className="text-sm text-gray-500">Administra el personal y sus permisos de acceso.</p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/employees/new')}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >
          <UserPlus className="h-4 w-4" />
          Nuevo Empleado
        </button>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Buscar por nombre o correo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm bg-white"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm bg-white appearance-none cursor-pointer"
          >
            <option value="Todos">Todos los estados</option>
            <option value="Activo">Solo Activos</option>
            <option value="Suspendido">Solo Suspendidos</option>
          </select>
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Empleado</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Cargo / Área</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Acceso</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredEmployees?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No se encontraron empleados que coincidan con la búsqueda.
                  </td>
                </tr>
              ) : (
                filteredEmployees?.map((emp) => (
                  <tr key={emp.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700 font-bold text-sm">
                          {emp.nombreCompleto[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900 leading-none mb-1">{emp.nombreCompleto}</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Mail className="h-3 w-3" /> {emp.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Briefcase className="h-4 w-4 text-gray-400" />
                        {emp.cargo}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                        emp.estado === 'Activo' 
                        ? 'bg-green-50 text-green-700 border-green-100' 
                        : 'bg-red-50 text-red-700 border-red-100'
                      }`}>
                        {emp.estado === 'Activo' ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                        {emp.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {emp.esSuperAdmin ? (
                          <span className="bg-purple-50 text-purple-700 border border-purple-100 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                            Super Admin
                          </span>
                        ) : (
                          <span className="bg-gray-50 text-gray-600 border border-gray-100 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                            Limitado
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => navigate(`/employees/${emp.id}/permissions`)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" 
                          title="Gestionar Permisos"
                        >
                          <Shield className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleResetPassword(emp.id, emp.nombreCompleto)}
                          className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all" 
                          title="Resetear Contraseña"
                        >
                          <KeyRound className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleToggleStatus(emp.id, emp.estado)}
                          className={`p-2 rounded-lg transition-all ${
                            emp.estado === 'Activo' 
                            ? 'text-gray-400 hover:text-red-600 hover:bg-red-50' 
                            : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                          }`}
                          title={emp.estado === 'Activo' ? 'Suspender' : 'Activar'}
                        >
                          {emp.estado === 'Activo' ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
