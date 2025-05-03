
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  servicesOffered: z.array(z.string()).min(1, 'Please select at least one service'),
  yearsExperience: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 50, {
    message: 'Years of experience must be between 0 and 50',
  }),
  city: z.string().min(1, 'City is required'),
});

const serviceOptions = [
  { id: 'personal-training', label: 'Personal Training' },
  { id: 'group-fitness', label: 'Group Fitness Classes' },
  { id: 'yoga-instruction', label: 'Yoga Instruction' },
  { id: 'strength-training', label: 'Strength Training' },
  { id: 'cardio-fitness', label: 'Cardio Fitness' },
  { id: 'nutrition-coaching', label: 'Nutrition Coaching' },
  { id: 'pilates', label: 'Pilates' },
  { id: 'sports-specific', label: 'Sports Specific Training' },
  { id: 'rehabilitation', label: 'Injury Rehabilitation' },
  { id: 'senior-fitness', label: 'Senior Fitness' },
  { id: 'weight-management', label: 'Weight Management' },
  { id: 'postnatal-fitness', label: 'Prenatal/Postnatal Fitness' },
];

interface TrainerServicesFormProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const TrainerServicesForm = ({ 
  formData, 
  updateFormData, 
  onNext, 
  onPrev 
}: TrainerServicesFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      servicesOffered: formData.servicesOffered || [],
      yearsExperience: formData.yearsExperience || '',
      city: formData.city || '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateFormData(values);
    onNext();
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-center">Services & Experience</h2>
        <p className="text-center text-gray-600">Tell us about your expertise and services</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="servicesOffered"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">What services do you offer?</FormLabel>
                  <p className="text-sm text-gray-500">Select all that apply</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {serviceOptions.map((option) => (
                    <FormField
                      key={option.id}
                      control={form.control}
                      name="servicesOffered"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="yearsExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years of Experience</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.5"
                      placeholder="e.g., 5.5" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
          </div>

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

export default TrainerServicesForm;
