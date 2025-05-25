
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import UserSignupForm from "@/components/auth/multistep/UserSignupForm";

const UserSignup = () => {
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect if already authenticated
  if (isAuthenticated) {
    if (user?.role === "admin") {
      return <Navigate to="/admin-dashboard" />;
    } else if (user?.role === "trainer") {
      return <Navigate to="/trainer-dashboard" />;
    } else {
      return <Navigate to="/user-dashboard" />;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="py-6 px-6 flex justify-between items-center bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <a href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          VyayamZone
        </a>
      </header>

      <main className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl">
          <UserSignupForm />
        </div>
      </main>

      <footer className="py-6 px-6 text-center text-gray-500 text-sm bg-white/50">
        <p>© {new Date().getFullYear()} VyayamZone. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default UserSignup;
