export interface ProjectModuleDto {
  id: string;
  name: string;
  description: string;
  totalAmount: number;
  order: number;
}

export interface CreateModuleRequest {
  projectId: string;
  name: string;
  description: string;
  order: number;
}

export interface UpdateModuleRequest {
  id: string;
  name: string;
  description: string;
  order: number;
}
