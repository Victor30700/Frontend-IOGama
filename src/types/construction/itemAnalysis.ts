export interface AnalysisResourceDto {
  resourceId: string;
  name: string;
  unit: string;
  performance: number;
  unitPrice: number;
  total: number;
  type: string;
}

export interface BudgetItemAnalysisDto {
  budgetItemId: string;
  itemName: string;
  totalMaterials: number;
  materials: AnalysisResourceDto[];
  laborSubtotal: number;
  socialBenefits: number;
  laborIVA: number;
  totalLabor: number;
  labor: AnalysisResourceDto[];
  equipmentSubtotal: number;
  minorTools: number;
  totalEquipment: number;
  equipment: AnalysisResourceDto[];
  generalExpenses: number;
  utility: number;
  taxIT: number;
  finalUnitPrice: number;
}

// DTO para POST /api/items/{id}/resources/custom
export interface AddCustomResourceRequest {
  budgetItemId: string;
  name: string;
  unitOfMeasureId: string;
  unitPrice: number;
  performance: number;
  quantity: number;
  type: string; // "Materiales", "Obreros", "Equipos"
}

// DTO para PUT /api/items/{id}/resources/{resourceId}
export interface UpdateItemResourceRequest {
  id: string; // resourceId
  name: string;
  unitOfMeasureId: string;
  unitPrice: number;
  performance: number;
  quantity: number;
  type: string;
}
