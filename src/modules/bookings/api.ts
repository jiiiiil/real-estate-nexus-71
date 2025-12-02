import apiClient from '@/api/client';
import { Booking, BookingListResponse } from './types';
import { BookingFormData } from '@/lib/validation';

export const bookingsApi = {
  getBookings: async (params?: any): Promise<BookingListResponse> => {
    const response = await apiClient.get<BookingListResponse>('/bookings', { params });
    return response.data;
  },

  getBooking: async (id: string): Promise<Booking> => {
    const response = await apiClient.get<Booking>(`/bookings/${id}`);
    return response.data;
  },

  createBooking: async (data: BookingFormData): Promise<Booking> => {
    const response = await apiClient.post<Booking>('/bookings', data);
    return response.data;
  },

  updateBooking: async (id: string, data: Partial<BookingFormData>): Promise<Booking> => {
    const response = await apiClient.patch<Booking>(`/bookings/${id}`, data);
    return response.data;
  },

  cancelBooking: async (id: string): Promise<Booking> => {
    const response = await apiClient.patch<Booking>(`/bookings/${id}/cancel`);
    return response.data;
  },
};
