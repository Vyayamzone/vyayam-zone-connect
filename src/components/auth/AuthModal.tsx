
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import LoginForm from './LoginForm';
import { useAuth } from '@/contexts/AuthContext';

interface AuthModalProps {
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
  children?: React.ReactNode;
  mode?: 'login' | 'signup';
}

const AuthModal = ({ 
  variant = 'default', 
  size = 'default',
  children,
  mode = 'login'
}: AuthModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAction = () => {
    setIsOpen(false);
    if (mode === 'signup') {
      navigate('/signup-role-select');
    }
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant={variant} size={size}>
            {mode === 'login' ? 'Log In' : 'Sign Up'}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {mode === 'login' ? (
          <LoginForm onToggleForm={handleAction} />
        ) : (
          <div className="flex flex-col items-center justify-center p-4">
            <h2 className="text-xl font-semibold mb-4">Ready to join VyayamZone?</h2>
            <p className="text-muted-foreground mb-6">Create your account to get started</p>
            <Button 
              className="w-full mb-2" 
              onClick={handleAction}
            >
              Continue to Sign Up
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
