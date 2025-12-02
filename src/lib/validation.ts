import { z } from 'zod';

// Auth schemas
export const requestOtpSchema = z.object({
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
});

export const verifyOtpSchema = z.object({
  phoneNumber: z.string().min(10, 'Phone number is required'),
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

// Lead schemas
export const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  source: z.string().min(1, 'Source is required'),
  status: z.enum(['new', 'contacted', 'qualified', 'converted', 'lost']),
  budget: z.number().positive('Budget must be positive').optional(),
  notes: z.string().optional(),
});

// Project schemas
export const projectSchema = z.object({
  name: z.string().min(2, 'Project name must be at least 2 characters'),
  location: z.string().min(2, 'Location is required'),
  developer: z.string().min(2, 'Developer name is required'),
  description: z.string().optional(),
  totalUnits: z.number().positive('Total units must be positive'),
  status: z.enum(['upcoming', 'ongoing', 'completed']),
  possessionDate: z.string().optional(),
});

// Unit schemas
export const unitSchema = z.object({
  projectId: z.string().min(1, 'Project is required'),
  unitNumber: z.string().min(1, 'Unit number is required'),
  type: z.enum(['1BHK', '2BHK', '3BHK', '4BHK', 'Villa', 'Plot']),
  floor: z.number().int().positive('Floor must be a positive number').optional(),
  area: z.number().positive('Area must be positive'),
  basePrice: z.number().positive('Base price must be positive'),
  status: z.enum(['available', 'blocked', 'booked', 'sold']),
  amenities: z.array(z.string()).optional(),
});

// Booking schemas
export const bookingSchema = z.object({
  leadId: z.string().min(1, 'Lead is required'),
  unitId: z.string().min(1, 'Unit is required'),
  paymentPlan: z.enum(['full', 'installment', 'construction-linked']),
  tokenAmount: z.number().positive('Token amount must be positive'),
  bookingDate: z.string(),
  notes: z.string().optional(),
});

// Activity schemas
export const activitySchema = z.object({
  leadId: z.string().min(1, 'Lead is required'),
  type: z.enum(['call', 'email', 'meeting', 'note', 'status_change']),
  description: z.string().min(1, 'Description is required'),
  scheduledAt: z.string().optional(),
});

export type LeadFormData = z.infer<typeof leadSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;
export type UnitFormData = z.infer<typeof unitSchema>;
export type BookingFormData = z.infer<typeof bookingSchema>;
export type ActivityFormData = z.infer<typeof activitySchema>;
