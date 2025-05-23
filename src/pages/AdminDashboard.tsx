
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  UserCheck, 
  Calendar, 
  DollarSign, 
  FileText, 
  CheckCircle, 
  XCircle,
  Eye,
  Plus,
  Clock
} from 'lucide-react';

interface PlatformStats {
  total_trainers: number;
  pending_trainers: number;
  approved_trainers: number;
  total_users: number;
  total_sessions: number;
  total_revenue: number;
}

interface TrainerApplication {
  id: string;
  full_name: string;
  age: number;
  gender: string;
  phone: string;
  city: string;
  services_offered: string[];
  years_experience: number;
  career_motivation: string;
  created_at: string;
}

interface UserInterest {
  id: string;
  message: string;
  status: string;
  created_at: string;
  user_id: string;
  trainer_id: string;
  user_profiles?: {
    full_name: string;
    city: string;
  } | null;
  trainer_profiles?: {
    full_name: string;
  } | null;
}

const AdminDashboard = () => {
  const { logout } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [trainerApplications, setTrainerApplications] = useState<TrainerApplication[]>([]);
  const [userInterests, setUserInterests] = useState<UserInterest[]>([]);
  const [loading, setLoading] = useState(true);

  // Session form state
  const [sessionForm, setSessionForm] = useState({
    trainer_id: '',
    user_id: '',
    session_type: '',
    mode: 'online',
    session_date: '',
    amount: '',
    notes: ''
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch platform stats
      const [trainersData, usersData, sessionsData] = await Promise.all([
        supabase.from('trainer_profiles').select('id'),
        supabase.from('user_profiles').select('id'),
        supabase.from('training_sessions').select('amount')
      ]);

      if (trainersData.data && usersData.data && sessionsData.data) {
        const totalRevenue = sessionsData.data.reduce((sum, session) => sum + Number(session.amount), 0);

        setStats({
          total_trainers: trainersData.data.length,
          pending_trainers: 0, // No status column anymore
          approved_trainers: trainersData.data.length,
          total_users: usersData.data.length,
          total_sessions: sessionsData.data.length,
          total_revenue: totalRevenue
        });
      }

      // Fetch trainer applications
      const { data: applications } = await supabase
        .from('trainer_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (applications) {
        setTrainerApplications(applications);
      }

      // Fetch user interests - fixed query
      const { data: interests } = await supabase
        .from('user_interests')
        .select(`
          id,
          message,
          status,
          created_at,
          user_id,
          trainer_id
        `)
        .order('created_at', { ascending: false });

      if (interests) {
        // Fetch user and trainer profiles separately
        const userIds = [...new Set(interests.map(i => i.user_id))];
        const trainerIds = [...new Set(interests.map(i => i.trainer_id))];

        const [userProfilesData, trainerProfilesData] = await Promise.all([
          supabase.from('user_profiles').select('id, full_name, city').in('id', userIds),
          supabase.from('trainer_profiles').select('id, full_name').in('id', trainerIds)
        ]);

        // Combine data
        const enrichedInterests = interests.map(interest => ({
          ...interest,
          user_profiles: userProfilesData.data?.find(profile => profile.id === interest.user_id) || null,
          trainer_profiles: trainerProfilesData.data?.find(profile => profile.id === interest.trainer_id) || null
        }));

        setUserInterests(enrichedInterests);
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load dashboard data',
      });
    } finally {
      setLoading(false);
    }
  };

  const addSession = async () => {
    try {
      const { error } = await supabase
        .from('training_sessions')
        .insert([{
          trainer_id: sessionForm.trainer_id,
          user_id: sessionForm.user_id,
          session_type: sessionForm.session_type,
          mode: sessionForm.mode,
          session_date: sessionForm.session_date,
          amount: parseFloat(sessionForm.amount),
          notes: sessionForm.notes,
          status: 'completed'
        }]);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Session added successfully',
      });

      // Reset form
      setSessionForm({
        trainer_id: '',
        user_id: '',
        session_type: '',
        mode: 'online',
        session_date: '',
        amount: '',
        notes: ''
      });

      // Refresh data
      fetchDashboardData();
    } catch (error) {
      console.error('Error adding session:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to add session',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vyayam-purple mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">VyayamZone Management</p>
          </div>
          <Button onClick={logout} variant="outline">
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <UserCheck className="w-6 h-6 text-blue-600" />
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-600">Total Trainers</p>
                  <p className="text-lg font-bold text-gray-900">{stats?.total_trainers || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Clock className="w-6 h-6 text-yellow-600" />
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-600">Pending</p>
                  <p className="text-lg font-bold text-gray-900">{stats?.pending_trainers || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-600">Approved</p>
                  <p className="text-lg font-bold text-gray-900">{stats?.approved_trainers || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Users className="w-6 h-6 text-purple-600" />
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-600">Total Users</p>
                  <p className="text-lg font-bold text-gray-900">{stats?.total_users || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Calendar className="w-6 h-6 text-indigo-600" />
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-600">Sessions</p>
                  <p className="text-lg font-bold text-gray-900">{stats?.total_sessions || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <DollarSign className="w-6 h-6 text-green-600" />
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-600">Revenue</p>
                  <p className="text-lg font-bold text-gray-900">₹{stats?.total_revenue || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="applications">Trainer Applications</TabsTrigger>
            <TabsTrigger value="interests">User Interests</TabsTrigger>
            <TabsTrigger value="sessions">Add Session</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Trainer Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trainerApplications.map((application) => (
                    <div key={application.id} className="border rounded-lg p-4 bg-white">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{application.full_name}</h3>
                          <p className="text-gray-600">{application.city}</p>
                          <p className="text-sm text-gray-500">
                            {application.years_experience} years experience
                          </p>
                        </div>
                        <Badge variant="default">Active</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Services</p>
                          <p className="text-sm">{application.services_offered?.join(', ')}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Phone</p>
                          <p className="text-sm">{application.phone}</p>
                        </div>
                      </div>

                      {application.career_motivation && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-600">Career Motivation</p>
                          <p className="text-sm text-gray-700">{application.career_motivation}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Interest Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userInterests.map((interest) => (
                    <div key={interest.id} className="border rounded-lg p-4 bg-white">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{interest.user_profiles?.full_name || 'Unknown User'}</h3>
                          <p className="text-sm text-gray-600">
                            Interested in: {interest.trainer_profiles?.full_name || 'Unknown Trainer'}
                          </p>
                          <p className="text-sm text-gray-500">{interest.user_profiles?.city || 'City not specified'}</p>
                          {interest.message && (
                            <p className="text-sm text-gray-700 mt-2">{interest.message}</p>
                          )}
                        </div>
                        <Badge variant={
                          interest.status === 'pending' ? 'default' :
                          interest.status === 'contacted' ? 'default' : 'secondary'
                        }>
                          {interest.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Add Training Session</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="trainer_id">Trainer ID</Label>
                    <Input
                      id="trainer_id"
                      value={sessionForm.trainer_id}
                      onChange={(e) => setSessionForm(prev => ({ ...prev, trainer_id: e.target.value }))}
                      placeholder="Trainer UUID"
                    />
                  </div>
                  <div>
                    <Label htmlFor="user_id">User ID</Label>
                    <Input
                      id="user_id"
                      value={sessionForm.user_id}
                      onChange={(e) => setSessionForm(prev => ({ ...prev, user_id: e.target.value }))}
                      placeholder="User UUID"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="session_type">Session Type</Label>
                    <Input
                      id="session_type"
                      value={sessionForm.session_type}
                      onChange={(e) => setSessionForm(prev => ({ ...prev, session_type: e.target.value }))}
                      placeholder="e.g., Yoga, Fitness, Nutrition"
                    />
                  </div>
                  <div>
                    <Label htmlFor="mode">Mode</Label>
                    <Select 
                      value={sessionForm.mode} 
                      onValueChange={(value) => setSessionForm(prev => ({ ...prev, mode: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="offline">Offline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="session_date">Session Date</Label>
                    <Input
                      id="session_date"
                      type="date"
                      value={sessionForm.session_date}
                      onChange={(e) => setSessionForm(prev => ({ ...prev, session_date: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="amount">Amount (₹)</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={sessionForm.amount}
                      onChange={(e) => setSessionForm(prev => ({ ...prev, amount: e.target.value }))}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Input
                    id="notes"
                    value={sessionForm.notes}
                    onChange={(e) => setSessionForm(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Session notes..."
                  />
                </div>

                <Button onClick={addSession} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Session
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Platform Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-center py-8">
                  Advanced analytics and reporting features coming soon.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
