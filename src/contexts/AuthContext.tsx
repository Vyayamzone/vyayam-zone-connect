
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

export type UserRole = 'user' | 'trainer' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for demo purposes
const MOCK_USERS = [
  { id: '1', email: 'user@example.com', password: 'password', name: 'John Doe', role: 'user' as UserRole },
  { id: '2', email: 'trainer@example.com', password: 'password', name: 'Jane Smith', role: 'trainer' as UserRole },
  { id: '3', email: 'admin@example.com', password: 'password', name: 'Admin User', role: 'admin' as UserRole },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in (e.g., from localStorage)
    const storedUser = localStorage.getItem('vyayamUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user data');
        localStorage.removeItem('vyayamUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      const foundUser = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
      );

      if (!foundUser) {
        throw new Error('Invalid credentials');
      }

      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('vyayamUser', JSON.stringify(userWithoutPassword));
      
      // Redirect based on role
      if (foundUser.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (foundUser.role === 'trainer') {
        navigate('/trainer-dashboard');
      } else {
        navigate('/user-dashboard');
      }

      toast({
        title: 'Login successful',
        description: `Welcome back, ${foundUser.name}!`,
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description: (error as Error).message || 'An error occurred during login',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      if (MOCK_USERS.some((u) => u.email === email)) {
        throw new Error('Email already in use');
      }

      // Create new user
      const newUser = {
        id: `${MOCK_USERS.length + 1}`,
        email,
        name,
        role,
      };

      setUser(newUser);
      localStorage.setItem('vyayamUser', JSON.stringify(newUser));
      
      // Redirect based on role
      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else if (role === 'trainer') {
        navigate('/trainer-dashboard');
      } else {
        navigate('/user-dashboard');
      }

      toast({
        title: 'Account created',
        description: 'Your account has been created successfully!',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Signup failed',
        description: (error as Error).message || 'An error occurred during signup',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vyayamUser');
    navigate('/');
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
