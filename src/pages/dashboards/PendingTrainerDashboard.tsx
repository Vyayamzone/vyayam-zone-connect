
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertCircle, CheckCircle } from "lucide-react";

const PendingTrainerDashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img src="/lovable-uploads/e4fc0f62-da78-4bf7-83a3-01fd5ebc9dfa.png" alt="VyayamZone" className="h-8 w-auto" />
              <h1 className="text-2xl font-bold text-vyayam-purple">VyayamZone</h1>
            </div>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              <Clock className="w-4 h-4 mr-1" />
              Pending Approval
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to VyayamZone, {user?.name || 'Trainer'}!
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your trainer application is currently under review. We'll notify you once it's approved.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-yellow-500" />
                  Application Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    Under Review
                  </Badge>
                  <p className="text-sm text-gray-600">
                    Our team is reviewing your credentials and documents. This typically takes 1-3 business days.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                  What's Next?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Once approved, you'll gain access to:
                  </p>
                  <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                    <li>Full trainer dashboard</li>
                    <li>Client management tools</li>
                    <li>Session scheduling</li>
                    <li>Analytics and earnings</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Have questions about your application?
                </p>
                <p className="text-sm text-vyayam-purple font-medium">
                  Email: support@vyayamzone.com
                </p>
                <p className="text-sm text-vyayam-purple font-medium">
                  Phone: +91 9876543210
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Application Timeline</CardTitle>
              <CardDescription>Track your application progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Application Submitted</span>
                  <span className="text-sm text-gray-500">✓ Complete</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Documents Under Review</span>
                  <span className="text-sm text-gray-500">In Progress</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-gray-400">Application Approved</span>
                  <span className="text-sm text-gray-400">Pending</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PendingTrainerDashboard;
