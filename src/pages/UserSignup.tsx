
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
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-6 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-vyayam-purple">
          VyayamZone
        </a>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-12 bg-gray-50">
        <div className="w-full max-w-4xl">
          <UserSignupForm />
        </div>
      </main>

      <footer className="py-4 px-6 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} VyayamZone. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default UserSignup;
