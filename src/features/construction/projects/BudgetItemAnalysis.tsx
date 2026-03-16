import React, { useState } from 'react';
import { 
  Calculator, 
  Trash2, 
  Plus, 
  Search, 
  X, 
  Loader2,
  Package,
  HardHat,
  Truck,
  Settings2,
  Info,
  Printer
} from 'lucide-react';
import { 
  useItemAnalysisQuery, 
  useUpdateItemResourceMutation,
  useDeleteItemResourceMutation
} from '../../../hooks/queries/construction/useItems';
import { useResourcesQuery } from '../../../hooks/queries/construction/useResources';
import { useDownloadB2Mutation } from '../../../hooks/queries/construction/useReports';
import type { AnalysisResourceDto } from '../../../types/construction/itemAnalysis';
import type { ResourceDto } from '../../../types/construction/resource';
import Swal from 'sweetalert2';

interface BudgetItemAnalysisProps {
  itemId: string;
  itemName: string;
  moduleId: string;
  projectId: string;
  onClose: () => void;
}

const BudgetItemAnalysis: React.FC<BudgetItemAnalysisProps> = ({ 
  itemId, 
  itemName, 
  moduleId, 
  projectId,
  onClose 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Queries
  const { data: analysis, isLoading: isAnalysisLoading } = useItemAnalysisQuery(itemId);
  const { data: resourcesData } = useResourcesQuery({ search: searchTerm, pageSize: 5 });

  // Mutations
  const { mutate: updateResource } = useUpdateItemResourceMutation(itemId, moduleId, projectId);
  const { mutate: deleteResource } = useDeleteItemResourceMutation(itemId, moduleId, projectId);
  const { mutate: downloadB2, isPending: isDownloadingB2 } = useDownloadB2Mutation();

  const handleUpdate = (resource: AnalysisResourceDto, field: 'performance' | 'unitPrice', value: number) => {
    updateResource({
      resourceId: resource.resourceId,
      data: {
        id: resource.resourceId,
        name: resource.name,
        unitOfMeasureId: "", // El backend ya sabe el ID, o lo recuperamos si es necesario
        unitPrice: field === 'unitPrice' ? value : resource.unitPrice,
        performance: field === 'performance' ? value : resource.performance,
        quantity: 0, // No se usa en el APU directo
        type: resource.type
      }
    });
  };

  const handleDelete = (resource: AnalysisResourceDto) => {
    Swal.fire({
      title: '¿Quitar recurso?',
      text: `Se eliminará "${resource.name}" del análisis.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Sí, eliminar',
      customClass: { popup: 'rounded-2xl' }
    }).then((result) => {
      if (result.isConfirmed) {
        deleteResource(resource.resourceId);
      }
    });
  };

  if (isAnalysisLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/40 backdrop-blur-sm">
        <div className="bg-white p-8 rounded-3xl flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Cargando Análisis (APU)...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0f172a]/60 backdrop-blur-md animate-in fade-in duration-300 text-left">
      <div className="bg-white w-full max-w-6xl h-[90vh] rounded-[40px] shadow-2xl flex flex-col overflow-hidden text-left">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-slate-50/50 text-left">
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-100 text-white">
              <Calculator className="h-6 w-6 text-left" />
            </div>
            <div className="text-left text-left">
              <h3 className="text-xl font-black text-gray-900 leading-tight text-left">{analysis?.itemName || itemName}</h3>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest text-left">Análisis de Precio Unitario (APU) • Proyecto Actual</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-left">
            <button 
              onClick={() => downloadB2({ id: itemId, name: itemName })}
              disabled={isDownloadingB2}
              className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-slate-700 text-sm font-black rounded-xl hover:bg-slate-50 transition-all shadow-sm disabled:opacity-50 text-left"
            >
              {isDownloadingB2 ? <Loader2 className="h-4 w-4 animate-spin text-left" /> : <Printer className="h-4 w-4 text-blue-600 text-left" />}
              {isDownloadingB2 ? 'Generando...' : 'Exportar B-2 (PDF)'}
            </button>
            <button onClick={onClose} className="p-2.5 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all text-left">
              <X className="h-6 w-6 text-left" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          {/* Columna Izquierda: Tablas APU */}
          <div className="lg:col-span-8 space-y-8 text-left">
            
            {/* Buscador de Insumos (Se mantiene para añadir nuevos) */}
            <div className="relative text-left">
              <div className="flex items-center gap-2 mb-3 ml-1 text-left">
                <Package className="h-4 w-4 text-blue-600 text-left" />
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest text-left">Insumos en Catálogo</span>
              </div>
              <div className="relative group text-left">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors text-left" />
                <input 
                  type="text"
                  placeholder="Añadir material, obrero o equipo..."
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all font-bold text-gray-700 text-sm text-left"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Listado de Recursos */}
            <div className="space-y-6 text-left">
              {[
                { title: 'Materiales', icon: Package, data: analysis?.materials, color: 'text-amber-600' },
                { title: 'Mano de Obra', icon: HardHat, data: analysis?.labor, color: 'text-blue-600' },
                { title: 'Equipo y Maquinaria', icon: Truck, data: analysis?.equipment, color: 'text-purple-600' }
              ].map((section, idx) => (
                <div key={idx} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm text-left">
                  <div className="px-6 py-4 bg-slate-50/50 border-b border-gray-50 flex items-center gap-2 text-left">
                    <section.icon className={`h-4 w-4 ${section.color} text-left`} />
                    <h4 className="text-xs font-black text-gray-700 uppercase tracking-widest text-left">{section.title}</h4>
                  </div>
                  <div className="divide-y divide-gray-50 text-left">
                    {!section.data || section.data.length === 0 ? (
                      <div className="p-6 text-center text-gray-400 italic text-xs text-left">Sin registros asignados.</div>
                    ) : (
                      section.data.map((res) => (
                        <div key={res.resourceId} className="px-6 py-4 flex items-center justify-between group hover:bg-slate-50/50 transition-all text-left">
                          <div className="flex-1 text-left">
                            <p className="text-sm font-bold text-gray-800 text-left">{res.name}</p>
                            <p className="text-[10px] text-gray-400 font-medium text-left">{res.unit}</p>
                          </div>
                          <div className="flex items-center gap-6 text-left text-left">
                            <div className="text-left text-left">
                              <label className="block text-[8px] font-black text-gray-400 uppercase mb-1 text-left">Rendimiento</label>
                              <input 
                                type="number" 
                                defaultValue={res.performance}
                                onBlur={(e) => handleUpdate(res, 'performance', parseFloat(e.target.value) || 0)}
                                className="w-20 px-2 py-1.5 rounded-lg border border-gray-200 text-xs font-black text-center focus:ring-2 focus:ring-blue-100 outline-none text-left"
                              />
                            </div>
                            <div className="text-left text-left">
                              <label className="block text-[8px] font-black text-gray-400 uppercase mb-1 text-left">P. Unitario</label>
                              <input 
                                type="number" 
                                defaultValue={res.unitPrice}
                                onBlur={(e) => handleUpdate(res, 'unitPrice', parseFloat(e.target.value) || 0)}
                                className="w-24 px-2 py-1.5 rounded-lg border border-gray-200 text-xs font-black text-center focus:ring-2 focus:ring-blue-100 outline-none text-left"
                              />
                            </div>
                            <div className="w-24 text-right text-left text-left">
                              <label className="block text-[8px] font-black text-gray-400 uppercase mb-1 text-left">Subtotal</label>
                              <p className="text-sm font-black text-gray-900 text-left">Bs. {res.total.toFixed(2)}</p>
                            </div>
                            <button 
                              onClick={() => handleDelete(res)}
                              className="p-2 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100 text-left"
                            >
                              <Trash2 className="h-4 w-4 text-left" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Columna Derecha: Resumen de Cálculos de Ley */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <div className="bg-[#0f172a] rounded-[32px] p-8 text-white shadow-xl relative overflow-hidden text-left">
              <h4 className="text-xs font-black text-blue-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2 text-left">
                <Settings2 className="h-4 w-4 text-left" /> Desglose de Ley (B-2)
              </h4>
              
              <div className="space-y-4 text-left">
                <div className="flex justify-between items-center text-left">
                  <span className="text-sm text-slate-400 font-medium text-left">Total Materiales</span>
                  <span className="font-bold text-left">Bs. {analysis?.totalMaterials.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-left">
                  <span className="text-sm text-slate-400 font-medium text-left">Mano de Obra (Neto)</span>
                  <span className="font-bold text-left">Bs. {analysis?.laborSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-left">
                  <span className="text-sm text-slate-400 font-medium text-left">Beneficios Sociales (55%)</span>
                  <span className="text-blue-400 font-bold text-left">Bs. {analysis?.socialBenefits.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-left">
                  <span className="text-sm text-slate-400 font-medium text-left">IVA s/ Mano de Obra</span>
                  <span className="text-blue-400 font-bold text-left text-left">Bs. {analysis?.laborIVA.toFixed(2)}</span>
                </div>
                
                <div className="h-px bg-white/10 my-4 text-left"></div>
                
                <div className="flex justify-between items-center text-left">
                  <span className="text-sm text-slate-400 font-medium text-left text-left">Equipos y Herramientas</span>
                  <span className="font-bold text-left text-left">Bs. {analysis?.totalEquipment.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-left text-left">
                  <span className="text-sm text-slate-400 font-medium text-left text-left text-left text-left">Herramientas Menores (5%)</span>
                  <span className="text-purple-400 font-bold text-left text-left">Bs. {analysis?.minorTools.toFixed(2)}</span>
                </div>

                <div className="h-px bg-white/10 my-4 text-left"></div>
                
                <div className="flex justify-between items-center text-left">
                  <span className="text-sm text-slate-400 font-medium text-left text-left text-left">Gastos Generales</span>
                  <span className="font-bold text-left">Bs. {analysis?.generalExpenses.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-left">
                  <span className="text-sm text-slate-400 font-medium text-left text-left">Utilidad</span>
                  <span className="text-green-400 font-bold text-left">Bs. {analysis?.utility.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-left text-left">
                  <span className="text-sm text-slate-400 font-medium text-left text-left">Impuestos (IT)</span>
                  <span className="font-bold text-left text-left">Bs. {analysis?.taxIT.toFixed(2)}</span>
                </div>

                <div className="mt-8 pt-6 border-t border-white/20 text-left">
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest text-left text-left text-left text-left">Precio Unitario Final</p>
                  <p className="text-4xl font-black text-white mt-1 text-left text-left text-left text-left">Bs. {analysis?.finalUnitPrice.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl flex items-start gap-4 text-left text-left">
              <Info className="h-5 w-5 text-blue-600 shrink-0 text-left text-left text-left" />
              <div className="text-left text-left">
                <p className="text-xs font-bold text-blue-900 text-left text-left text-left text-left">Nota Técnica</p>
                <p className="text-[11px] text-blue-700/70 mt-1 leading-relaxed text-left text-left text-left">
                  Este análisis refleja el costo por unidad de medida del ítem incluyendo impuestos y cargas de ley.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetItemAnalysis;
