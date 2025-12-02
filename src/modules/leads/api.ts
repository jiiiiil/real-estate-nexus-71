import apiClient from '@/api/client';
import { Lead, LeadFilters, LeadListResponse, Activity } from './types';
import { LeadFormData, ActivityFormData } from '@/lib/validation';

export const leadsApi = {
  getLeads: async (filters: LeadFilters): Promise<LeadListResponse> => {
    const response = await apiClient.get<LeadListResponse>('/leads', { params: filters });
    return response.data;
  },

  getLead: async (id: string): Promise<Lead> => {
    const response = await apiClient.get<Lead>(`/leads/${id}`);
    return response.data;
  },

  createLead: async (data: LeadFormData): Promise<Lead> => {
    const response = await apiClient.post<Lead>('/leads', data);
    return response.data;
  },

  updateLead: async (id: string, data: Partial<LeadFormData>): Promise<Lead> => {
    const response = await apiClient.patch<Lead>(`/leads/${id}`, data);
    return response.data;
  },

  deleteLead: async (id: string): Promise<void> => {
    await apiClient.delete(`/leads/${id}`);
  },

  assignAgent: async (id: string, agentId: string): Promise<Lead> => {
    const response = await apiClient.patch<Lead>(`/leads/${id}/assign`, { agentId });
    return response.data;
  },

  getActivities: async (leadId: string): Promise<Activity[]> => {
    const response = await apiClient.get<Activity[]>(`/leads/${leadId}/activities`);
    return response.data;
  },

  createActivity: async (data: ActivityFormData): Promise<Activity> => {
    const response = await apiClient.post<Activity>('/leads/activities', data);
    return response.data;
  },

  importLeads: async (file: File): Promise<{ jobId: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post<{ jobId: string }>('/leads/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  getImportJobs: async (): Promise<any[]> => {
    const response = await apiClient.get('/leads/import-jobs');
    return response.data;
  },

  getImportJob: async (id: string): Promise<any> => {
    const response = await apiClient.get(`/leads/import-jobs/${id}`);
    return response.data;
  },
};
