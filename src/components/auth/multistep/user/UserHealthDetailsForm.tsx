
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const formSchema = z.object({
  healthConditions: z.string().optional(),
  experienceLevel: z.string().min(1, 'Please select your experience level'),
  city: z.string().min(1, 'City is required'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
});

interface UserHealthDetailsFormProps {
  formData: any;
  updateFormData: (data: any) => void;
  onPrev: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const UserHealthDetailsForm = ({ 
  formData, 
  updateFormData, 
  onPrev,
  onSubmit,
  isSubmitting
}: UserHealthDetailsFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      healthConditions: formData.healthConditions || '',
      experienceLevel: formData.experienceLevel || '',
      city: formData.city || '',
      phone: formData.phone || '',
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    updateFormData(values);
    onSubmit();
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-center">Health & Contact Details</h2>
        <p className="text-center text-gray-600">Just a few more details to complete your profile</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City/Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="Enter your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="healthConditions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Any health conditions or limitations? (optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="E.g., back pain, knee issues, asthma, etc."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experienceLevel"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>What's your fitness experience level?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="beginner" />
                      </FormControl>
                      <FormLabel className="font-normal">Beginner</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="intermediate" />
                      </FormControl>
                      <FormLabel className="font-normal">Intermediate</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="advanced" />
                      </FormControl>
                      <FormLabel className="font-normal">Advanced</FormLabel>
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
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserHealthDetailsForm;
