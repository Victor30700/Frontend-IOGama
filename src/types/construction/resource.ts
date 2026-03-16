export interface ResourceDto {
  id: string;
  name: string;
  unitName: string;
  unitAbbreviation: string;
  basePrice: number;
  code: string;
  type: 'Materiales' | 'Obreros' | 'Equipos';
  isGlobal: boolean;
}

export interface CreateResourceRequest {
  name: string;
  unitOfMeasureId: string;
  basePrice: number;
  type: string; // Materiales, Obreros, Equipos
  code: string;
}

export interface UpdateResourceRequest {
  id: string;
  name: string;
  unitOfMeasureId: string;
  basePrice: number;
  code: string;
}
