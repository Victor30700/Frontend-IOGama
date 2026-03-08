export interface AnalysisResourceDto {
  name: string;
  unit: string;
  performance: number;
  unitPrice: number;
  total: number;
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

export interface UpdateItemResourceRequest {
  performance: number;
  unitPrice: number;
}

export interface AddCustomResourceRequest {
  name: string;
  unitOfMeasureId: string;
  unitPrice: number;
  performance: number;
  type: number; // 0=Mat, 1=Obrero, 2=Eq
}
