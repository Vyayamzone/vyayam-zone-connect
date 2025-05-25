
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

const formSchema = z.object({
  fitnessGoals: z.array(z.string()).min(1, 'Please select at least one fitness goal'),
  preferredWorkoutType: z.string().min(1, 'Please select your preferred workout type'),
  timePreference: z.string().min(1, 'Please select your preferred time'),
});

interface UserFitnessPreferencesFormProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const fitnessGoalsOptions = [
  { id: 'weight_loss', label: 'Weight Loss' },
  { id: 'muscle_gain', label: 'Muscle Gain' },
  { id: 'strength_training', label: 'Strength Training' },
  { id: 'endurance', label: 'Endurance' },
  { id: 'flexibility', label: 'Flexibility' },
  { id: 'general_fitness', label: 'General Fitness' },
  { id: 'sports_specific', label: 'Sports Specific Training' },
  { id: 'rehabilitation', label: 'Rehabilitation' },
];

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

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    updateFormData(values);
    onNext();
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-center">Fitness Preferences</h2>
        <p className="text-center text-gray-600">Help us match you with the right trainer</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fitnessGoals"
            render={() => (
              <FormItem>
                <FormLabel>Fitness Goals (Select all that apply)</FormLabel>
                <div className="grid grid-cols-2 gap-3">
                  {fitnessGoalsOptions.map((goal) => (
                    <FormField
                      key={goal.id}
                      control={form.control}
                      name="fitnessGoals"
                      render={({ field }) => (
                        <FormItem
                          key={goal.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(goal.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, goal.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== goal.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {goal.label}
                          </FormLabel>
                        </FormItem>
                      )}
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
                      <SelectValue placeholder="Select workout type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cardio">Cardio</SelectItem>
                    <SelectItem value="strength">Strength Training</SelectItem>
                    <SelectItem value="yoga">Yoga</SelectItem>
                    <SelectItem value="pilates">Pilates</SelectItem>
                    <SelectItem value="hiit">HIIT</SelectItem>
                    <SelectItem value="crossfit">CrossFit</SelectItem>
                    <SelectItem value="dance">Dance Fitness</SelectItem>
                    <SelectItem value="martial_arts">Martial Arts</SelectItem>
                    <SelectItem value="sports">Sports Training</SelectItem>
                    <SelectItem value="mixed">Mixed/Varied</SelectItem>
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
              <FormItem>
                <FormLabel>Preferred Training Time</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select preferred time" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="morning">Morning (6 AM - 12 PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12 PM - 6 PM)</SelectItem>
                    <SelectItem value="evening">Evening (6 PM - 10 PM)</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onPrev} className="flex-1">
              Previous
            </Button>
            <Button type="submit" className="flex-1">
              Next Step
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserFitnessPreferencesForm;
