export interface UnitDto {
  id: string;
  name: string;
  abbreviation: string;
  isGlobal: boolean;
}

export interface CreateUnitRequest {
  name: string;
  abbreviation: string;
}

export interface UpdateUnitRequest {
  id: string;
  name: string;
  abbreviation: string;
}
