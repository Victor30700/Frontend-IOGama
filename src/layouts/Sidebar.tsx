import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  X, 
  LayoutDashboard, 
  Users, 
  User, 
  Building2, 
  ChevronRight,
  ShieldCheck,
  Layers,
  Ruler,
  Package
} from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import { useAuthStore } from '../store/authStore';
import { useProfile } from '../hooks/queries/useProfile';

const Sidebar: React.FC = () => {
  const { isSidebarOpen, closeSidebar } = useUIStore();
  const { user } = useAuthStore();
  const { data: profile } = useProfile();

  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { 
      label: 'Portafolio de Obras', 
      path: '/construction/projects', 
      icon: Building2,
      roles: ['Empresa', 'SuperAdminGlobal', 'SubCuentaEmpresa']
    },
    { 
      label: 'Gestión Empleados', 
      path: '/employees', 
      icon: Users,
      roles: ['Empresa', 'SuperAdminGlobal'] 
    },
    { 
      label: 'Unidades de Medida', 
      path: '/construction/units', 
      icon: Ruler,
      roles: ['Empresa', 'SuperAdminGlobal', 'SubCuentaEmpresa']
    },
    { 
      label: 'Catálogo de Recursos', 
      path: '/construction/resources', 
      icon: Package,
      roles: ['Empresa', 'SuperAdminGlobal', 'SubCuentaEmpresa']
    },
    { 
      label: 'Plantillas APU', 
      path: '/construction/templates', 
      icon: Layers,
      roles: ['Empresa', 'SuperAdminGlobal', 'SubCuentaEmpresa']
    },
    { label: 'Perfil de Usuario', path: '/profile', icon: User },
    { label: 'Seguridad', path: '/change-password', icon: ShieldCheck },
  ];

  // Filtrar items según el rol del usuario
  const filteredNavItems = navItems.filter(item => 
    !item.roles || (user && item.roles.includes(user.role))
  );

  return (
    <>
      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <span className="font-extrabold text-xl text-gray-900 tracking-tight">IO GAMA CONSTRUCCIONES</span>
            </div>
            <button 
              onClick={closeSidebar}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 lg:hidden transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
            {/* Main Menu */}
            <div>
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Menú Principal
              </p>
              <nav className="space-y-1">
                {filteredNavItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => window.innerWidth < 1024 && closeSidebar()}
                    className={({ isActive }) => `
                      flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all group
                      ${isActive 
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-100' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={`h-5 w-5 transition-colors group-hover:text-blue-500`} />
                      {item.label}
                    </div>
                    <ChevronRight className={`h-4 w-4 transition-transform group-hover:translate-x-0.5 opacity-0 lg:opacity-100`} />
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Modules Section */}
            <div>
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Módulos Activos
              </p>
              <div className="space-y-1">
                {profile?.modulosActivos && profile.modulosActivos.length > 0 ? (
                  profile.modulosActivos.map((modulo) => (
                    <div 
                      key={modulo}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-500"
                    >
                      <Layers className="h-5 w-5 text-gray-300" />
                      {modulo}
                      <span className="ml-auto text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">
                        Activo
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-xs text-gray-400 italic">
                    {profile ? 'Sin módulos activos' : 'Cargando módulos...'}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer Sidebar */}
          <div className="p-4 border-t border-gray-100 bg-gray-50/50">
            <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
              <p className="text-xs text-gray-400 mb-1">Versión del Sistema</p>
              <p className="text-sm font-bold text-gray-700">v2.0.4 - 2026</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
