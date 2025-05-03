
import { useState } from 'react';
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
  FormDescription,
} from '@/components/ui/form';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const formSchema = z.object({
  careerMotivation: z.string().min(20, 'Please provide more details about your motivation (at least 20 characters)'),
  availabilityTimings: z.array(z.string()).min(1, 'Please select at least one availability time'),
  offersHomeVisits: z.boolean().optional(),
  offersOnlineSessions: z.boolean().optional(),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  // File fields are handled separately
});

const availabilityOptions = [
  { id: 'weekday-morning', label: 'Weekday Mornings' },
  { id: 'weekday-afternoon', label: 'Weekday Afternoons' },
  { id: 'weekday-evening', label: 'Weekday Evenings' },
  { id: 'weekend-morning', label: 'Weekend Mornings' },
  { id: 'weekend-afternoon', label: 'Weekend Afternoons' },
  { id: 'weekend-evening', label: 'Weekend Evenings' },
];

interface TrainerCredentialsFormProps {
  formData: any;
  updateFormData: (data: any) => void;
  onPrev: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const TrainerCredentialsForm = ({ 
  formData, 
  updateFormData, 
  onPrev,
  onSubmit,
  isSubmitting
}: TrainerCredentialsFormProps) => {
  const [certFiles, setCertFiles] = useState<File[]>(formData.certificationFiles || []);
  const [govtIdFile, setGovtIdFile] = useState<File | null>(formData.govtIdFile || null);
  const [fileError, setFileError] = useState<string>('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      careerMotivation: formData.careerMotivation || '',
      availabilityTimings: formData.availabilityTimings || [],
      offersHomeVisits: formData.offersHomeVisits || false,
      offersOnlineSessions: formData.offersOnlineSessions || false,
      phone: formData.phone || '',
    },
  });

  const handleCertFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      
      // Check file size
      const oversizedFiles = newFiles.filter(file => file.size > MAX_FILE_SIZE);
      if (oversizedFiles.length > 0) {
        setFileError('One or more files exceed the maximum size limit of 5MB');
        return;
      }
      
      setCertFiles([...certFiles, ...newFiles]);
    }
  };

  const handleGovtIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        setFileError('File exceeds the maximum size limit of 5MB');
        return;
      }
      
      setGovtIdFile(file);
    }
  };

  const removeCertFile = (index: number) => {
    const newFiles = [...certFiles];
    newFiles.splice(index, 1);
    setCertFiles(newFiles);
  };

  const removeGovtIdFile = () => {
    setGovtIdFile(null);
  };

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // Check required files
    if (certFiles.length === 0) {
      setFileError('Please upload at least one certification document');
      return;
    }
    
    if (!govtIdFile) {
      setFileError('Please upload a government ID document');
      return;
    }
    
    // Update form data with file information
    updateFormData({
      ...values,
      certificationFiles: certFiles,
      govtIdFile: govtIdFile,
    });
    
    onSubmit();
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-center">Credentials & Availability</h2>
        <p className="text-center text-gray-600">Complete your profile with final details</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
            name="careerMotivation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What inspires you as a fitness professional?</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us about your journey and motivation..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <div>
              <FormLabel>Upload Your Certifications</FormLabel>
              <FormDescription>
                Please upload relevant fitness certifications (PDF, JPG, PNG)
              </FormDescription>
              <div className="mt-2">
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleCertFileChange}
                  multiple
                />
              </div>
              {certFiles.length > 0 && (
                <div className="mt-2 space-y-2">
                  {certFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm truncate">{file.name}</span>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeCertFile(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <FormLabel>Government ID</FormLabel>
              <FormDescription>
                Please upload a government issued ID (Aadhar, PAN, Driver's License)
              </FormDescription>
              <div className="mt-2">
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleGovtIdChange}
                />
              </div>
              {govtIdFile && (
                <div className="mt-2">
                  <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm truncate">{govtIdFile.name}</span>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={removeGovtIdFile}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {fileError && (
              <div className="text-red-500 text-sm mt-2">{fileError}</div>
            )}
          </div>

          <FormField
            control={form.control}
            name="availabilityTimings"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">When are you available to train clients?</FormLabel>
                  <p className="text-sm text-gray-500">Select all that apply</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {availabilityOptions.map((option) => (
                    <FormField
                      key={option.id}
                      control={form.control}
                      name="availabilityTimings"
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

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="offersHomeVisits"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I offer home visits for clients
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="offersOnlineSessions"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I offer online training sessions
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>

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

export default TrainerCredentialsForm;
