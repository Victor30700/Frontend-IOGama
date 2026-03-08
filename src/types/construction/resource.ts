export type ResourceType = 'Materiales' | 'Mano de Obra' | 'Equipo';

export interface ResourceDto {
  id: string;
  name: string;
  unitName: string;
  unitAbbreviation: string;
  basePrice: number;
  code: string;
  type: string;
  isGlobal: boolean;
}

export interface CreateResourceRequest {
  name: string;
  unitOfMeasureId: string;
  basePrice: number;
  type: string;
  code: string;
}

export interface UpdateResourceRequest {
  id: string;
  name: string;
  unitOfMeasureId: string;
  basePrice: number;
  code: string;
}

export interface PaginatedResources {
  items: ResourceDto[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}
