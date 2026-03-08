import React, { useState } from 'react';
import { 
  Building2, 
  Plus, 
  Search, 
  MapPin, 
  User, 
  Calendar, 
  MoreVertical, 
  ArrowRight,
  Loader2,
  AlertCircle,
  TrendingUp,
  Layout
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProjectsQuery } from '../../../hooks/queries/construction/useProjects';
import ProjectForm from './ProjectForm';
import { ProjectStatus } from '../../../types/construction/project';
import type { ProjectDto } from '../../../types/construction/project';

const ProjectDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const { data: projects, isLoading } = useProjectsQuery();

  const filteredProjects = projects?.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusStyle = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.Draft: return 'bg-gray-100 text-gray-600 border-gray-200';
      case ProjectStatus.Active: return 'bg-green-100 text-green-700 border-green-200';
      case ProjectStatus.OnHold: return 'bg-amber-100 text-amber-700 border-amber-200';
      case ProjectStatus.Completed: return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-500 border-gray-100';
    }
  };

  const getStatusLabel = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.Draft: return 'Borrador';
      case ProjectStatus.Active: return 'En Ejecución';
      case ProjectStatus.OnHold: return 'En Pausa';
      case ProjectStatus.Completed: return 'Finalizado';
      default: return 'Desconocido';
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 text-left">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
        <p className="text-gray-500 font-medium">Cargando portafolio de obras...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-left">
        <div className="flex items-center gap-4 text-left">
          <div className="bg-blue-50 p-3 rounded-xl">
            <Building2 className="h-6 w-6 text-blue-600" />
          </div>
          <div className="text-left">
            <h2 className="text-xl font-bold text-gray-900">Portafolio de Obras</h2>
            <p className="text-sm text-gray-500">Administra los presupuestos y el avance de tus proyectos.</p>
          </div>
        </div>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >
          <Plus className="h-4 w-4" />
          Nueva Obra
        </button>
      </div>

      {/* Search and Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
        <div className="lg:col-span-8 relative text-left">
          <Search className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Buscar por nombre, cliente o código de proyecto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm bg-white outline-none"
          />
        </div>
        <div className="lg:col-span-4 flex items-center gap-4 text-left">
          <div className="flex-1 bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg text-green-600">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase leading-none">Total Obras</p>
              <p className="text-lg font-black text-gray-900 leading-none mt-1">{projects?.length || 0}</p>
            </div>
          </div>
          <div className="flex-1 bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <Layout className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase leading-none">En Curso</p>
              <p className="text-lg font-black text-gray-900 leading-none mt-1">
                {projects?.filter(p => p.status === ProjectStatus.Active).length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
        {filteredProjects?.length === 0 ? (
          <div className="col-span-full py-20 bg-white rounded-2xl border border-dashed border-gray-200 text-center text-gray-400">
            <div className="flex flex-col items-center gap-3">
              <Building2 className="h-12 w-12 opacity-10" />
              <p>No se encontraron proyectos activos.</p>
            </div>
          </div>
        ) : (
          filteredProjects?.map((project) => (
            <div key={project.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden flex flex-col text-left">
              {/* Card Header */}
              <div className="p-6 flex-1 text-left">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex flex-col min-w-0 pr-2">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">{project.code}</span>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight truncate" title={project.name}>{project.name}</h3>
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase shrink-0 ${getStatusStyle(project.status)}`}>
                    {getStatusLabel(project.status)}
                  </span>
                </div>

                <div className="space-y-3 mb-6 text-left">
                  <div className="flex items-center gap-2 text-gray-500 text-left">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-xs font-medium truncate">Cliente: {project.client}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-left">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-xs font-medium truncate">{project.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-left">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-xs font-medium">Registrado: {new Date(project.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Quick Info Bar */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl text-left">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-gray-400 uppercase">Tasa de Cambio</span>
                    <span className="text-xs font-bold text-gray-700">1 USD = {project.exchangeRate} Bs.</span>
                  </div>
                  <button className="p-1.5 text-gray-400 hover:text-gray-900 transition-colors">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between text-left">
                <button 
                  onClick={() => navigate(`/construction/projects/${project.id}`)}
                  className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition-all group/btn"
                >
                  Ver Presupuesto 
                  <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center -space-x-2 text-left">
                  <div className="h-7 w-7 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-blue-600">JS</div>
                  <div className="h-7 w-7 rounded-full bg-green-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-green-600">VS</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {isFormOpen && (
        <ProjectForm 
          onClose={() => setIsFormOpen(false)} 
        />
      )}
    </div>
  );
};

export default ProjectDashboard;
