import apiClient from '@/api/client';
import { Unit, UnitFilters, UnitListResponse } from './types';
import { UnitFormData } from '@/lib/validation';

export const unitsApi = {
  getUnits: async (filters: UnitFilters): Promise<UnitListResponse> => {
    const response = await apiClient.get<UnitListResponse>('/units', { params: filters });
    return response.data;
  },

  getUnit: async (id: string): Promise<Unit> => {
    const response = await apiClient.get<Unit>(`/units/${id}`);
    return response.data;
  },

  createUnit: async (data: UnitFormData): Promise<Unit> => {
    const response = await apiClient.post<Unit>('/units', data);
    return response.data;
  },

  updateUnit: async (id: string, data: Partial<UnitFormData>): Promise<Unit> => {
    const response = await apiClient.patch<Unit>(`/units/${id}`, data);
    return response.data;
  },

  deleteUnit: async (id: string): Promise<void> => {
    await apiClient.delete(`/units/${id}`);
  },
};
