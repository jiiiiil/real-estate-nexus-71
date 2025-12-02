export interface Lead {
  id: string;
  name: string;
  email?: string;
  phone: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  budget?: number;
  notes?: string;
  assignedTo?: string;
  assignedToName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadFilters {
  status?: string;
  source?: string;
  assignedTo?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface LeadListResponse {
  data: Lead[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface Activity {
  id: string;
  leadId: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'status_change';
  description: string;
  createdBy: string;
  createdByName: string;
  createdAt: string;
  scheduledAt?: string;
}
