
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, CheckCircle, Mail } from 'lucide-react';

const TrainerUnderReview = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Application Under Review
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Thank you for applying to become a trainer at VyayamZone! Your application is currently being reviewed by our team.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
              <span className="font-medium text-blue-900">Application Submitted</span>
            </div>
            <p className="text-sm text-blue-700">
              We'll review your documents and credentials within 2-3 business days.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Mail className="w-5 h-5 text-gray-600 mr-2" />
              <span className="font-medium text-gray-900">Stay Updated</span>
            </div>
            <p className="text-sm text-gray-600">
              You'll receive an email notification once your application is processed.
            </p>
          </div>

          <Button 
            onClick={logout}
            variant="outline" 
            className="w-full mt-6"
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainerUnderReview;
