
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import UserBasicInfoForm from './user/UserBasicInfoForm';
import UserFitnessPreferencesForm from './user/UserFitnessPreferencesForm';
import UserHealthDetailsForm from './user/UserHealthDetailsForm';
import SignupProgress from './SignupProgress';

interface UserFormData {
  // Step 1: Basic Details
  fullName: string;
  age: string;
  gender: string;
  email: string;
  password: string;
  
  // Step 2: Fitness Preferences
  fitnessGoals: string[];
  preferredWorkoutType: string;
  timePreference: string;
  
  // Step 3: Health Details
  healthConditions: string;
  experienceLevel: string;
  city: string;
  phone: string;
}

const INITIAL_STATE: UserFormData = {
  fullName: '',
  age: '',
  gender: '',
  email: '',
  password: '',
  fitnessGoals: [],
  preferredWorkoutType: '',
  timePreference: '',
  healthConditions: '',
  experienceLevel: '',
  city: '',
  phone: '',
};

const UserSignupForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<UserFormData>(INITIAL_STATE);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signup } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNextStep = () => {
    setCurrentStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const updateFormData = (newData: Partial<UserFormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await signup(formData.email, formData.password, {
        ...formData,
        role: 'user',
        age: parseInt(formData.age),
      });
      
      toast({
        title: 'Account created',
        description: 'Welcome to VyayamZone! You can now access your dashboard.',
      });
      
      // Redirect handled by AuthContext
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Signup failed',
        description: error.message || 'An error occurred during signup',
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <SignupProgress 
        steps={['Basic Information', 'Fitness Preferences', 'Health Details']} 
        currentStep={currentStep}
      />
      
      <div className="mt-8">
        {currentStep === 1 && (
          <UserBasicInfoForm
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNextStep}
          />
        )}
        
        {currentStep === 2 && (
          <UserFitnessPreferencesForm
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
          />
        )}
        
        {currentStep === 3 && (
          <UserHealthDetailsForm
            formData={formData}
            updateFormData={updateFormData}
            onPrev={handlePrevStep}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
};

export default UserSignupForm;
