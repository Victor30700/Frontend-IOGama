export interface ProjectMemberDto {
  userId: string;
  fullName: string;
  role: string | number;
  canView: boolean;
  canEdit: boolean;
  canShare: boolean;
  isEncargado: boolean;
  sharedById: string | null;
  sharedAt: string | null;
}

export interface MemberActionRequest {
  externalUserId: string;
  fullName?: string;
  canView: boolean;
  canEdit: boolean;
  canShare: boolean;
  role: string | number; // "Admin", "Resident", "Supervisor", "Viewer"
}

export interface BatchMembersRequest {
  projectId: string;
  members: MemberActionRequest[];
}
