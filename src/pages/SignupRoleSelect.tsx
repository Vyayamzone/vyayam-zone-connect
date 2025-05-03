
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { User, Dumbbell } from 'lucide-react';

const SignupRoleSelect = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    navigate(`/signup/${role}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-6 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-vyayam-purple">
          VyayamZone
        </a>
        <Button variant="outline" asChild>
          <a href="/">Back to Home</a>
        </Button>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-12 bg-gray-50">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4">Join VyayamZone</h1>
            <p className="text-xl text-gray-600">Are you joining as a User or a Trainer?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card 
              className={`cursor-pointer transition-all ${
                selectedRole === 'user' ? 'ring-2 ring-vyayam-purple' : 'hover:shadow-md'
              }`}
              onClick={() => handleRoleSelect('user')}
            >
              <CardContent className="p-6 flex flex-col items-center">
                <div className="h-24 w-24 rounded-full bg-vyayam-softpurple flex items-center justify-center mb-4">
                  <User className="h-12 w-12 text-vyayam-purple" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Join as a User</h2>
                <p className="text-gray-600 text-center mb-6">
                  Find trainers, track your fitness journey, and reach your goals with personalized guidance
                </p>
                <Button className="w-full">Sign up as User</Button>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all ${
                selectedRole === 'trainer' ? 'ring-2 ring-vyayam-purple' : 'hover:shadow-md'
              }`}
              onClick={() => handleRoleSelect('trainer')}
            >
              <CardContent className="p-6 flex flex-col items-center">
                <div className="h-24 w-24 rounded-full bg-vyayam-softpurple flex items-center justify-center mb-4">
                  <Dumbbell className="h-12 w-12 text-vyayam-purple" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Join as a Trainer</h2>
                <p className="text-gray-600 text-center mb-6">
                  Share your expertise, grow your client base, and help others achieve their fitness goals
                </p>
                <Button className="w-full">Sign up as Trainer</Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              Already have an account?{' '}
              <a href="/auth" className="text-vyayam-purple hover:underline">
                Log in
              </a>
            </p>
          </div>
        </div>
      </main>

      <footer className="py-4 px-6 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} VyayamZone. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SignupRoleSelect;
