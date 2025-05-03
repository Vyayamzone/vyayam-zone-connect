
import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useAuth } from '@/contexts/AuthContext';

interface AuthModalProps {
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
  children?: React.ReactNode;
}

const AuthModal = ({ 
  variant = 'default', 
  size = 'default',
  children 
}: AuthModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const { isAuthenticated } = useAuth();

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant={variant} size={size}>
            {showLogin ? 'Log In' : 'Sign Up'}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {showLogin ? (
          <LoginForm onToggleForm={toggleForm} />
        ) : (
          <SignupForm onToggleForm={toggleForm} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
