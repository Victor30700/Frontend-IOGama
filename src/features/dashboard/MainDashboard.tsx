import React from 'react';
import { 
  Building2, 
  Users, 
  Layers, 
  TrendingUp, 
  Plus, 
  ArrowRight, 
  Briefcase,
  Wallet,
  Clock,
  CheckCircle2,
  Package
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProjectsQuery } from '../../hooks/queries/construction/useProjects';
import { useEmployees } from '../../hooks/queries/useEmployees';
import { ProjectStatus } from '../../types/construction/project';

const MainDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { data: projects } = useProjectsQuery();
  const { data: employees } = useEmployees();

  // Cálculos Gerenciales
  const totalInvestment = projects?.reduce((acc, curr) => acc + (curr.status !== ProjectStatus.Cancelled ? 50000 : 0), 0) || 0; // Ejemplo, luego usaremos montos reales
  const activeProjects = projects?.filter(p => p.status === ProjectStatus.Active).length || 0;
  const pendingProjects = projects?.filter(p => p.status === ProjectStatus.Draft).length || 0;

  const stats = [
    { label: 'Obras en Ejecución', value: activeProjects, icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Personal Activo', value: employees?.length || 0, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Presupuestos en Borrador', value: pendingProjects, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Insumos en Catálogo', value: '1,240', icon: Package, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 text-left">
      {/* Bienvenida */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-left">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight text-left">Panel de Control</h1>
          <p className="text-gray-500 font-medium text-left">Bienvenido al ecosistema de gestión de IO GAMA Construcciones.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/construction/projects')}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 transition-all shadow-sm"
          >
            Ver Portafolio
          </button>
          <button 
            onClick={() => navigate('/construction/projects')}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
          >
            <Plus className="h-5 w-5" /> Nueva Obra
          </button>
        </div>
      </div>

      {/* Grid de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-all group text-left">
            <div className={`h-12 w-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
            <p className="text-3xl font-black text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        {/* Proyectos Recientes */}
        <div className="lg:col-span-8 space-y-4 text-left">
          <div className="flex items-center justify-between px-2 text-left">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-600" /> Proyectos Recientes
            </h3>
            <button onClick={() => navigate('/construction/projects')} className="text-xs font-bold text-blue-600 hover:underline">Ver todos</button>
          </div>
          
          <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden text-left">
            <div className="divide-y divide-gray-50">
              {projects?.slice(0, 5).map((project) => (
                <div key={project.id} className="p-5 hover:bg-gray-50/50 transition-colors flex items-center justify-between group cursor-pointer text-left" onClick={() => navigate(`/construction/projects/${project.id}`)}>
                  <div className="flex items-center gap-4 text-left">
                    <div className="h-12 w-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-black text-xs">
                      {project.code}
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-gray-900 leading-tight">{project.name}</h4>
                      <p className="text-xs text-gray-500 font-medium">Cliente: {project.client}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="hidden md:block text-right">
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Estado</p>
                      <span className="text-xs font-bold text-blue-600">En Ejecución</span>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
              {(!projects || projects.length === 0) && (
                <div className="p-12 text-center text-gray-400 italic">No hay proyectos registrados aún.</div>
              )}
            </div>
          </div>
        </div>

        {/* Accesos Rápidos y Ayuda */}
        <div className="lg:col-span-4 space-y-6 text-left">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-[32px] text-white shadow-xl shadow-blue-100 relative overflow-hidden text-left">
            <div className="relative z-10 text-left">
              <h3 className="text-xl font-black mb-2 text-left">Guía de Ingeniería</h3>
              <p className="text-blue-100 text-sm leading-relaxed mb-6 text-left font-medium">
                Recuerda configurar los parámetros de ley antes de iniciar el presupuesto de una nueva obra.
              </p>
              <button 
                onClick={() => navigate('/construction/units')}
                className="w-full py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-xs font-bold uppercase tracking-widest transition-all border border-white/20"
              >
                Configurar Catálogos
              </button>
            </div>
            <TrendingUp className="absolute -bottom-4 -right-4 h-32 w-32 text-white/10" />
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm text-left">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" /> Próximos Pasos
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-green-100 flex-shrink-0 mt-0.5 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-green-600" />
                </div>
                <p className="text-xs text-gray-600 font-medium">Cargar el catálogo de recursos para materiales y mano de obra.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-gray-100 flex-shrink-0 mt-0.5 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-gray-400" />
                </div>
                <p className="text-xs text-gray-400 font-medium">Definir las plantillas maestras de APU para actividades comunes.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
