import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingsApi } from './api';
import { BookingFormData } from '@/lib/validation';
import { toast } from 'sonner';

export const useBookings = (params?: any) => {
  return useQuery({
    queryKey: ['bookings', params],
    queryFn: () => bookingsApi.getBookings(params),
  });
};

export const useBooking = (id: string) => {
  return useQuery({
    queryKey: ['booking', id],
    queryFn: () => bookingsApi.getBooking(id),
    enabled: !!id,
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BookingFormData) => bookingsApi.createBooking(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['units'] });
      toast.success('Booking created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create booking');
    },
  });
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => bookingsApi.cancelBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['units'] });
      toast.success('Booking cancelled successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to cancel booking');
    },
  });
};
