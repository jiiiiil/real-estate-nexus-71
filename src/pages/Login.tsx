import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, registerSchema, forgotPasswordSchema, LoginFormData, RegisterFormData, ForgotPasswordFormData } from '@/lib/validation';
import { useLogin, useRegister, useForgotPassword } from '@/hooks/useAuth';
import { GlassButton } from '@/components/ui/GlassButton';
import { GlassInput } from '@/components/ui/GlassInput';
import { GlassCard } from '@/components/ui/GlassCard';
import { Label } from '@/components/ui/label';
import { Loader2, Mail, Lock, User, Building2, ArrowLeft, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type AuthView = 'login' | 'register' | 'forgot-password' | 'verification-sent';

export default function Login() {
  const [view, setView] = useState<AuthView>('login');
  const [registeredEmail, setRegisteredEmail] = useState('');

  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const forgotPasswordMutation = useForgotPassword();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const forgotPasswordForm = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const handleLogin = loginForm.handleSubmit(async (data) => {
    await loginMutation.mutateAsync({
      email: data.email,
      password: data.password,
    });
  });

  const handleRegister = registerForm.handleSubmit(async (data) => {
    await registerMutation.mutateAsync({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    setRegisteredEmail(data.email);
    setView('verification-sent');
  });

  const handleForgotPassword = forgotPasswordForm.handleSubmit(async (data) => {
    await forgotPasswordMutation.mutateAsync({ email: data.email });
  });

  const renderContent = () => {
    switch (view) {
      case 'login':
        return (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-mint to-mint-dark mb-4 shadow-mint"
              >
                <Building2 className="w-8 h-8 text-glass-bg" />
              </motion.div>
              <h1 className="text-3xl font-bold text-glass-text mb-2">Welcome Back</h1>
              <p className="text-glass-muted">Sign in to your account</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-glass-text">Email</Label>
                <GlassInput
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  icon={<Mail className="w-4 h-4" />}
                  {...loginForm.register('email')}
                />
                {loginForm.formState.errors.email && (
                  <p className="text-sm text-red-400">{loginForm.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password" className="text-glass-text">Password</Label>
                  <button
                    type="button"
                    onClick={() => setView('forgot-password')}
                    className="text-sm text-mint hover:text-mint-light transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <GlassInput
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  icon={<Lock className="w-4 h-4" />}
                  {...loginForm.register('password')}
                />
                {loginForm.formState.errors.password && (
                  <p className="text-sm text-red-400">{loginForm.formState.errors.password.message}</p>
                )}
              </div>

              <GlassButton
                type="submit"
                className="w-full"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </GlassButton>
            </form>

            <div className="text-center text-sm">
              <span className="text-glass-muted">Don't have an account? </span>
              <button
                onClick={() => setView('register')}
                className="text-mint hover:text-mint-light transition-colors font-medium"
              >
                Sign up
              </button>
            </div>
          </motion.div>
        );

      case 'register':
        return (
          <motion.div
            key="register"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet to-violet-dark mb-4 shadow-violet"
              >
                <User className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="text-3xl font-bold text-glass-text mb-2">Create Account</h1>
              <p className="text-glass-muted">Enter your details to get started</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-glass-text">Full Name</Label>
                <GlassInput
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  icon={<User className="w-4 h-4" />}
                  {...registerForm.register('name')}
                />
                {registerForm.formState.errors.name && (
                  <p className="text-sm text-red-400">{registerForm.formState.errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-email" className="text-glass-text">Email</Label>
                <GlassInput
                  id="reg-email"
                  type="email"
                  placeholder="name@company.com"
                  icon={<Mail className="w-4 h-4" />}
                  {...registerForm.register('email')}
                />
                {registerForm.formState.errors.email && (
                  <p className="text-sm text-red-400">{registerForm.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-password" className="text-glass-text">Password</Label>
                <GlassInput
                  id="reg-password"
                  type="password"
                  placeholder="••••••••"
                  icon={<Lock className="w-4 h-4" />}
                  {...registerForm.register('password')}
                />
                {registerForm.formState.errors.password && (
                  <p className="text-sm text-red-400">{registerForm.formState.errors.password.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-glass-text">Confirm Password</Label>
                <GlassInput
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  icon={<Lock className="w-4 h-4" />}
                  {...registerForm.register('confirmPassword')}
                />
                {registerForm.formState.errors.confirmPassword && (
                  <p className="text-sm text-red-400">{registerForm.formState.errors.confirmPassword.message}</p>
                )}
              </div>

              <GlassButton
                type="submit"
                className="w-full"
                variant="accent"
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </GlassButton>
            </form>

            <div className="text-center text-sm">
              <span className="text-glass-muted">Already have an account? </span>
              <button
                onClick={() => setView('login')}
                className="text-mint hover:text-mint-light transition-colors font-medium"
              >
                Sign in
              </button>
            </div>
          </motion.div>
        );

      case 'forgot-password':
        return (
          <motion.div
            key="forgot-password"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <button
              onClick={() => setView('login')}
              className="flex items-center gap-2 text-glass-muted hover:text-glass-text transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </button>

            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 mb-4"
              >
                <Mail className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="text-3xl font-bold text-glass-text mb-2">Forgot Password?</h1>
              <p className="text-glass-muted">Enter your email to receive a reset link</p>
            </div>

            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="forgot-email" className="text-glass-text">Email</Label>
                <GlassInput
                  id="forgot-email"
                  type="email"
                  placeholder="name@company.com"
                  icon={<Mail className="w-4 h-4" />}
                  {...forgotPasswordForm.register('email')}
                />
                {forgotPasswordForm.formState.errors.email && (
                  <p className="text-sm text-red-400">{forgotPasswordForm.formState.errors.email.message}</p>
                )}
              </div>

              <GlassButton
                type="submit"
                className="w-full"
                disabled={forgotPasswordMutation.isPending}
              >
                {forgotPasswordMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </GlassButton>
            </form>
          </motion.div>
        );

      case 'verification-sent':
        return (
          <motion.div
            key="verification-sent"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-mint/20 mb-4"
            >
              <CheckCircle className="w-10 h-10 text-mint" />
            </motion.div>
            
            <div>
              <h1 className="text-3xl font-bold text-glass-text mb-2">Check Your Email</h1>
              <p className="text-glass-muted">
                We've sent a verification link to
              </p>
              <p className="text-mint font-medium mt-1">{registeredEmail}</p>
            </div>

            <div className="glass-card p-4 text-sm text-glass-muted">
              <p>Click the link in your email to verify your account and complete registration.</p>
            </div>

            <div className="space-y-3">
              <GlassButton
                onClick={() => setView('login')}
                className="w-full"
              >
                Back to Sign In
              </GlassButton>
              
              <p className="text-sm text-glass-muted">
                Didn't receive the email?{' '}
                <button className="text-mint hover:text-mint-light transition-colors">
                  Resend verification
                </button>
              </p>
            </div>
          </motion.div>
        );
    }
  };

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
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>

          {/* Footer */}
          <p className="text-center text-glass-muted text-sm mt-8">
            Real Estate CRM © 2025
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
}
