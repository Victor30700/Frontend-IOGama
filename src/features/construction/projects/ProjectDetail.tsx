import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Settings, 
  Layout, 
  Calculator, 
  Save, 
  Loader2, 
  Percent,
  TrendingUp,
  AlertCircle,
  ShieldCheck,
  Info,
  Plus,
  Trash2,
  FolderOpen,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  PackagePlus,
  FileText,
  Edit3
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { 
  useProjectsQuery, 
  useProjectParametersQuery, 
  useUpdateProjectParametersMutation 
} from '../../../hooks/queries/construction/useProjects';
import { 
  useModulesQuery, 
  useCreateModuleMutation, 
  useDeleteModuleMutation 
} from '../../../hooks/queries/construction/useModules';
import { 
  useModuleItemsQuery, 
  useUpdateItemMutation, 
  useDeleteItemMutation 
} from '../../../hooks/queries/construction/useItems';
import type { UpdateProjectParametersRequest } from '../../../types/construction/projectParameters';
import type { BudgetItemDto } from '../../../types/construction/item';
import Swal from 'sweetalert2';
import ImportTemplatesModal from '../catalogs/ImportTemplatesModal';
import BudgetItemAnalysis from './BudgetItemAnalysis';

// --- Sub-componente para los ítems de un módulo ---
const ModuleItemsTable: React.FC<{ 
  moduleId: string; 
  projectId: string;
  onViewAnalysis: (itemId: string, itemName: string) => void;
}> = ({ moduleId, projectId, onViewAnalysis }) => {
  const { data: items, isLoading } = useModuleItemsQuery(moduleId);
  const { mutate: updateItem } = useUpdateItemMutation(moduleId, projectId);
  const { mutate: deleteItem } = useDeleteItemMutation(moduleId, projectId);

  const handleUpdateQuantity = (item: BudgetItemDto, newQty: number) => {
    if (newQty === item.quantity) return;
    updateItem({ id: item.id, data: { quantity: newQty } });
  };

  const handleDelete = (id: string, name: string) => {
    Swal.fire({
      title: '¿Eliminar ítem?',
      text: `Se quitará "${name}" del presupuesto.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Sí, eliminar',
      customClass: { popup: 'rounded-2xl' }
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItem(id);
      }
    });
  };

  if (isLoading) return <div className="p-4 flex justify-center"><Loader2 className="h-5 w-5 animate-spin text-blue-400" /></div>;

  return (
    <div className="overflow-x-auto bg-gray-50/30 rounded-b-2xl border-t border-gray-100">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Código</th>
            <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Descripción del Ítem</th>
            <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase text-center w-28">Cant.</th>
            <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase">P. Unit (Bs.)</th>
            <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase">Total (Bs.)</th>
            <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white/50 text-left">
          {items?.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-8 text-center text-xs text-gray-400 italic">No hay actividades en este capítulo. Importa plantillas desde el catálogo maestro.</td>
            </tr>
          ) : (
            items?.map((item) => (
              <tr key={item.id} className="hover:bg-white transition-colors group text-left">
                <td className="px-6 py-3 text-xs font-bold text-blue-600">{item.code}</td>
                <td className="px-6 py-3">
                  <p className="text-xs font-bold text-gray-800">{item.name}</p>
                  <p className="text-[10px] text-gray-400 italic font-medium">Unidad: {item.unit}</p>
                </td>
                <td className="px-6 py-3 text-left">
                  <input 
                    type="number"
                    defaultValue={item.quantity}
                    onBlur={(e) => handleUpdateQuantity(item, parseFloat(e.target.value) || 0)}
                    className="w-20 mx-auto block px-2 py-1 rounded-lg border border-gray-200 text-xs font-bold text-center focus:ring-2 focus:ring-blue-100 outline-none"
                  />
                </td>
                <td className="px-6 py-3 text-xs text-gray-600 font-medium">{item.unitPrice.toLocaleString()}</td>
                <td className="px-6 py-3 text-xs font-black text-gray-900">{item.total.toLocaleString()}</td>
                <td className="px-6 py-3 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => onViewAnalysis(item.id, item.name)}
                      className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" 
                      title="Análisis de Precios Unitarios"
                    >
                      <Calculator className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => handleDelete(item.id, item.name)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Eliminar">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

// --- Componente Principal ---
const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'budget' | 'settings'>('budget');
  const [importModule, setImportModule] = useState<{id: string, name: string} | null>(null);
  const [analysisItem, setAnalysisItem] = useState<{id: string, name: string} | null>(null);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  const { data: projects, isLoading: isProjectsLoading } = useProjectsQuery();
  const currentProject = projects?.find(p => p.id === id);

  const { data: parameters, isLoading: isParamsLoading } = useProjectParametersQuery(id!);
  const { mutate: updateParams, isPending: isUpdating } = useUpdateProjectParametersMutation(id!);

  const { data: modules, isLoading: isModulesLoading } = useModulesQuery(id!);
  const { mutate: createModule } = useCreateModuleMutation(id!);
  const { mutate: deleteModule } = useDeleteModuleMutation(id!);

  const { register, handleSubmit, reset, formState: { isDirty } } = useForm<UpdateProjectParametersRequest>();

  useEffect(() => {
    if (parameters) {
      reset(parameters);
    }
  }, [parameters, reset]);

  const onSubmitParams = (data: UpdateProjectParametersRequest) => {
    updateParams(data);
  };

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  const handleAddModule = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Añadir Nuevo Módulo',
      html: `
        <div class="space-y-4 pt-4 text-left">
          <div>
            <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Nombre del Capítulo</label>
            <input id="swal-name" class="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-100" placeholder="Ej. Obras Preliminares">
          </div>
          <div class="mt-4 text-left">
            <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Descripción corta</label>
            <input id="swal-desc" class="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-100" placeholder="Opcional...">
          </div>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Crear Módulo',
      confirmButtonColor: '#2563eb',
      customClass: { popup: 'rounded-2xl' },
      preConfirm: () => {
        const name = (document.getElementById('swal-name') as HTMLInputElement).value;
        const description = (document.getElementById('swal-desc') as HTMLInputElement).value;
        if (!name) {
          Swal.showValidationMessage('El nombre es obligatorio');
          return false;
        }
        return { name, description };
      }
    });

    if (formValues) {
      createModule({
        projectId: id!,
        name: formValues.name,
        description: formValues.description,
        order: modules?.length || 0
      });
    }
  };

  const handleDeleteModule = (moduleId: string, name: string) => {
    Swal.fire({
      title: '¿Eliminar módulo?',
      text: `Se borrará "${name}" y todos los ítems dentro de él.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Sí, eliminar',
      customClass: { popup: 'rounded-2xl' }
    }).then((result) => {
      if (result.isConfirmed) {
        deleteModule(moduleId);
      }
    });
  };

  if (isProjectsLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 text-left">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
        <p className="text-gray-500 font-medium">Cargando proyecto...</p>
      </div>
    );
  }

  if (!currentProject) {
    return (
      <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center text-left">
        <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900">Proyecto no encontrado</h2>
        <button onClick={() => navigate('/construction/projects')} className="mt-4 text-blue-600 font-bold hover:underline">Volver</button>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-4 text-left">
            <button onClick={() => navigate('/construction/projects')} className="p-2.5 rounded-xl hover:bg-gray-50 border border-gray-100 transition-all">
              <ArrowLeft className="h-5 w-5 text-gray-500" />
            </button>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded">{currentProject.code}</span>
                <h2 className="text-xl font-bold text-gray-900">{currentProject.name}</h2>
              </div>
              <p className="text-sm text-gray-500">Cliente: {currentProject.client} • Ubicación: {currentProject.location}</p>
            </div>
          </div>
          
          <div className="flex bg-gray-100 p-1 rounded-xl w-fit self-end md:self-center text-left">
            <button 
              onClick={() => setActiveTab('budget')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'budget' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Layout className="h-4 w-4" /> Presupuesto
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'settings' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Settings className="h-4 w-4" /> Parámetros
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300 text-left">
          <div className="lg:col-span-8 text-left">
            <form onSubmit={handleSubmit(onSubmitParams)} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-left">
              <div className="px-8 py-6 border-b border-gray-50 text-left">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-blue-600" /> Parámetros impositivos y de Ley
                </h3>
                <p className="text-sm text-gray-500 mt-1">Configura las cargas sociales e impuestos específicos para {currentProject.name}.</p>
              </div>

              {isParamsLoading ? (
                <div className="p-20 flex flex-col items-center justify-center space-y-3 text-left">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-200" />
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest text-left">Recuperando parámetros...</p>
                </div>
              ) : (
                <div className="p-8 space-y-8 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    <div className="space-y-2 text-left">
                      <label className="text-sm font-bold text-gray-700">Beneficios Sociales (%)</label>
                      <div className="relative text-left">
                        <Percent className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input 
                          {...register('socialBenefitsPercentage', { valueAsNumber: true })}
                          type="number" step="0.01"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none font-bold text-gray-700"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 text-left">
                      <label className="text-sm font-bold text-gray-700">IVA sobre Mano de Obra (%)</label>
                      <div className="relative text-left">
                        <Percent className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input 
                          {...register('laborIVAPercentage', { valueAsNumber: true })}
                          type="number" step="0.01"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none font-bold text-gray-700"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 text-left">
                      <label className="text-sm font-bold text-gray-700">Herramientas Menores (%)</label>
                      <div className="relative text-left">
                        <Percent className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input 
                          {...register('minorToolsPercentage', { valueAsNumber: true })}
                          type="number" step="0.01"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none font-bold text-gray-700"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 text-left">
                      <label className="text-sm font-bold text-gray-700">Gastos Generales (%)</label>
                      <div className="relative text-left">
                        <Percent className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input 
                          {...register('generalExpensesPercentage', { valueAsNumber: true })}
                          type="number" step="0.01"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none font-bold text-gray-700"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 text-left">
                      <label className="text-sm font-bold text-gray-700">Utilidad (%)</label>
                      <div className="relative text-left">
                        <TrendingUp className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                        <input 
                          {...register('utilityPercentage', { valueAsNumber: true })}
                          type="number" step="0.01"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none font-bold text-gray-700"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 text-left">
                      <label className="text-sm font-bold text-gray-700">IT (Impuesto Transacciones %)</label>
                      <div className="relative text-left">
                        <Percent className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input 
                          {...register('itPercentage', { valueAsNumber: true })}
                          type="number" step="0.01"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none font-bold text-gray-700"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50/50 cursor-pointer text-left">
                      <input {...register('isLaborIVAActive')} type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                      <span className="text-sm font-medium text-gray-700">Activar IVA sobre Mano de Obra</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50/50 cursor-pointer text-left">
                      <input {...register('isITActive')} type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                      <span className="text-sm font-medium text-gray-700">Activar Impuesto a las Transacciones (IT)</span>
                    </label>
                  </div>
                </div>
              )}

              <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-50 flex justify-end text-left">
                <button 
                  type="submit"
                  disabled={!isDirty || isUpdating}
                  className="flex items-center gap-2 px-8 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 disabled:opacity-50 transition-all"
                >
                  {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-4 space-y-6 text-left">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-left">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Resumen Impositivo</h4>
              <div className="space-y-4 text-left">
                <div className="flex items-center justify-between text-left">
                  <span className="text-sm text-gray-600 text-left">Herramientas Menores</span>
                  <span className="text-sm font-bold text-gray-900">{parameters?.minorToolsPercentage}%</span>
                </div>
                <div className="flex items-center justify-between text-left">
                  <span className="text-sm text-gray-600 text-left">Gastos Generales</span>
                  <span className="text-sm font-bold text-gray-900">{parameters?.generalExpensesPercentage}%</span>
                </div>
                <div className="flex items-center justify-between text-left">
                  <span className="text-sm text-gray-600 text-left">Utilidad Bruta</span>
                  <span className="text-sm font-bold text-green-600 text-left">{parameters?.utilityPercentage}%</span>
                </div>
                <hr className="border-gray-50" />
                <div className="flex items-center gap-2 text-xs text-green-600 font-bold bg-green-50 p-3 rounded-xl border border-green-100 text-left">
                  <ShieldCheck className="h-4 w-4 text-left" /> Parámetros del Sistema
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'budget' && (
        <div className="space-y-6 animate-in fade-in duration-300 text-left">
          <div className="flex items-center justify-between text-left">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 text-left">
              <FolderOpen className="h-5 w-5 text-blue-600" /> Estructura de Capítulos
            </h3>
            <button 
              onClick={handleAddModule}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
            >
              <Plus className="h-4 w-4" /> Añadir Capítulo
            </button>
          </div>

          {isModulesLoading ? (
            <div className="py-20 flex justify-center text-left"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>
          ) : modules?.length === 0 ? (
            <div className="bg-white p-20 rounded-3xl border border-dashed border-gray-200 text-center text-gray-400 text-left">
              <Layout className="h-12 w-12 mx-auto mb-4 opacity-10 text-center" />
              <p className="text-sm max-w-xs mx-auto italic text-center text-left">El presupuesto está vacío. Crea tu primer capítulo para comenzar a añadir actividades.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 text-left">
              {modules?.map((mod) => (
                <div key={mod.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group text-left">
                  <div 
                    onClick={() => toggleModule(mod.id)}
                    className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-4 flex-1 text-left">
                      <div className="h-10 w-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold">
                        {mod.order + 1}
                      </div>
                      <div className="text-left text-left">
                        <h4 className="font-bold text-gray-900 leading-none mb-1">{mod.name}</h4>
                        <p className="text-xs text-gray-500 truncate max-w-md">{mod.description || 'Sin descripción'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 text-left">
                      <div className="text-right mr-4 text-left">
                        <p className="text-[10px] font-bold text-gray-400 uppercase leading-none">Subtotal Módulo</p>
                        <p className="text-sm font-black text-gray-900 mt-1">Bs. {mod.totalAmount.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity text-left">
                        <button 
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-1 text-xs font-bold"
                          title="Importar Actividades"
                          onClick={(e) => { e.stopPropagation(); setImportModule({id: mod.id, name: mod.name}); }}
                        >
                          <PackagePlus className="h-4 w-4" />
                          Importar
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleDeleteModule(mod.id, mod.name); }}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <div className="ml-2 p-1 bg-gray-100 rounded text-gray-400 text-left">
                          {expandedModules[mod.id] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contenido Expandido: Tabla de Ítems */}
                  {expandedModules[mod.id] && (
                    <ModuleItemsTable 
                      moduleId={mod.id} 
                      projectId={id!} 
                      onViewAnalysis={(itemId, itemName) => setAnalysisItem({id: itemId, name: itemName})}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal de Importación Masiva */}
      {importModule && (
        <ImportTemplatesModal 
          projectId={id!}
          moduleId={importModule.id}
          moduleName={importModule.name}
          onClose={() => setImportModule(null)}
        />
      )}

      {/* Modal de Análisis APU */}
      {analysisItem && (
        <BudgetItemAnalysis 
          itemId={analysisItem.id}
          itemName={analysisItem.name}
          moduleId={modules?.find(m => expandedModules[m.id])?.id || ''}
          projectId={id!}
          onClose={() => setAnalysisItem(null)}
        />
      )}
    </div>
  );
};

export default ProjectDetail;
