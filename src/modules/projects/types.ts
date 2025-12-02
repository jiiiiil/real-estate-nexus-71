export interface Project {
  id: string;
  name: string;
  location: string;
  developer: string;
  description?: string;
  totalUnits: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  possessionDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectListResponse {
  data: Project[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
