
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Mock data for upcoming sessions
const upcomingSessions = [
  {
    id: 1,
    type: "Personal Training",
    trainer: "Alex Johnson",
    date: "2025-05-06",
    time: "10:00 AM",
    duration: "60 min",
    location: "VyayamZone Studio",
  },
  {
    id: 2,
    type: "Yoga Class",
    trainer: "Maya Patel",
    date: "2025-05-08",
    time: "5:30 PM",
    duration: "45 min",
    location: "Online Session",
  },
];

// Mock trainer data
const recommendedTrainers = [
  {
    id: 1,
    name: "Sarah Wilson",
    specialty: "Nutrition Coach",
    rating: 4.9,
    sessions: 120,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    specialty: "HIIT Trainer",
    rating: 4.7,
    sessions: 85,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
  },
  {
    id: 3,
    name: "Priya Sharma",
    specialty: "Yoga Instructor",
    rating: 5.0,
    sessions: 210,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
  },
];

const UserDashboard = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}</h1>
            <p className="text-gray-600">
              Track your fitness journey and book new sessions.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for trainers or classes..."
                className="w-full md:w-80"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                size="sm"
                className="absolute right-1 top-1 h-8"
                variant="ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sessions">My Sessions</TabsTrigger>
            <TabsTrigger value="trainers">Find Trainers</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">
                    Upcoming Sessions
                  </CardTitle>
                  <CardDescription>Your next fitness appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingSessions.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingSessions.map((session) => (
                        <div
                          key={session.id}
                          className="flex flex-col p-3 rounded-md border border-gray-100"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium">{session.type}</h4>
                              <p className="text-sm text-gray-500">
                                with {session.trainer}
                              </p>
                            </div>
                            <Badge variant="outline" className="bg-vyayam-softpurple bg-opacity-30 text-vyayam-purple border-vyayam-purple">
                              {session.duration}
                            </Badge>
                          </div>
                          <div className="flex justify-between text-sm mt-2">
                            <div className="flex items-center text-gray-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4 mr-1"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                                />
                              </svg>
                              {new Date(session.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center text-gray-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4 mr-1"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                              </svg>
                              {session.time}
                            </div>
                          </div>
                          <div className="flex items-center mt-2 text-sm text-gray-600">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4 mr-1"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                              />
                            </svg>
                            {session.location}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500 mb-2">No upcoming sessions</p>
                      <Button>Book a Session</Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">
                    Recommended Trainers
                  </CardTitle>
                  <CardDescription>Based on your fitness interests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {recommendedTrainers.map((trainer) => (
                      <div
                        key={trainer.id}
                        className="border border-gray-100 rounded-lg p-4 hover:border-vyayam-purple hover:shadow-sm transition-all"
                      >
                        <div className="flex flex-col items-center text-center">
                          <Avatar className="w-16 h-16 mb-3 border-2 border-vyayam-softpurple">
                            <img src={trainer.image} alt={trainer.name} />
                          </Avatar>
                          <h4 className="font-medium">{trainer.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {trainer.specialty}
                          </p>
                          <div className="flex items-center text-sm mb-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="gold"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="gold"
                              className="w-4 h-4 mr-1"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.563.563 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.563.563 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                              />
                            </svg>
                            {trainer.rating} ({trainer.sessions} sessions)
                          </div>
                          <Button variant="outline" size="sm" className="w-full">
                            View Profile
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-auto flex flex-col py-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 mb-2 text-vyayam-purple"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                      />
                    </svg>
                    Book Session
                  </Button>
                  <Button variant="outline" className="h-auto flex flex-col py-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 mb-2 text-vyayam-purple"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                    View Profile
                  </Button>
                  <Button variant="outline" className="h-auto flex flex-col py-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 mb-2 text-vyayam-purple"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    View History
                  </Button>
                  <Button variant="outline" className="h-auto flex flex-col py-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 mb-2 text-vyayam-purple"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                      />
                    </svg>
                    Help Center
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-4">
            <h2 className="text-2xl font-semibold">My Sessions</h2>
            <p className="text-gray-600">Manage your upcoming and past sessions</p>
            <div className="text-center py-8">
              <p>Sessions tab content will be implemented in the next phase.</p>
              <Button className="mt-4">Book a New Session</Button>
            </div>
          </TabsContent>

          <TabsContent value="trainers" className="space-y-4">
            <h2 className="text-2xl font-semibold">Find Trainers</h2>
            <p className="text-gray-600">
              Discover fitness professionals that match your goals
            </p>
            <div className="text-center py-8">
              <p>Trainer search will be implemented in the next phase.</p>
              <Button className="mt-4">Browse All Trainers</Button>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <h2 className="text-2xl font-semibold">My Profile</h2>
            <p className="text-gray-600">
              Update your personal information and preferences
            </p>

            <Card>
              <CardContent className="pt-6">
                <form className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          defaultValue={user?.name}
                          placeholder="Your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue={user?.email}
                          placeholder="Your email"
                          disabled
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea
                        id="bio"
                        className="min-h-[100px] w-full rounded-md border border-gray-200 bg-white p-3 text-sm"
                        placeholder="Tell us about yourself and your fitness goals..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="Your phone number" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" placeholder="Your city" />
                      </div>
                    </div>
                  </div>
                  <Button>Save Changes</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default UserDashboard;
