
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export type UserRole = 'user' | 'trainer' | 'admin';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: UserData | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, userData: any) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // First set up the auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        if (currentSession?.user) {
          // Fetch user role when session changes
          fetchUserRole(currentSession.user.id).then(role => {
            setUser({
              id: currentSession.user.id,
              email: currentSession.user.email || '',
              name: currentSession.user.user_metadata.full_name || '',
              role: role as UserRole
            });
          });
        } else {
          setUser(null);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      if (currentSession?.user) {
        fetchUserRole(currentSession.user.id).then(role => {
          setUser({
            id: currentSession.user.id,
            email: currentSession.user.email || '',
            name: currentSession.user.user_metadata.full_name || '',
            role: role as UserRole
          });
        });
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Function to fetch user role from user_roles table
  const fetchUserRole = async (userId: string): Promise<string> => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching user role:', error);
        return 'user'; // Default role
      }

      return data?.role || 'user';
    } catch (error) {
      console.error('Error in fetchUserRole:', error);
      return 'user'; // Default role
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        const role = await fetchUserRole(data.user.id);
        
        // Redirect based on role
        if (role === 'admin') {
          navigate('/admin-dashboard');
        } else if (role === 'trainer') {
          navigate('/trainer-dashboard');
        } else {
          navigate('/user-dashboard');
        }

        toast({
          title: 'Login successful',
          description: `Welcome back!`,
        });
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description: error.message || 'An error occurred during login',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, userData: any) => {
    setIsLoading(true);
    try {
      // Register the user with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.fullName,
            role: userData.role,
          },
        }
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        // Update the profile based on role
        if (userData.role === 'user') {
          await updateUserProfile(data.user.id, userData);
        } else if (userData.role === 'trainer') {
          await updateTrainerProfile(data.user.id, userData);
        }

        toast({
          title: 'Account created',
          description: 'Your account has been created successfully!',
        });
        
        // Redirect based on role
        if (userData.role === 'admin') {
          navigate('/admin-dashboard');
        } else if (userData.role === 'trainer') {
          navigate('/trainer-dashboard');
        } else {
          navigate('/user-dashboard');
        }
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Signup failed',
        description: error.message || 'An error occurred during signup',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (userId: string, userData: any) => {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          full_name: userData.fullName,
          age: userData.age,
          gender: userData.gender,
          phone: userData.phone,
          city: userData.city,
          fitness_goals: userData.fitnessGoals,
          preferred_workout_type: userData.preferredWorkoutType,
          time_preference: userData.timePreference,
          health_conditions: userData.healthConditions,
          experience_level: userData.experienceLevel
        })
        .eq('id', userId);

      if (error) {
        console.error('Error updating user profile:', error);
      }
    } catch (error) {
      console.error('Error in updateUserProfile:', error);
    }
  };

  const updateTrainerProfile = async (userId: string, userData: any) => {
    try {
      // Upload certification files if provided
      let certificationUrls: string[] = [];
      if (userData.certificationFiles && userData.certificationFiles.length > 0) {
        certificationUrls = await Promise.all(
          userData.certificationFiles.map(async (file: File) => {
            const path = `${userId}/${file.name}`;
            const { data, error } = await supabase.storage
              .from('trainer_certifications')
              .upload(path, file);
            
            if (error) {
              console.error('Error uploading certification file:', error);
              return '';
            }
            
            return path;
          })
        ).then(paths => paths.filter(path => path !== ''));
      }

      // Upload govt ID file if provided
      let govtIdUrl = '';
      if (userData.govtIdFile) {
        const path = `${userId}/${userData.govtIdFile.name}`;
        const { data, error } = await supabase.storage
          .from('trainer_ids')
          .upload(path, userData.govtIdFile);
        
        if (!error) {
          govtIdUrl = path;
        }
      }

      // Update trainer profile
      const { error } = await supabase
        .from('trainer_profiles')
        .update({
          full_name: userData.fullName,
          age: userData.age,
          gender: userData.gender,
          phone: userData.phone,
          city: userData.city,
          services_offered: userData.servicesOffered,
          years_experience: userData.yearsExperience,
          career_motivation: userData.careerMotivation,
          certification_files: certificationUrls.length > 0 ? certificationUrls : null,
          govt_id_file: govtIdUrl || null,
          availability_timings: userData.availabilityTimings,
          offers_home_visits: userData.offersHomeVisits,
          offers_online_sessions: userData.offersOnlineSessions
        })
        .eq('id', userId);

      if (error) {
        console.error('Error updating trainer profile:', error);
      }
    } catch (error) {
      console.error('Error in updateTrainerProfile:', error);
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Logout failed',
        description: error.message || 'An error occurred during logout',
      });
      return;
    }
    
    setUser(null);
    setSession(null);
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
        session,
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
