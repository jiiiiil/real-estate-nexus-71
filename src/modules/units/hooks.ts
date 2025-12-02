import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { unitsApi } from './api';
import { UnitFilters } from './types';
import { UnitFormData } from '@/lib/validation';
import { toast } from 'sonner';

export const useUnits = (filters: UnitFilters) => {
  return useQuery({
    queryKey: ['units', filters],
    queryFn: () => unitsApi.getUnits(filters),
  });
};

export const useUnit = (id: string) => {
  return useQuery({
    queryKey: ['unit', id],
    queryFn: () => unitsApi.getUnit(id),
    enabled: !!id,
  });
};

export const useCreateUnit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UnitFormData) => unitsApi.createUnit(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['units'] });
      toast.success('Unit created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create unit');
    },
  });
};

export const useUpdateUnit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<UnitFormData> }) =>
      unitsApi.updateUnit(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['units'] });
      queryClient.invalidateQueries({ queryKey: ['unit', variables.id] });
      toast.success('Unit updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update unit');
    },
  });
};
