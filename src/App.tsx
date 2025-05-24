
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import SignupRoleSelect from "./pages/SignupRoleSelect";
import UserSignup from "./pages/UserSignup";
import TrainerSignup from "./pages/TrainerSignup";
import TrainerUnderReview from "./pages/TrainerUnderReview";
import Unauthorized from "./pages/Unauthorized";

// Dashboard Pages
import UserDashboard from "./pages/dashboards/UserDashboard";
import TrainerDashboard from "./pages/dashboards/TrainerDashboard";
import PendingTrainerDashboard from "./pages/dashboards/PendingTrainerDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/signup-role-select" element={<SignupRoleSelect />} />
            <Route path="/signup/user" element={<UserSignup />} />
            <Route path="/signup/trainer" element={<TrainerSignup />} />
            <Route path="/trainer-under-review" element={<TrainerUnderReview />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Protected User Routes */}
            <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
              <Route path="/user-dashboard" element={<UserDashboard />} />
            </Route>

            {/* Protected Pending Trainer Routes */}
            <Route element={<ProtectedRoute allowedRoles={["trainer"]} allowedTrainerStatus={["pending"]} />}>
              <Route path="/pending-trainer-dashboard" element={<PendingTrainerDashboard />} />
            </Route>

            {/* Protected Approved Trainer Routes */}
            <Route element={<ProtectedRoute allowedRoles={["trainer"]} allowedTrainerStatus={["approved"]} />}>
              <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
            </Route>

            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
