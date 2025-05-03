
import { CheckIcon } from 'lucide-react';

interface SignupProgressProps {
  steps: string[];
  currentStep: number;
}

const SignupProgress = ({ steps, currentStep }: SignupProgressProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isActive = currentStep === stepNumber;
          
          return (
            <div key={step} className="flex flex-col items-center relative">
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-full 
                ${isCompleted 
                  ? 'bg-green-500 text-white' 
                  : isActive 
                    ? 'bg-vyayam-purple text-white' 
                    : 'bg-gray-200 text-gray-500'
                } 
                transition-all duration-200
              `}>
                {isCompleted ? (
                  <CheckIcon className="w-5 h-5" />
                ) : (
                  <span>{stepNumber}</span>
                )}
              </div>
              
              <span className={`
                mt-2 text-sm hidden sm:block
                ${isActive ? 'font-semibold text-vyayam-purple' : 'text-gray-500'}
              `}>
                {step}
              </span>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className={`
                  hidden sm:block absolute top-5 left-10 w-full h-[2px]
                  ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}
                `} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SignupProgress;
