
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  // Basic Information
  fullName: z.string().min(2, 'Full name is required'),
  age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 18 && Number(val) <= 100, {
    message: 'Age must be between 18 and 100',
  }),
  gender: z.string().min(1, 'Please select your gender'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  city: z.string().min(2, 'City is required'),
  
  // Services & Experience
  servicesOffered: z.array(z.string()).min(1, 'Please select at least one service'),
  yearsExperience: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: 'Please enter valid years of experience',
  }),
  
  // Credentials & Availability
  careerMotivation: z.string().min(10, 'Please provide your career motivation (at least 10 characters)'),
  availabilityTimings: z.array(z.string()).min(1, 'Please select at least one availability timing'),
  offersHomeVisits: z.boolean(),
  offersOnlineSessions: z.boolean(),
});

const servicesOptions = [
  { id: 'personal-training', label: 'Personal Training' },
  { id: 'group-fitness', label: 'Group Fitness' },
  { id: 'yoga', label: 'Yoga' },
  { id: 'pilates', label: 'Pilates' },
  { id: 'crossfit', label: 'CrossFit' },
  { id: 'weight-training', label: 'Weight Training' },
  { id: 'cardio', label: 'Cardio Training' },
  { id: 'nutrition-coaching', label: 'Nutrition Coaching' },
  { id: 'martial-arts', label: 'Martial Arts' },
  { id: 'dance-fitness', label: 'Dance Fitness' }
];

const timingOptions = [
  { id: 'early-morning', label: 'Early Morning (5 AM - 8 AM)' },
  { id: 'morning', label: 'Morning (8 AM - 12 PM)' },
  { id: 'afternoon', label: 'Afternoon (12 PM - 4 PM)' },
  { id: 'evening', label: 'Evening (4 PM - 8 PM)' },
  { id: 'night', label: 'Night (8 PM - 10 PM)' },
  { id: 'weekend', label: 'Weekends' }
];

const TrainerSignupForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signup } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      age: '',
      gender: '',
      email: '',
      password: '',
      phone: '',
      city: '',
      servicesOffered: [],
      yearsExperience: '',
      careerMotivation: '',
      availabilityTimings: [],
      offersHomeVisits: false,
      offersOnlineSessions: false,
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    console.log('Trainer signup form values:', values);
    
    try {
      await signup(values.email, values.password, {
        ...values,
        role: 'trainer',
        age: parseInt(values.age),
        yearsExperience: parseFloat(values.yearsExperience),
      });
      
      toast({
        title: 'Account created successfully!',
        description: 'Your trainer application has been submitted for review.',
      });
      
    } catch (error: any) {
      console.error('Trainer signup error:', error);
      toast({
        variant: 'destructive',
        title: 'Signup failed',
        description: error.message || 'An error occurred during signup. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-white">
        <h2 className="text-3xl font-bold text-center mb-2">Become a VyayamZone Trainer</h2>
        <p className="text-center text-purple-100">Join our community of fitness professionals</p>
      </div>

      <div className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            {/* Basic Information Section */}
            <div className="space-y-6">
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Full Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your full name" 
                          className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Email *</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="you@example.com" 
                          className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Password *</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Create a password" 
                          className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Age *</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Enter your age" 
                          className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Gender *</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Phone Number *</FormLabel>
                      <FormControl>
                        <Input 
                          type="tel" 
                          placeholder="Enter your phone number" 
                          className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
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
                      <FormLabel className="text-gray-700 font-medium">City *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your city" 
                          className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="yearsExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Years of Experience *</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Enter years of experience" 
                          className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Services Offered Section */}
            <div className="space-y-6">
              <div className="border-l-4 border-indigo-500 pl-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Services Offered</h3>
              </div>

              <FormField
                control={form.control}
                name="servicesOffered"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Services You Offer *</FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                      {servicesOptions.map((option) => (
                        <FormField
                          key={option.id}
                          control={form.control}
                          name="servicesOffered"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={option.id}
                                className="flex flex-row items-start space-x-3 space-y-0 p-3 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors"
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
                                <FormLabel className="font-normal text-sm">
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
            </div>

            {/* Availability & Credentials Section */}
            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Availability & Credentials</h3>
              </div>

              <FormField
                control={form.control}
                name="careerMotivation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Why do you want to be a trainer? *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us about your passion for fitness and why you want to help others achieve their goals..."
                        className="min-h-[120px] border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="availabilityTimings"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Availability Timings *</FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                      {timingOptions.map((option) => (
                        <FormField
                          key={option.id}
                          control={form.control}
                          name="availabilityTimings"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={option.id}
                                className="flex flex-row items-start space-x-3 space-y-0 p-3 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors"
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
                                <FormLabel className="font-normal text-sm">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="offersHomeVisits"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border border-gray-200 rounded-lg">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-medium">
                          I offer home visits
                        </FormLabel>
                        <p className="text-sm text-gray-600">
                          I can visit clients at their homes
                        </p>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="offersOnlineSessions"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border border-gray-200 rounded-lg">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-medium">
                          I offer online sessions
                        </FormLabel>
                        <p className="text-sm text-gray-600">
                          I can conduct virtual training sessions
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Your Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </Button>
              
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <a href="/auth" className="text-purple-600 hover:text-purple-700 font-medium hover:underline">
                    Log in instead
                  </a>
                </p>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default TrainerSignupForm;
