export interface Booking {
  id: string;
  leadId: string;
  leadName: string;
  unitId: string;
  unitNumber: string;
  projectName: string;
  paymentPlan: 'full' | 'installment' | 'construction-linked';
  tokenAmount: number;
  bookingDate: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface BookingListResponse {
  data: Booking[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
