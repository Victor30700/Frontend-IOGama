export interface BudgetItemDto {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  code: string;
  projectModuleId: string;
  total: number;
  materialCost: number;
  laborCost: number;
  equipmentCost: number;
}

export interface ImportItemRequest {
  templateId: string;
  quantity: number;
}

export interface BulkImportRequest {
  moduleId: string;
  items: ImportItemRequest[];
}
