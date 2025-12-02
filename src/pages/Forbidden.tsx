import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

export default function Forbidden() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <ShieldAlert className="h-24 w-24 text-destructive" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">403</h1>
          <p className="text-xl text-muted-foreground">Access Forbidden</p>
          <p className="text-sm text-muted-foreground">
            You don't have permission to access this resource.
          </p>
        </div>
        <Button onClick={() => navigate('/dashboard')} size="lg">
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
