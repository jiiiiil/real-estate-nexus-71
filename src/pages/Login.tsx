import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { requestOtpSchema, verifyOtpSchema } from '@/lib/validation';
import { useRequestOtp, useVerifyOtp } from '@/hooks/useAuth';
import { GlassButton } from '@/components/ui/GlassButton';
import { GlassInput } from '@/components/ui/GlassInput';
import { GlassCard } from '@/components/ui/GlassCard';
import { Label } from '@/components/ui/label';
import { Loader2, Phone, KeyRound, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

type Step = 'phone' | 'otp';

export default function Login() {
  const [step, setStep] = useState<Step>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');

  const requestOtpMutation = useRequestOtp();
  const verifyOtpMutation = useVerifyOtp();

  const phoneForm = useForm({
    resolver: zodResolver(requestOtpSchema),
    defaultValues: { phoneNumber: '' },
  });

  const otpForm = useForm({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: { phoneNumber: '', otp: '' },
  });

  const handleRequestOtp = phoneForm.handleSubmit(async (data) => {
    await requestOtpMutation.mutateAsync(data);
    setPhoneNumber(data.phoneNumber);
    setStep('otp');
  });

  const handleVerifyOtp = otpForm.handleSubmit(async (data) => {
    await verifyOtpMutation.mutateAsync({
      phoneNumber,
      otp: data.otp,
    });
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-glass-bg">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-mint/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-violet/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-mint/5 to-violet/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <GlassCard className="p-8" gradient>
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-mint to-mint-dark mb-4 shadow-mint"
            >
              <Building2 className="w-8 h-8 text-glass-bg" />
            </motion.div>
            <h1 className="text-3xl font-bold text-glass-text mb-2">Welcome Back</h1>
            <p className="text-glass-muted">
              {step === 'phone' ? 'Enter your phone number to receive OTP' : 'Enter the OTP sent to your phone'}
            </p>
          </div>

          {step === 'phone' ? (
            <motion.form
              key="phone-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleRequestOtp}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-glass-text">Phone Number</Label>
                <GlassInput
                  id="phoneNumber"
                  type="tel"
                  placeholder="+91 98765 43210"
                  icon={<Phone className="w-4 h-4" />}
                  {...phoneForm.register('phoneNumber')}
                />
                {phoneForm.formState.errors.phoneNumber && (
                  <p className="text-sm text-red-400">{phoneForm.formState.errors.phoneNumber.message}</p>
                )}
              </div>
              <GlassButton
                type="submit"
                className="w-full"
                disabled={requestOtpMutation.isPending}
              >
                {requestOtpMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  'Send OTP'
                )}
              </GlassButton>
            </motion.form>
          ) : (
            <motion.form
              key="otp-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleVerifyOtp}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-glass-text">OTP Code</Label>
                <GlassInput
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  icon={<KeyRound className="w-4 h-4" />}
                  className="text-center text-lg tracking-[0.5em]"
                  {...otpForm.register('otp')}
                />
                {otpForm.formState.errors.otp && (
                  <p className="text-sm text-red-400">{otpForm.formState.errors.otp.message}</p>
                )}
              </div>
              <div className="flex gap-3">
                <GlassButton
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep('phone')}
                >
                  Change Number
                </GlassButton>
                <GlassButton
                  type="submit"
                  className="flex-1"
                  disabled={verifyOtpMutation.isPending}
                >
                  {verifyOtpMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify & Login'
                  )}
                </GlassButton>
              </div>
            </motion.form>
          )}

          {/* Footer */}
          <p className="text-center text-glass-muted text-sm mt-8">
            Real Estate CRM © 2025
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
}
