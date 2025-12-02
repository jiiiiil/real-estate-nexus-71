import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { leadsApi } from './api';
import { LeadFilters } from './types';
import { LeadFormData, ActivityFormData } from '@/lib/validation';
import { toast } from 'sonner';

export const useLeads = (filters: LeadFilters) => {
  return useQuery({
    queryKey: ['leads', filters],
    queryFn: () => leadsApi.getLeads(filters),
  });
};

export const useLead = (id: string) => {
  return useQuery({
    queryKey: ['lead', id],
    queryFn: () => leadsApi.getLead(id),
    enabled: !!id,
  });
};

export const useCreateLead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LeadFormData) => leadsApi.createLead(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Lead created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create lead');
    },
  });
};

export const useUpdateLead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<LeadFormData> }) =>
      leadsApi.updateLead(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['lead', variables.id] });
      toast.success('Lead updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update lead');
    },
  });
};

export const useDeleteLead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => leadsApi.deleteLead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Lead deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete lead');
    },
  });
};

export const useAssignAgent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, agentId }: { id: string; agentId: string }) =>
      leadsApi.assignAgent(id, agentId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['lead', variables.id] });
      toast.success('Agent assigned successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to assign agent');
    },
  });
};

export const useActivities = (leadId: string) => {
  return useQuery({
    queryKey: ['activities', leadId],
    queryFn: () => leadsApi.getActivities(leadId),
    enabled: !!leadId,
  });
};

export const useCreateActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ActivityFormData) => leadsApi.createActivity(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['activities', variables.leadId] });
      toast.success('Activity added successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to add activity');
    },
  });
};

export const useImportLeads = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => leadsApi.importLeads(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['import-jobs'] });
      toast.success('Import started successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to start import');
    },
  });
};

export const useImportJobs = () => {
  return useQuery({
    queryKey: ['import-jobs'],
    queryFn: leadsApi.getImportJobs,
  });
};

export const useImportJob = (id: string) => {
  return useQuery({
    queryKey: ['import-job', id],
    queryFn: () => leadsApi.getImportJob(id),
    enabled: !!id,
    refetchInterval: 5000, // Poll every 5 seconds
  });
};
