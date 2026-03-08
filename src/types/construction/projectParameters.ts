export interface ProjectParametersDto {
  socialBenefitsPercentage: number;
  laborIVAPercentage: number;
  isLaborIVAActive: boolean;
  minorToolsPercentage: number;
  generalExpensesPercentage: number;
  utilityPercentage: number;
  itPercentage: number;
  isITActive: boolean;
}

export interface UpdateProjectParametersRequest {
  socialBenefitsPercentage: number;
  laborIVAPercentage: number;
  isLaborIVAActive: boolean;
  minorToolsPercentage: number;
  generalExpensesPercentage: number;
  utilityPercentage: number;
  itPercentage: number;
  isITActive: boolean;
}
