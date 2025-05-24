
import { supabase } from '@/integrations/supabase/client';

export type UserRole = 'user' | 'trainer' | 'admin';
export type TrainerStatus = 'pending' | 'approved' | 'rejected';

export interface RoleDetectionResult {
  role: UserRole | null;
  trainerStatus?: TrainerStatus;
  profile: any | null;
}

export const detectUserRole = async (email: string): Promise<RoleDetectionResult> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { role: null, profile: null };
    }

    // Check if email exists in user_profiles table
    const { data: userProfile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (userProfile) {
      return { role: 'user', profile: userProfile };
    }

    // Check if email exists in trainer_profiles table
    const { data: trainerProfile } = await supabase
      .from('trainer_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (trainerProfile) {
      return { 
        role: 'trainer', 
        trainerStatus: trainerProfile.status as TrainerStatus,
        profile: trainerProfile 
      };
    }

    // Check if email exists in admins table
    const { data: adminProfile } = await supabase
      .from('admins')
      .select('*')
      .eq('email', email)
      .single();

    if (adminProfile) {
      return { role: 'admin', profile: adminProfile };
    }

    return { role: null, profile: null };
  } catch (error) {
    console.error('Error detecting user role:', error);
    return { role: null, profile: null };
  }
};

export const getRedirectPath = (role: UserRole | null, trainerStatus?: TrainerStatus): string => {
  switch (role) {
    case 'user':
      return '/user-dashboard';
    case 'trainer':
      if (trainerStatus === 'pending') {
        return '/pending-trainer-dashboard';
      }
      return '/trainer-dashboard';
    case 'admin':
      return '/admin-dashboard';
    default:
      return '/unauthorized';
  }
};
