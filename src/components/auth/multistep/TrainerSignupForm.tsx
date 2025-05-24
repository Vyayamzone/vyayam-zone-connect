
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import TrainerBasicInfoForm from './trainer/TrainerBasicInfoForm';
import TrainerServicesForm from './trainer/TrainerServicesForm';
import TrainerCredentialsForm from './trainer/TrainerCredentialsForm';
import SignupProgress from './SignupProgress';

interface TrainerFormData {
  // Step 1: Basic Details
  fullName: string;
  age: string;
  gender: string;
  email: string;
  password: string;
  
  // Step 2: Services
  servicesOffered: string[];
  yearsExperience: string;
  city: string;
  
  // Step 3: Credentials
  careerMotivation: string;
  certificationFiles: File[];
  govtIdFile: File | null;
  availabilityTimings: string[];
  offersHomeVisits: boolean;
  offersOnlineSessions: boolean;
  phone: string;
}

const INITIAL_STATE: TrainerFormData = {
  fullName: '',
  age: '',
  gender: '',
  email: '',
  password: '',
  servicesOffered: [],
  yearsExperience: '',
  city: '',
  careerMotivation: '',
  certificationFiles: [],
  govtIdFile: null,
  availabilityTimings: [],
  offersHomeVisits: false,
  offersOnlineSessions: false,
  phone: '',
};

const TrainerSignupForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<TrainerFormData>(INITIAL_STATE);
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

  const updateFormData = (newData: Partial<TrainerFormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await signup(formData.email, formData.password, {
        ...formData,
        role: 'trainer',
        age: parseInt(formData.age),
        yearsExperience: parseFloat(formData.yearsExperience),
      });
      
      toast({
        title: 'Account created',
        description: 'Your trainer application has been submitted for review.',
      });
      
      // Navigation handled by AuthContext - will redirect to pending dashboard
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
        steps={['Basic Information', 'Services & Experience', 'Credentials & Availability']} 
        currentStep={currentStep}
      />
      
      <div className="mt-8">
        {currentStep === 1 && (
          <TrainerBasicInfoForm
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNextStep}
          />
        )}
        
        {currentStep === 2 && (
          <TrainerServicesForm
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
          />
        )}
        
        {currentStep === 3 && (
          <TrainerCredentialsForm
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

export default TrainerSignupForm;
