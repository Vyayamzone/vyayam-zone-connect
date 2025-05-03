
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const formSchema = z.object({
  fitnessGoals: z.array(z.string()).min(1, 'Please select at least one fitness goal'),
  preferredWorkoutType: z.string().min(1, 'Please select a preferred workout type'),
  timePreference: z.string().min(1, 'Please select a time preference'),
});

const fitnessGoalsOptions = [
  { id: 'weight-loss', label: 'Weight Loss' },
  { id: 'muscle-gain', label: 'Muscle Gain' },
  { id: 'increased-flexibility', label: 'Increased Flexibility' },
  { id: 'cardiovascular-health', label: 'Cardiovascular Health' },
  { id: 'overall-fitness', label: 'Overall Fitness' },
  { id: 'sports-specific', label: 'Sports Specific Training' },
  { id: 'stress-relief', label: 'Stress Relief' },
];

const workoutTypeOptions = [
  'Weight Training', 
  'HIIT', 
  'Yoga', 
  'Pilates', 
  'Cardio', 
  'CrossFit', 
  'Calisthenics',
  'Zumba',
  'Sports Training'
];

interface UserFitnessPreferencesFormProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const UserFitnessPreferencesForm = ({ 
  formData, 
  updateFormData, 
  onNext, 
  onPrev 
}: UserFitnessPreferencesFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fitnessGoals: formData.fitnessGoals || [],
      preferredWorkoutType: formData.preferredWorkoutType || '',
      timePreference: formData.timePreference || '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateFormData(values);
    onNext();
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-center">Fitness Preferences</h2>
        <p className="text-center text-gray-600">Help us understand your fitness goals and preferences</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fitnessGoals"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">What are your fitness goals?</FormLabel>
                  <p className="text-sm text-gray-500">Select all that apply</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {fitnessGoalsOptions.map((option) => (
                    <FormField
                      key={option.id}
                      control={form.control}
                      name="fitnessGoals"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={option.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(option.id)}
                                onCheckedChange={(checked) => {
                                  const updatedValue = checked
                                    ? [...field.value, option.id]
                                    : field.value?.filter(
                                        (value) => value !== option.id
                                      );
                                  field.onChange(updatedValue);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {option.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferredWorkoutType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Workout Type</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your preferred workout type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {workoutTypeOptions.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, '-')}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timePreference"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>When do you prefer to workout?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="morning" />
                      </FormControl>
                      <FormLabel className="font-normal">Morning</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="afternoon" />
                      </FormControl>
                      <FormLabel className="font-normal">Afternoon</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="evening" />
                      </FormControl>
                      <FormLabel className="font-normal">Evening</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="flexible" />
                      </FormControl>
                      <FormLabel className="font-normal">Flexible</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onPrev}>
              Previous
            </Button>
            <Button type="submit">
              Next Step
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserFitnessPreferencesForm;
