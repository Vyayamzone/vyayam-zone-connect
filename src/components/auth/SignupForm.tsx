
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';

interface SignupFormProps {
  onToggleForm: () => void;
}

const SignupForm = ({ onToggleForm }: SignupFormProps) => {
  const [role, setRole] = useState<UserRole>('user');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [certificationFiles, setCertificationFiles] = useState<File[]>([]);
  const [govtIdFile, setGovtIdFile] = useState<File | null>(null);
  const { signup } = useAuth();
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
      age: '',
      gender: '',
      phone: '',
      city: '',
      // User specific fields
      fitnessGoals: [] as string[],
      preferredWorkoutType: '',
      timePreference: '',
      healthConditions: '',
      experienceLevel: '',
      // Trainer specific fields
      servicesOffered: [] as string[],
      yearsExperience: '',
      careerMotivation: '',
      availabilityTimings: [] as string[],
      offersHomeVisits: false,
      offersOnlineSessions: false,
    }
  });

  const fitnessGoalOptions = [
    { id: 'weight-loss', label: 'Weight Loss' },
    { id: 'muscle-gain', label: 'Muscle Gain' },
    { id: 'cardiovascular-health', label: 'Cardiovascular Health' },
    { id: 'flexibility', label: 'Flexibility' },
    { id: 'strength', label: 'Strength' },
    { id: 'endurance', label: 'Endurance' }
  ];

  const workoutTypeOptions = [
    { value: 'yoga', label: 'Yoga' },
    { value: 'weight-training', label: 'Weight Training' },
    { value: 'cardio', label: 'Cardio' },
    { value: 'pilates', label: 'Pilates' },
    { value: 'crossfit', label: 'CrossFit' },
    { value: 'zumba', label: 'Zumba' },
    { value: 'martial-arts', label: 'Martial Arts' }
  ];

  const serviceOptions = [
    { id: 'personal-training', label: 'Personal Training' },
    { id: 'group-classes', label: 'Group Classes' },
    { id: 'yoga', label: 'Yoga' },
    { id: 'pilates', label: 'Pilates' },
    { id: 'nutrition-coaching', label: 'Nutrition Coaching' },
    { id: 'rehabilitation', label: 'Rehabilitation' },
    { id: 'sports-specific', label: 'Sports Specific Training' }
  ];

  const timingOptions = [
    { id: 'morning', label: 'Morning (6 AM - 11 AM)' },
    { id: 'afternoon', label: 'Afternoon (11 AM - 4 PM)' },
    { id: 'evening', label: 'Evening (4 PM - 10 PM)' },
    { id: 'weekends', label: 'Weekends' }
  ];

  const handleCertificationFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setCertificationFiles(filesArray);
    }
  };

  const handleGovtIdFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setGovtIdFile(e.target.files[0]);
    }
  };

  const onSubmit = async (data: any) => {
    if (!data.email || !data.password || !data.fullName) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please fill in all required fields',
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Combine form data with role and file uploads
      const userData = {
        ...data,
        role,
        certificationFiles,
        govtIdFile
      };

      await signup(data.email, data.password, userData);
    } catch (error) {
      // Error is handled in the context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Create an Account</CardTitle>
        <CardDescription>
          Join VyayamZone to find your perfect fitness match
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Account Type</h3>
              <RadioGroup 
                defaultValue="user" 
                value={role} 
                onValueChange={(value) => setRole(value as UserRole)}
                className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="user" id="user-type" />
                  <Label htmlFor="user-type">User seeking fitness services</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="trainer" id="trainer-type" />
                  <Label htmlFor="trainer-type">Fitness professional</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
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
                      <FormLabel>Email*</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
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
                      <FormLabel>Password*</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
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
                        <Input type="tel" placeholder="+919876543210" {...field} />
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
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
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
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <select 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        >
                          <option value="">Select</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="prefer_not_to_say">Prefer not to say</option>
                        </select>
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
                        <Input placeholder="Mumbai" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {role === 'user' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Fitness Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fitnessGoals"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Fitness Goals</FormLabel>
                        <FormControl>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {fitnessGoalOptions.map(option => (
                              <div key={option.id} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={option.id} 
                                  checked={field.value?.includes(option.id)}
                                  onCheckedChange={(checked) => {
                                    const currentValues = field.value || [];
                                    if (checked) {
                                      field.onChange([...currentValues, option.id]);
                                    } else {
                                      field.onChange(currentValues.filter(value => value !== option.id));
                                    }
                                  }}
                                />
                                <label htmlFor={option.id}>{option.label}</label>
                              </div>
                            ))}
                          </div>
                        </FormControl>
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
                        <FormControl>
                          <select 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                          >
                            <option value="">Select type</option>
                            {workoutTypeOptions.map(option => (
                              <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="timePreference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time Preference</FormLabel>
                        <FormControl>
                          <select 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                          >
                            <option value="">Select preference</option>
                            <option value="morning">Morning</option>
                            <option value="afternoon">Afternoon</option>
                            <option value="evening">Evening</option>
                            <option value="flexible">Flexible</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="healthConditions"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Health Conditions (if any)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Please list any relevant health conditions..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="experienceLevel"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Experience Level</FormLabel>
                        <FormControl>
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="flex flex-wrap gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="beginner" id="beginner" />
                              <Label htmlFor="beginner">Beginner</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="intermediate" id="intermediate" />
                              <Label htmlFor="intermediate">Intermediate</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="advanced" id="advanced" />
                              <Label htmlFor="advanced">Advanced</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {role === 'trainer' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Professional Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="servicesOffered"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Services Offered</FormLabel>
                        <FormControl>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {serviceOptions.map(option => (
                              <div key={option.id} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={option.id} 
                                  checked={field.value?.includes(option.id)}
                                  onCheckedChange={(checked) => {
                                    const currentValues = field.value || [];
                                    if (checked) {
                                      field.onChange([...currentValues, option.id]);
                                    } else {
                                      field.onChange(currentValues.filter(value => value !== option.id));
                                    }
                                  }}
                                />
                                <label htmlFor={option.id}>{option.label}</label>
                              </div>
                            ))}
                          </div>
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
                        <FormLabel>Years of Experience</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="availabilityTimings"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Availability Timings</FormLabel>
                        <FormControl>
                          <div className="grid grid-cols-2 gap-2">
                            {timingOptions.map(option => (
                              <div key={option.id} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={option.id} 
                                  checked={field.value?.includes(option.id)}
                                  onCheckedChange={(checked) => {
                                    const currentValues = field.value || [];
                                    if (checked) {
                                      field.onChange([...currentValues, option.id]);
                                    } else {
                                      field.onChange(currentValues.filter(value => value !== option.id));
                                    }
                                  }}
                                />
                                <label htmlFor={option.id}>{option.label}</label>
                              </div>
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="careerMotivation"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Career Motivation</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us what inspired you to become a fitness professional..." 
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="col-span-2">
                    <Label htmlFor="certification_files">Certification Files</Label>
                    <Input 
                      id="certification_files" 
                      type="file" 
                      multiple 
                      onChange={handleCertificationFiles}
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Upload your fitness certifications (multiple files allowed)
                    </p>
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="govt_id">Government ID</Label>
                    <Input 
                      id="govt_id" 
                      type="file" 
                      onChange={handleGovtIdFile}
                      className="mt-1" 
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Upload a valid government ID (Aadhar/PAN)
                    </p>
                  </div>
                  <FormField
                    control={form.control}
                    name="offersHomeVisits"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 col-span-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Offers Home Visits
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="offersOnlineSessions"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 col-span-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Offers Online Sessions
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account...' : 'Sign Up'}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onToggleForm}
                className="text-primary hover:underline"
              >
                Log in
              </button>
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default SignupForm;
