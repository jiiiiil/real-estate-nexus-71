export interface Unit {
  id: string;
  projectId: string;
  projectName: string;
  unitNumber: string;
  type: '1BHK' | '2BHK' | '3BHK' | '4BHK' | 'Villa' | 'Plot';
  floor?: number;
  area: number;
  basePrice: number;
  status: 'available' | 'blocked' | 'booked' | 'sold';
  amenities?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UnitFilters {
  projectId?: string;
  type?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
  limit?: number;
}

export interface UnitListResponse {
  data: Unit[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
