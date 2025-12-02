import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { requestOtpSchema, verifyOtpSchema } from '@/lib/validation';
import { useRequestOtp, useVerifyOtp } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <Card className="w-full max-w-md border-border/40 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold tracking-tight">Welcome Back</CardTitle>
          <CardDescription className="text-base">
            {step === 'phone' ? 'Enter your phone number to receive OTP' : 'Enter the OTP sent to your phone'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'phone' ? (
            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="+91 98765 43210"
                  {...phoneForm.register('phoneNumber')}
                  className="h-11"
                />
                {phoneForm.formState.errors.phoneNumber && (
                  <p className="text-sm text-destructive">{phoneForm.formState.errors.phoneNumber.message}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full h-11 font-medium"
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
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  {...otpForm.register('otp')}
                  className="h-11 text-center text-lg tracking-widest"
                />
                {otpForm.formState.errors.otp && (
                  <p className="text-sm text-destructive">{otpForm.formState.errors.otp.message}</p>
                )}
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 h-11"
                  onClick={() => setStep('phone')}
                >
                  Change Number
                </Button>
                <Button
                  type="submit"
                  className="flex-1 h-11 font-medium"
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
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
