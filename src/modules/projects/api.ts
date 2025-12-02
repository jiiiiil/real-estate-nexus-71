import apiClient from '@/api/client';
import { Project, ProjectListResponse } from './types';
import { ProjectFormData } from '@/lib/validation';

export const projectsApi = {
  getProjects: async (params?: any): Promise<ProjectListResponse> => {
    const response = await apiClient.get<ProjectListResponse>('/projects', { params });
    return response.data;
  },

  getProject: async (id: string): Promise<Project> => {
    const response = await apiClient.get<Project>(`/projects/${id}`);
    return response.data;
  },

  createProject: async (data: ProjectFormData): Promise<Project> => {
    const response = await apiClient.post<Project>('/projects', data);
    return response.data;
  },

  updateProject: async (id: string, data: Partial<ProjectFormData>): Promise<Project> => {
    const response = await apiClient.patch<Project>(`/projects/${id}`, data);
    return response.data;
  },

  deleteProject: async (id: string): Promise<void> => {
    await apiClient.delete(`/projects/${id}`);
  },
};
