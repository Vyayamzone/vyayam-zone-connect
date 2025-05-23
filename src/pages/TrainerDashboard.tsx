import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Clock,
  FileText,
  Upload,
  MessageCircle,
  Star
} from 'lucide-react';

interface TrainerStats {
  total_sessions: number;
  total_clients: number;
  total_earnings: number;
  pending_interests: number;
}

interface UserInterest {
  id: string;
  user_id: string;
  message: string;
  status: string;
  created_at: string;
  user_profiles: {
    full_name: string;
    phone: string;
    city: string;
  } | null;
}

interface TrainingSession {
  id: string;
  session_type: string;
  mode: string;
  session_date: string;
  amount: number;
  user_profiles: {
    full_name: string;
  } | null;
}

const TrainerDashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState<TrainerStats | null>(null);
  const [interests, setInterests] = useState<UserInterest[]>([]);
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;

    try {
      // Fetch trainer stats
      const { data: statsData } = await supabase
        .rpc('get_trainer_stats', { p_trainer_id: user.id });
      
      if (statsData && statsData.length > 0) {
        setStats(statsData[0]);
      }

      // Fetch user interests - fixed query
      const { data: interestsData } = await supabase
        .from('user_interests')
        .select(`
          id,
          user_id,
          message,
          status,
          created_at
        `)
        .eq('trainer_id', user.id)
        .order('created_at', { ascending: false });

      if (interestsData) {
        // Fetch user profiles separately
        const userIds = interestsData.map(interest => interest.user_id);
        const { data: userProfilesData } = await supabase
          .from('user_profiles')
          .select('id, full_name, phone, city')
          .in('id', userIds);

        // Combine data
        const enrichedInterests = interestsData.map(interest => ({
          ...interest,
          user_profiles: userProfilesData?.find(profile => profile.id === interest.user_id) || null
        }));

        setInterests(enrichedInterests);
      }

      // Fetch training sessions - fixed query
      const { data: sessionsData } = await supabase
        .from('training_sessions')
        .select(`
          id,
          session_type,
          mode,
          session_date,
          amount,
          user_id
        `)
        .eq('trainer_id', user.id)
        .order('session_date', { ascending: false })
        .limit(10);

      if (sessionsData) {
        // Fetch user profiles separately
        const userIds = sessionsData.map(session => session.user_id);
        const { data: userProfilesData } = await supabase
          .from('user_profiles')
          .select('id, full_name')
          .in('id', userIds);

        // Combine data
        const enrichedSessions = sessionsData.map(session => ({
          ...session,
          user_profiles: userProfilesData?.find(profile => profile.id === session.user_id) || null
        }));

        setSessions(enrichedSessions);
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

  const updateInterestStatus = async (interestId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('user_interests')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', interestId);

      if (error) throw error;

      setInterests(prev => 
        prev.map(interest => 
          interest.id === interestId 
            ? { ...interest, status }
            : interest
        )
      );

      toast({
        title: 'Success',
        description: `Interest marked as ${status}`,
      });
    } catch (error) {
      console.error('Error updating interest:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update interest status',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vyayam-purple mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Trainer Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name}</p>
          </div>
          <Button onClick={logout} variant="outline">
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                  <p className="text-2xl font-bold text-gray-900">{stats?.total_sessions || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Clients</p>
                  <p className="text-2xl font-bold text-gray-900">{stats?.total_clients || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="w-8 h-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                  <p className="text-2xl font-bold text-gray-900">₹{stats?.total_earnings || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MessageCircle className="w-8 h-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Interests</p>
                  <p className="text-2xl font-bold text-gray-900">{stats?.pending_interests || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="interests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="interests">User Interests</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>

          <TabsContent value="interests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Interest Requests</CardTitle>
              </CardHeader>
              <CardContent>
                {interests.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No interest requests yet.</p>
                ) : (
                  <div className="space-y-4">
                    {interests.map((interest) => (
                      <div key={interest.id} className="border rounded-lg p-4 bg-white">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{interest.user_profiles?.full_name || 'Unknown User'}</h3>
                            <p className="text-sm text-gray-600">{interest.user_profiles?.city || 'City not specified'}</p>
                            <p className="text-sm text-gray-600">{interest.user_profiles?.phone || 'Phone not provided'}</p>
                          </div>
                          <Badge variant={
                            interest.status === 'pending' ? 'default' :
                            interest.status === 'contacted' ? 'default' : 'secondary'
                          }>
                            {interest.status}
                          </Badge>
                        </div>
                        {interest.message && (
                          <p className="text-gray-700 mb-3">{interest.message}</p>
                        )}
                        {interest.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              onClick={() => updateInterestStatus(interest.id, 'contacted')}
                            >
                              Mark as Contacted
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateInterestStatus(interest.id, 'ignored')}
                            >
                              Ignore
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Training Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                {sessions.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No sessions recorded yet.</p>
                ) : (
                  <div className="space-y-4">
                    {sessions.map((session) => (
                      <div key={session.id} className="border rounded-lg p-4 bg-white">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{session.user_profiles?.full_name || 'Unknown User'}</h3>
                            <p className="text-sm text-gray-600">
                              {session.session_type} - {session.mode}
                            </p>
                            <p className="text-sm text-gray-600">
                              {new Date(session.session_date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-green-600">₹{session.amount}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="availability" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Manage Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-center py-8">
                  Availability management coming soon. Contact admin to set your schedule.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-center py-8">
                  Content upload and management coming soon.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default TrainerDashboard;
