import api from '../config/api';
import type { UserProfileResponse, UpdateProfileRequest } from '../types/profile';

export const profileService = {
  getMe: async (): Promise<UserProfileResponse> => {
    // La ruta correcta según ENDPOINTS_GUIDE.md es /api/users/Users/profile/me
    const response = await api.get<UserProfileResponse>('/api/users/Users/profile/me');
    return response.data;
  },

  updateProfile: async (data: UpdateProfileRequest): Promise<UserProfileResponse> => {
    // La ruta correcta según ENDPOINTS_GUIDE.md es /api/users/Users/profile/me (PUT)
    const response = await api.put<UserProfileResponse>('/api/users/Users/profile/me', data);
    return response.data;
  },
};
