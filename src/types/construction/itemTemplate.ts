export interface ItemTemplateDto {
  id: string;
  name: string;
  code: string;
  unit: string;
  description: string;
  isGlobal: boolean;
  resourceCount: number;
}

export interface CreateItemTemplateRequest {
  name: string;
  code: string;
  description: string;
  unitOfMeasureId: string;
}

export interface UpdateItemTemplateRequest {
  id: string;
  name: string;
  code: string;
  description: string;
  unitOfMeasureId: string;
}

export interface TemplateResourceRequest {
  resourceId: string;
  quantity: number;
}
