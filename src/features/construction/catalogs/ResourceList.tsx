import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Loader2,
  MoreVertical,
  Filter,
  CheckCircle2,
  Globe,
  Tag,
  Hammer,
  Truck
} from 'lucide-react';
import Swal from 'sweetalert2';
import { useResourcesQuery, useDeleteResourceMutation } from '../../../hooks/queries/construction/useResources';
import ResourceForm from './ResourceForm';
import type { ResourceDto } from '../../../types/construction/resource';

const ResourceList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('Todos');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<ResourceDto | undefined>(undefined);

  const { data: resources, isLoading } = useResourcesQuery(1, 100); // Paginación simple por ahora
  const { mutate: deleteResource } = useDeleteResourceMutation();

  const filteredResources = resources?.filter(res => {
    const matchesSearch = res.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         res.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'Todos' || res.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleEdit = (resource: ResourceDto) => {
    setSelectedResource(resource);
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedResource(undefined);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    Swal.fire({
      title: '¿Eliminar recurso?',
      text: `Esta acción eliminará "${name}" del catálogo.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, eliminar',
      customClass: { popup: 'rounded-2xl' }
    }).then((result) => {
      if (result.isConfirmed) {
        deleteResource(id);
      }
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Materiales': return <Tag className="h-3.5 w-3.5" />;
      case 'Mano de Obra': return <Hammer className="h-3.5 w-3.5" />;
      case 'Equipo': return <Truck className="h-3.5 w-3.5" />;
      default: return <Package className="h-3.5 w-3.5" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
        <p className="text-gray-500 font-medium">Cargando catálogo de recursos...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-left">
        <div className="flex items-center gap-4 text-left">
          <div className="bg-blue-50 p-3 rounded-xl">
            <Package className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Catálogo de Recursos</h2>
            <p className="text-sm text-gray-500 text-left">Materiales, Mano de Obra y Equipos para presupuestos.</p>
          </div>
        </div>
        <button 
          onClick={handleCreate}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >
          <Plus className="h-4 w-4" />
          Nuevo Recurso
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Buscar por nombre o código..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm bg-white outline-none"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm bg-white appearance-none cursor-pointer outline-none"
          >
            <option value="Todos">Todos los tipos</option>
            <option value="Materiales">Materiales</option>
            <option value="Mano de Obra">Mano de Obra</option>
            <option value="Equipo">Equipos y Herramientas</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-left">
        <div className="overflow-x-auto text-left">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Recurso</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Precio Base</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Origen</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredResources?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No se encontraron insumos en el catálogo.
                  </td>
                </tr>
              ) : (
                filteredResources?.map((res) => (
                  <tr key={res.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">{res.name}</span>
                        <span className="text-[10px] font-medium text-gray-400 uppercase tracking-tighter">CÓD: {res.code || 'S/C'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs font-bold border border-gray-200 uppercase">
                        {getTypeIcon(res.type)}
                        {res.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-blue-600">Bs. {res.basePrice.toLocaleString()}</span>
                        <span className="text-[10px] text-gray-400 font-medium">por {res.unitAbbreviation}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {res.isGlobal ? (
                        <span className="flex items-center gap-1.5 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100 w-fit">
                          <Globe className="h-3 w-3" /> Global
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100 w-fit">
                          Propio
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!res.isGlobal && (
                          <>
                            <button 
                              onClick={() => handleEdit(res)}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                              title="Editar"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleDelete(res.id, res.name)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                              title="Eliminar"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </>
                        )}
                        <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">
                          <MoreVertical className="h-4 w-4" />
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

      {isFormOpen && (
        <ResourceForm 
          resource={selectedResource} 
          onClose={() => setIsFormOpen(false)} 
        />
      )}
    </div>
  );
};

export default ResourceList;
