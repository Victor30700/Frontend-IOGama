import React, { useState } from 'react';
import { 
  X, 
  Calculator, 
  Plus, 
  Trash2, 
  Save, 
  Loader2, 
  Package, 
  Hammer, 
  Truck,
  AlertCircle,
  TrendingUp,
  Info
} from 'lucide-react';
import { 
  useItemAnalysisQuery, 
  useUpdateItemResourceMutation 
} from '../../../hooks/queries/construction/useItems';

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
  const { data: analysis, isLoading } = useItemAnalysisQuery(itemId);
  const { mutate: updateResource } = useUpdateItemResourceMutation(itemId, moduleId, projectId);

  const handleUpdate = (resourceId: string, performance: number, unitPrice: number) => {
    updateResource({ 
      resourceId, 
      data: { performance, unitPrice } 
    });
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[70] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm">
        <div className="bg-white p-12 rounded-3xl shadow-2xl flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
          <p className="text-gray-500 font-bold animate-pulse uppercase tracking-widest text-xs">Calculando APU...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-gray-50 w-full max-w-6xl h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 text-left">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-200 flex items-center justify-between bg-white text-left">
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg">
              <Calculator className="h-6 w-6" />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-900">Análisis de Precio Unitario (APU)</h3>
              <p className="text-sm text-blue-600 font-bold">{itemName}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          {/* SECCIÓN 1: MATERIALES */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden text-left">
            <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex items-center gap-2">
              <Package className="h-4 w-4 text-blue-500" />
              <h4 className="text-xs font-black text-gray-700 uppercase tracking-widest">1. Materiales</h4>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase">Descripción</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase">Unidad</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase text-center w-28">Rendimiento</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase text-center w-28">P. Unit (Bs)</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {analysis?.materials.map((res, idx) => (
                  <tr key={idx} className="group hover:bg-blue-50/20">
                    <td className="px-6 py-3 text-xs font-bold text-gray-800">{res.name}</td>
                    <td className="px-6 py-3 text-xs text-gray-500 font-medium">{res.unit}</td>
                    <td className="px-6 py-3 text-center">
                      <input 
                        type="number" step="0.0001" defaultValue={res.performance}
                        className="w-24 px-2 py-1 rounded-lg border border-gray-100 text-xs font-bold text-blue-600 text-center outline-none focus:ring-2 focus:ring-blue-100"
                      />
                    </td>
                    <td className="px-6 py-3 text-center">
                      <input 
                        type="number" step="0.01" defaultValue={res.unitPrice}
                        className="w-24 px-2 py-1 rounded-lg border border-gray-100 text-xs font-bold text-gray-700 text-center outline-none focus:ring-2 focus:ring-blue-100"
                      />
                    </td>
                    <td className="px-6 py-3 text-right text-xs font-black text-gray-900">Bs. {res.total.toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="bg-gray-50/50">
                  <td colSpan={4} className="px-6 py-3 text-[10px] font-black text-gray-500 uppercase text-right">Total Materiales (A)</td>
                  <td className="px-6 py-3 text-right text-sm font-black text-blue-600">Bs. {analysis?.totalMaterials.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* SECCIÓN 2: MANO DE OBRA */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden text-left">
            <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex items-center gap-2">
              <Hammer className="h-4 w-4 text-orange-500" />
              <h4 className="text-xs font-black text-gray-700 uppercase tracking-widest">2. Mano de Obra</h4>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase">Descripción</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase">Unidad</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase text-center w-28">Rendimiento</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase text-center w-28">P. Unit (Bs)</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {analysis?.labor.map((res, idx) => (
                  <tr key={idx} className="group hover:bg-orange-50/20">
                    <td className="px-6 py-3 text-xs font-bold text-gray-800">{res.name}</td>
                    <td className="px-6 py-3 text-xs text-gray-500 font-medium">{res.unit}</td>
                    <td className="px-6 py-3 text-center">
                      <input 
                        type="number" step="0.0001" defaultValue={res.performance}
                        className="w-24 px-2 py-1 rounded-lg border border-gray-100 text-xs font-bold text-orange-600 text-center outline-none focus:ring-2 focus:ring-orange-100"
                      />
                    </td>
                    <td className="px-6 py-3 text-center">
                      <input 
                        type="number" step="0.01" defaultValue={res.unitPrice}
                        className="w-24 px-2 py-1 rounded-lg border border-gray-100 text-xs font-bold text-gray-700 text-center outline-none focus:ring-2 focus:ring-orange-100"
                      />
                    </td>
                    <td className="px-6 py-3 text-right text-xs font-black text-gray-900">Bs. {res.total.toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="bg-gray-50/30">
                  <td colSpan={4} className="px-6 py-2 text-[10px] font-bold text-gray-400 uppercase text-right">Subtotal Mano de Obra</td>
                  <td className="px-6 py-2 text-right text-xs font-bold text-gray-700">Bs. {analysis?.laborSubtotal.toFixed(2)}</td>
                </tr>
                <tr className="bg-gray-50/30">
                  <td colSpan={4} className="px-6 py-2 text-[10px] font-bold text-gray-400 uppercase text-right">Beneficios Sociales</td>
                  <td className="px-6 py-2 text-right text-xs font-bold text-gray-700">Bs. {analysis?.socialBenefits.toFixed(2)}</td>
                </tr>
                <tr className="bg-gray-50/30 border-b border-gray-100">
                  <td colSpan={4} className="px-6 py-2 text-[10px] font-bold text-gray-400 uppercase text-right">IVA sobre Mano de Obra</td>
                  <td className="px-6 py-2 text-right text-xs font-bold text-gray-700">Bs. {analysis?.laborIVA.toFixed(2)}</td>
                </tr>
                <tr className="bg-gray-100/50">
                  <td colSpan={4} className="px-6 py-3 text-[10px] font-black text-gray-500 uppercase text-right">Total Mano de Obra (B)</td>
                  <td className="px-6 py-3 text-right text-sm font-black text-orange-600">Bs. {analysis?.totalLabor.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* SECCIÓN 3: EQUIPO */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden text-left">
            <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex items-center gap-2 text-left">
              <Truck className="h-4 w-4 text-green-500" />
              <h4 className="text-xs font-black text-gray-700 uppercase tracking-widest">3. Equipo y Maquinaria</h4>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase">Descripción</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase">Unidad</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase text-center w-28">Rendimiento</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase text-center w-28">P. Unit (Bs)</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {analysis?.equipment.map((res, idx) => (
                  <tr key={idx} className="group hover:bg-green-50/20">
                    <td className="px-6 py-3 text-xs font-bold text-gray-800">{res.name}</td>
                    <td className="px-6 py-3 text-xs text-gray-500 font-medium">{res.unit}</td>
                    <td className="px-6 py-3 text-center">
                      <input 
                        type="number" step="0.0001" defaultValue={res.performance}
                        className="w-24 px-2 py-1 rounded-lg border border-gray-100 text-xs font-bold text-green-600 text-center outline-none focus:ring-2 focus:ring-green-100"
                      />
                    </td>
                    <td className="px-6 py-3 text-center">
                      <input 
                        type="number" step="0.01" defaultValue={res.unitPrice}
                        className="w-24 px-2 py-1 rounded-lg border border-gray-100 text-xs font-bold text-gray-700 text-center outline-none focus:ring-2 focus:ring-green-100"
                      />
                    </td>
                    <td className="px-6 py-3 text-right text-xs font-black text-gray-900">Bs. {res.total.toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="bg-gray-50/30 border-b border-gray-100">
                  <td colSpan={4} className="px-6 py-2 text-[10px] font-bold text-gray-400 uppercase text-right">Herramientas Menores (% Equipo)</td>
                  <td className="px-6 py-2 text-right text-xs font-bold text-gray-700">Bs. {analysis?.minorTools.toFixed(2)}</td>
                </tr>
                <tr className="bg-gray-100/50 text-left">
                  <td colSpan={4} className="px-6 py-3 text-[10px] font-black text-gray-500 uppercase text-right">Total Equipo (C)</td>
                  <td className="px-6 py-3 text-right text-sm font-black text-green-600">Bs. {analysis?.totalEquipment.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* RESUMEN FINAL (GASTOS E IMPUESTOS) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4 text-left">
              <div className="flex items-center justify-between text-left">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Costo Directo (A+B+C)</span>
                <span className="text-sm font-bold text-gray-900">Bs. {(analysis!.totalMaterials + analysis!.totalLabor + analysis!.totalEquipment).toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-left">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Gastos Generales y Adm.</span>
                <span className="text-sm font-bold text-gray-900">Bs. {analysis?.generalExpenses.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-left">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Utilidad IO GAMA</span>
                <span className="text-sm font-bold text-green-600">Bs. {analysis?.utility.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-left">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Impuesto IT (3.09%)</span>
                <span className="text-sm font-bold text-gray-900">Bs. {analysis?.taxIT.toFixed(2)}</span>
              </div>
              <hr className="border-gray-100" />
              <div className="flex items-center justify-between pt-2 text-left">
                <span className="text-lg font-black text-gray-900 uppercase">Precio Unitario de Venta</span>
                <span className="text-2xl font-black text-blue-600">Bs. {analysis?.finalUnitPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-blue-50/50 border border-blue-100 p-8 rounded-3xl flex flex-col justify-center gap-4 text-left">
              <div className="flex items-center gap-3 text-blue-700">
                <Info className="h-6 w-6" />
                <h5 className="font-bold">Información de Cálculo</h5>
              </div>
              <p className="text-xs text-blue-600 leading-relaxed">
                Este análisis se basa en los **Parámetros de Ley** configurados en el proyecto. 
                El Precio Unitario de Venta multiplicado por la cantidad del ítem determinará el 
                aporte de esta actividad al presupuesto total de la obra.
              </p>
              <div className="mt-4 p-4 bg-white rounded-2xl border border-blue-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Precio Unitario para el Cliente</p>
                <p className="text-xl font-black text-blue-700">Bs. {analysis?.finalUnitPrice.toFixed(2)} <span className="text-xs font-medium text-gray-400">/ {analysis?.materials[0]?.unit || 'unid'}</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Acciones Footer */}
        <div className="px-8 py-6 bg-white border-t border-gray-200 flex justify-between items-center text-left">
          <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-xl border border-amber-100">
            <AlertCircle className="h-4 w-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Cálculos en tiempo real según coeficientes de obra</span>
          </div>
          <div className="flex gap-3 text-left">
            <button onClick={onClose} className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700 transition-all">
              Cerrar Análisis
            </button>
            <button className="flex items-center gap-2 px-8 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">
              <Plus className="h-4 w-4" /> Añadir Insumo Manual
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetItemAnalysis;
