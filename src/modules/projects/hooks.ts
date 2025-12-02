import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsApi } from './api';
import { ProjectFormData } from '@/lib/validation';
import { toast } from 'sonner';

export const useProjects = (params?: any) => {
  return useQuery({
    queryKey: ['projects', params],
    queryFn: () => projectsApi.getProjects(params),
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => projectsApi.getProject(id),
    enabled: !!id,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProjectFormData) => projectsApi.createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create project');
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ProjectFormData> }) =>
      projectsApi.updateProject(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project', variables.id] });
      toast.success('Project updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update project');
    },
  });
};
