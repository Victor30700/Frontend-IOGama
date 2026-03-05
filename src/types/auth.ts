export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ModuleContext {
  name: string;
  status: string;
  rejectionReason: string | null;
}

export interface UserProfile {
  name: string;
  fotoUrl: string | null;
}

export interface UserContext {
  accountStatus: string;
  accountRejectionReason: string | null;
  userType: string;
  modules: ModuleContext[];
  tags: string[];
  profile: UserProfile;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  userId: string;
  userContext: UserContext;
}

export interface User {
  id: string;
  email: string;
  role: string;
  type: string;
  profileName: string;
  fotoUrl: string | null;
}
